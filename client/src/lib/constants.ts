import { LANGUAGES, DEFAULT_LANGUAGE, QUIZ_LENGTHS, QUIZ_DEFAULT_LENGTH, STORAGE_KEYS } from '@dictionary/shared';

export const APP_NAME = 'Dictionary AI';
export const APP_TAGLINE = 'Every word, every language, beautifully explained';

export const API_URL: string = import.meta.env.VITE_API_URL ?? '/api';

export { LANGUAGES, DEFAULT_LANGUAGE, QUIZ_LENGTHS, QUIZ_DEFAULT_LENGTH, STORAGE_KEYS };

export const SUPPORTED_LANGUAGES = LANGUAGES;

export const KEYBOARD_SHORTCUTS = [
  { keys: '/', action: 'Focus search' },
  { keys: 'Enter', action: 'Search' },
  { keys: 'Esc', action: 'Close / clear' },
  { keys: 'F', action: 'Toggle favorite' },
  { keys: 'T', action: 'Toggle translation panel' },
  { keys: 'D', action: 'Daily word' },
  { keys: 'Q', action: 'Quiz' },
  { keys: 'Ctrl + K', action: 'Toggle theme' },
] as const;
