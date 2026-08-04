import { api } from './apiClient';

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string; synonyms?: string[]; antonyms?: string[] }[];
    synonyms?: string[];
    antonyms?: string[];
  }[];
  sourceUrls?: string[];
}

export interface RelatedWords {
  synonyms: string[];
  antonyms: string[];
  related: string[];
  rhymes: string[];
}

export interface Suggestion {
  word: string;
  score?: number;
}

export interface TranslationResult {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
}

export async function searchWord(word: string, language = 'en'): Promise<DictionaryEntry[]> {
  const data = await api.get<{ word: string; language: string; entries: DictionaryEntry[] }>(
    `/dictionary/search?word=${encodeURIComponent(word)}&language=${language}`,
  );
  return data.entries;
}

export async function getRelatedWords(word: string): Promise<RelatedWords> {
  return api.get<RelatedWords>(`/dictionary/related?word=${encodeURIComponent(word)}`);
}

export async function getRhymes(word: string): Promise<string[]> {
  const data = await api.get<{ word: string; rhymes: string[] }>(
    `/dictionary/rhymes?word=${encodeURIComponent(word)}`,
  );
  return data.rhymes;
}

export async function getSuggestions(q: string): Promise<Suggestion[]> {
  return api.get<Suggestion[]>(`/dictionary/suggest?q=${encodeURIComponent(q)}&max=8`);
}

export async function translate(text: string, targetLang: string, sourceLang?: string): Promise<TranslationResult> {
  return api.post<TranslationResult>('/dictionary/translate', { text, targetLang, sourceLang });
}

export async function generateQuiz(length = 10, difficulty = 'mixed') {
  return api.get<{
    id: string;
    length: number;
    difficulty: string;
    questions: { question: string; options: string[]; answer: string; explanation?: string }[];
  }>(`/quiz/generate?length=${length}&difficulty=${difficulty}`);
}

export async function getDailyWord() {
  return api.get<{ id: string; word: string; meaning: string; date: string }>('/quiz/daily');
}

export async function submitQuizResult(score: number, total: number, difficulty: string) {
  return api.post('/quiz/submit', { score, total, difficulty });
}

export async function getQuizHistory() {
  return api.get<{ history: any[] }>('/quiz/history');
}

export async function getFavorites() {
  return api.get<{ favorites: any[] }>('/favorites');
}

export async function addFavorite(word: string, language = 'en') {
  return api.post('/favorites', { word, language });
}

export async function removeFavorite(id: string) {
  return api.delete(`/favorites/${id}`);
}

export async function getHistory(limit = 50) {
  return api.get<{ history: any[] }>(`/history?limit=${limit}`);
}

export async function clearHistory() {
  return api.delete('/history');
}

export async function getAnalyticsSummary() {
  return api.get<any>('/analytics/summary');
}
