import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.use(authRequired);

router.get('/', async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ favorites });
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const word = typeof req.body?.word === 'string' ? req.body.word.trim() : '';
    if (!word) return res.status(400).json({ message: 'word is required' });
    const language = typeof req.body?.language === 'string' ? req.body.language : 'en';

    const existing = await prisma.favorite.findUnique({
      where: { userId_word_language: { userId: req.user!.id, word, language } },
    });

    let favorite = existing;
    if (!favorite) {
      favorite = await prisma.favorite.create({
        data: { word, language, userId: req.user!.id },
      });
    }
    return res.status(201).json({ favorite });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.favorite.deleteMany({ where: { id: req.params.id, userId: req.user!.id } });
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

export default router;
