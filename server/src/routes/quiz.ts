import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { prisma } from '../lib/prisma.js';
import { authRequired } from '../middleware/auth.js';
import { WORD_BANK, DAILY_WORDS, type BankWord } from '../data/wordBank.js';

const router = Router();

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeQuestion(target: BankWord, pool: BankWord[]) {
  const others = shuffle(pool.filter((w) => w.word !== target.word));
  const wrongs: string[] = [];
  for (const w of others) {
    if (wrongs.length >= 3) break;
    if (w.definition !== target.definition && !wrongs.includes(w.definition)) {
      wrongs.push(w.definition);
    }
  }
  const options = shuffle([target.definition, ...wrongs]);
  return {
    question: `What is the meaning of "${target.word}"?`,
    options,
    answer: target.definition,
    explanation: `"${target.word}" means: ${target.definition}`,
  };
}

router.get('/generate', (req, res) => {
  const length = Math.min(Math.max(parseInt(String(req.query.length ?? '10'), 10) || 10, 3), 30);
  const difficulty = typeof req.query.difficulty === 'string' ? req.query.difficulty : 'mixed';

  const pool = WORD_BANK.filter(
    (w) => difficulty === 'mixed' || w.difficulty === difficulty,
  );
  const source = pool.length >= 3 ? pool : WORD_BANK;

  const chosen = shuffle(source).slice(0, Math.min(length, source.length));
  const questions = chosen.map((w) => makeQuestion(w, source));

  return res.json({ id: randomUUID(), length: questions.length, difficulty, questions });
});

router.get('/daily', (req, res) => {
  const now = new Date();
  const dayIndex = Math.floor(now.getTime() / 86_400_000);
  const item = DAILY_WORDS[dayIndex % DAILY_WORDS.length];
  const date = now.toISOString().slice(0, 10);
  return res.json({ id: String(dayIndex), word: item.word, meaning: item.meaning, date });
});

router.post('/submit', authRequired, async (req, res, next) => {
  try {
    const score = typeof req.body?.score === 'number' ? req.body.score : NaN;
    const total = typeof req.body?.total === 'number' ? req.body.total : NaN;
    const difficulty = typeof req.body?.difficulty === 'string' ? req.body.difficulty : 'mixed';

    if (!Number.isInteger(score) || !Number.isInteger(total) || total <= 0 || score < 0) {
      return res.status(400).json({ message: 'Invalid score or total' });
    }

    const result = await prisma.quizResult.create({
      data: { score, total, difficulty, userId: req.user!.id },
    });
    return res.status(201).json({ id: result.id });
  } catch (err) {
    return next(err);
  }
});

router.get('/history', authRequired, async (req, res, next) => {
  try {
    const history = await prisma.quizResult.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return res.json({ history });
  } catch (err) {
    return next(err);
  }
});

export default router;
