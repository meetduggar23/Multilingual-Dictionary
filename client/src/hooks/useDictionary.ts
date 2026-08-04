import { useState, useCallback, useRef } from 'react';
import {
  searchWord,
  getRelatedWords,
  getSuggestions,
  translate,
  getDailyWord,
  generateQuiz,
  submitQuizResult,
  getQuizHistory,
  getFavorites,
  addFavorite,
  removeFavorite,
  getHistory,
  clearHistory,
  getAnalyticsSummary,
  type DictionaryEntry,
  type RelatedWords,
  type Suggestion,
  type Quiz,
} from '@/services/dictionaryApi';

export function useDictionary() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [relatedWords, setRelatedWords] = useState<RelatedWords | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (word: string, language = 'en') => {
    if (!word.trim()) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const [entriesResult, relatedResult] = await Promise.all([
        searchWord(word, language),
        getRelatedWords(word).catch(() => null),
      ]);
      setEntries(entriesResult);
      setRelatedWords(relatedResult);
      return entriesResult;
    } catch (err: any) {
      if (err?.status === 404) {
        setError(`No definitions found for "${word}"`);
      } else {
        setError(err?.message ?? 'Failed to look up word');
      }
      setEntries([]);
      setRelatedWords(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSuggest = useCallback(async (q: string): Promise<Suggestion[]> => {
    if (!q.trim()) return [];
    return getSuggestions(q);
  }, []);

  const translateText = useCallback(async (text: string, target: string, source?: string) => {
    return translate(text, target, source);
  }, []);

  const reset = useCallback(() => {
    setEntries([]);
    setRelatedWords(null);
    setError(null);
  }, []);

  return { entries, relatedWords, loading, error, search, getSuggest, translateText, reset };
}

export function useDailyWord() {
  const [word, setWord] = useState<{ id: string; word: string; meaning: string; date: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getDailyWord();
      setWord(result);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  return { word, loading, fetch };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { favorites: items } = await getFavorites();
      setFavorites(items);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (word: string, language = 'en') => {
    const result = await addFavorite(word, language);
    setFavorites((prev) => [result.favorite, ...prev]);
    return result;
  }, []);

  const remove = useCallback(async (id: string) => {
    await removeFavorite(id);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorited = useCallback(
    (word: string) => favorites.some((f) => f.word.toLowerCase() === word.toLowerCase()),
    [favorites],
  );

  return { favorites, loading, fetchAll, add, remove, isFavorited };
}

export function useHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { history: items } = await getHistory();
      setHistory(items);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(async () => {
    await clearHistory();
    setHistory([]);
  }, []);

  return { history, loading, fetchAll, clear };
}

export function useQuiz() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async (length = 10, difficulty = 'mixed') => {
    setLoading(true);
    try {
      const result = await generateQuiz(length, difficulty);
      setQuiz(result);
      return result;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submit = useCallback(async (score: number, total: number, difficulty: string) => {
    return submitQuizResult(score, total, difficulty);
  }, []);

  return { quiz, loading, generate, submit };
}

export function useAnalytics() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAnalyticsSummary();
      setSummary(result);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  return { summary, loading, fetch };
}
