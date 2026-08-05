import { config as loadEnv } from 'dotenv';
import { resolve } from 'node:path';

loadEnv({ path: resolve(process.cwd(), '.env') });
loadEnv({ path: resolve(process.cwd(), '../.env') });

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  apiUrl: process.env.API_URL ?? 'http://localhost:5000/api',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  dictionaryApiUrl:
    process.env.DICTIONARY_API_URL ?? 'https://api.dictionaryapi.dev/api/v2/entries/en',
  datamuseApiUrl: process.env.DATAMUSE_API_URL ?? 'https://api.datamuse.com',
  libretranslateUrl: process.env.LIBRETRANSLATE_API_URL ?? 'https://libretranslate.com/translate',
  libretranslateKey: process.env.LIBRETRANSLATE_API_KEY ?? '',
} as const;
