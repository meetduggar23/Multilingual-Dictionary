import express, { type ErrorRequestHandler, type RequestHandler } from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import dictionaryRouter from './routes/dictionary.js';
import favoritesRouter from './routes/favorites.js';
import historyRouter from './routes/history.js';
import quizRouter from './routes/quiz.js';
import analyticsRouter from './routes/analytics.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/dictionary', dictionaryRouter);
  app.use('/api/favorites', favoritesRouter);
  app.use('/api/history', historyRouter);
  app.use('/api/quiz', quizRouter);
  app.use('/api/analytics', analyticsRouter);

  const notFound: RequestHandler = (_req, res) => {
    res.status(404).json({ message: 'Not found' });
  };
  app.use('/api', notFound);

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    if (res.headersSent) return;
    res.status(500).json({ message: 'Internal server error' });
  };
  app.use(errorHandler);

  return app;
}
