import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { prisma } from '../lib/prisma.js';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function signToken(user: { id: string }): string {
  return jwt.sign({ sub: user.id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export async function loadUserFromToken(token: string | undefined): Promise<AuthUser | null> {
  if (!token || !token.startsWith('Bearer ')) return null;
  try {
    const payload = jwt.verify(token.slice(7), config.jwtSecret) as { sub?: string };
    if (!payload.sub) return null;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email };
  } catch {
    return null;
  }
}

export async function authRequired(req: Request, res: Response, next: NextFunction) {
  const user = await loadUserFromToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  req.user = user;
  next();
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const user = await loadUserFromToken(req.headers.authorization);
  if (user) req.user = user;
  next();
}
