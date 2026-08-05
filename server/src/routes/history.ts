import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.use(authRequired);

router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? '50'), 10) || 50, 1), 200);
    const history = await prisma.historyEntry.findMany({
      where: { userId: req.user!.id },
      orderBy: { searchedAt: 'desc' },
      take: limit,
    });
    return res.json({ history });
  } catch (err) {
    return next(err);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    await prisma.historyEntry.deleteMany({ where: { userId: req.user!.id } });
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

export default router;
