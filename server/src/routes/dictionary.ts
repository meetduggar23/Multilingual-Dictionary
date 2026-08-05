import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { optionalAuth } from '../middleware/auth.js';
import {
  searchDictionary,
  getRelatedWords,
  getRhymes,
  getSuggestions,
  translateText,
} from '../services/dictionary.js';

const router = Router();

router.get('/search', optionalAuth, async (req, res, next) => {
  try {
    const word = typeof req.query.word === 'string' ? req.query.word.trim() : '';
    if (!word) return res.status(400).json({ message: 'word query parameter is required' });

    const language = typeof req.query.language === 'string' ? req.query.language : 'en';
    const entries = await searchDictionary(word, language);

    if (req.user) {
      await prisma.historyEntry
        .create({ data: { word, language, userId: req.user.id } })
        .catch(() => undefined);
    }

    if (!entries || entries.length === 0) {
      return res.status(404).json({ message: `No definitions found for "${word}"` });
    }
    return res.json({ word, language, entries });
  } catch (err) {
    return next(err);
  }
});

router.get('/related', async (req, res, next) => {
  try {
    const word = typeof req.query.word === 'string' ? req.query.word.trim() : '';
    if (!word) return res.status(400).json({ message: 'word query parameter is required' });
    const related = await getRelatedWords(word);
    return res.json(related);
  } catch (err) {
    return next(err);
  }
});

router.get('/rhymes', async (req, res, next) => {
  try {
    const word = typeof req.query.word === 'string' ? req.query.word.trim() : '';
    if (!word) return res.status(400).json({ message: 'word query parameter is required' });
    const rhymes = await getRhymes(word);
    return res.json({ word, rhymes });
  } catch (err) {
    return next(err);
  }
});

router.get('/suggest', async (req, res, next) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!q) return res.json([]);
    const max = Math.min(Math.max(parseInt(String(req.query.max ?? '8'), 10) || 8, 1), 30);
    const suggestions = await getSuggestions(q, max);
    return res.json(suggestions);
  } catch (err) {
    return next(err);
  }
});

router.post('/translate', async (req, res, next) => {
  try {
    const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    const targetLang = typeof req.body?.targetLang === 'string' ? req.body.targetLang : 'es';
    const sourceLang = typeof req.body?.sourceLang === 'string' ? req.body.sourceLang : 'auto';

    if (!text) return res.status(400).json({ message: 'text is required' });

    const result = await translateText(text, targetLang, sourceLang);
    return res.json(result);
  } catch (err: any) {
    return res.status(502).json({ message: err?.message ?? 'Translation failed' });
  }
});

export default router;
