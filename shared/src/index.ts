export interface Language {
  code: string;
  name: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
];

export const DEFAULT_LANGUAGE = 'en';

export const QUIZ_LENGTHS = [5, 10, 15, 20] as const;

export const QUIZ_DEFAULT_LENGTH = 10;

export const STORAGE_KEYS = {
  token: 'dict:token',
  user: 'dict:user',
  recent: 'dict:recent',
  favorites: 'dict:favorites',
  history: 'dict:history',
  theme: 'dict:theme',
} as const;
