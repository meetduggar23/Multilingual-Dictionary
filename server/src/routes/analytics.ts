import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

function formatDay(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function computeStreak(dates: Date[]): number {
  const days = new Set(dates.map((d) => formatDay(new Date(d))));
  const today = new Date();
  let streak = 0;
  let cursor = new Date(today);
  if (!days.has(formatDay(cursor))) {
    cursor = new Date(today.getTime() - 86_400_000);
  }
  while (days.has(formatDay(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - 86_400_000);
  }
  return streak;
}

router.get('/summary', authRequired, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const [favoriteCount, history, quizResults] = await Promise.all([
      prisma.favorite.count({ where: { userId } }),
      prisma.historyEntry.findMany({
        where: { userId },
        orderBy: { searchedAt: 'desc' },
        take: 1000,
      }),
      prisma.quizResult.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 1000,
      }),
    ]);

    const wordCounts = new Map<string, number>();
    for (const h of history) {
      wordCounts.set(h.word, (wordCounts.get(h.word) ?? 0) + 1);
    }
    const topWords = [...wordCounts.entries()]
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const activity = [
      ...history.map((h) => h.searchedAt),
      ...quizResults.map((q) => q.createdAt),
    ];

    const totalSearches = history.length;
    const totalQuizzes = quizResults.length;
    const avgScore =
      totalQuizzes > 0
        ? Math.round(
            (quizResults.reduce((sum, q) => sum + q.score, 0) / totalQuizzes) * 10,
          ) / 10
        : 0;

    return res.json({
      streak: computeStreak(activity),
      totalSearches,
      favoriteCount,
      totalQuizzes,
      avgScore,
      topWords,
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
