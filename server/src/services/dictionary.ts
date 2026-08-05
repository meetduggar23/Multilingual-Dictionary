import { config } from '../config.js';
import { FALLBACK_TRANSLATIONS } from '../data/translations.js';

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }[];
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

interface RawDictionaryEntry {
  word?: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings?: {
    partOfSpeech?: string;
    definitions?: {
      definition?: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }[];
    synonyms?: string[];
    antonyms?: string[];
  }[];
  sourceUrls?: string[];
}

const SUPPORTED_DICT_LANGS = /^(en|es|fr|de|it|pt|ru|ja|zh|hi|ar)$/i;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    if (res.status === 404) throw new UpstreamNotFound();
    throw new Error(`Upstream request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export class UpstreamNotFound extends Error {
  constructor() {
    super('Not found');
  }
}

export async function searchDictionary(
  word: string,
  language = 'en',
): Promise<DictionaryEntry[] | null> {
  const lang = SUPPORTED_DICT_LANGS.test(language) ? language : 'en';
  const base = config.dictionaryApiUrl.replace(/\/[a-z]{2,3}$/i, '').replace(/\/+$/, '');
  const url = `${base}/${encodeURIComponent(lang)}/${encodeURIComponent(word)}`;

  let raw: RawDictionaryEntry[];
  try {
    raw = await fetchJson<RawDictionaryEntry[]>(url);
  } catch (err) {
    if (err instanceof UpstreamNotFound) return null;
    throw err;
  }

  const entries: DictionaryEntry[] = raw
    .filter((e) => e && Array.isArray(e.meanings) && e.meanings.length > 0)
    .map((e) => ({
      word: e.word ?? word,
      phonetic: e.phonetic,
      phonetics: e.phonetics,
      meanings: (e.meanings ?? []).map((m) => ({
        partOfSpeech: m.partOfSpeech ?? 'Unknown',
        definitions: (m.definitions ?? []).map((d) => ({
          definition: d.definition ?? '',
          example: d.example,
          synonyms: d.synonyms,
          antonyms: d.antonyms,
        })),
        synonyms: m.synonyms,
        antonyms: m.antonyms,
      })),
      sourceUrls: e.sourceUrls,
    }));

  return entries.length > 0 ? entries : null;
}

async function datamuse(params: Record<string, string | number>): Promise<Suggestion[]> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) query.set(key, String(value));
  query.set('max', String(params.max ?? 20));
  const url = `${config.datamuseApiUrl}/words?${query.toString()}`;
  return fetchJson<Suggestion[]>(url);
}

export async function getRelatedWords(word: string): Promise<RelatedWords> {
  const [synonyms, antonyms, related, rhymes] = await Promise.all([
    datamuse({ rel_syn: word }),
    datamuse({ rel_ant: word }),
    datamuse({ rel_trg: word }),
    datamuse({ rel_rhy: word }),
  ]);
  return {
    synonyms: synonyms.map((s) => s.word).slice(0, 15),
    antonyms: antonyms.map((s) => s.word).slice(0, 15),
    related: related.map((s) => s.word).slice(0, 15),
    rhymes: rhymes.map((s) => s.word).slice(0, 15),
  };
}

export async function getRhymes(word: string): Promise<string[]> {
  const data = await datamuse({ rel_rhy: word });
  return data.map((s) => s.word).slice(0, 20);
}

export async function getSuggestions(q: string, max = 8): Promise<Suggestion[]> {
  const query = new URLSearchParams({ s: q, max: String(max) });
  const url = `${config.datamuseApiUrl}/sug?${query.toString()}`;
  return fetchJson<Suggestion[]>(url);
}

function translateLocally(text: string, targetLang: string): string | null {
  const key = text.trim().toLowerCase();
  if (/\s/.test(key)) return null;
  const word = FALLBACK_TRANSLATIONS[key];
  if (!word) return null;
  const translated = word[targetLang];
  if (!translated) return null;
  return translated;
}

export async function translateText(
  text: string,
  targetLang: string,
  sourceLang = 'auto',
): Promise<TranslationResult> {
  const body = new URLSearchParams({
    q: text,
    source: sourceLang === 'auto' ? 'auto' : sourceLang,
    target: targetLang,
    format: 'text',
  });
  if (config.libretranslateKey) body.set('api_key', config.libretranslateKey);

  try {
    const res = await fetch(config.libretranslateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Translation service failed (${res.status})`);
    const data = (await res.json()) as { translatedText?: string };
    if (!data.translatedText) throw new Error('Empty translation response');
    return { translatedText: data.translatedText, sourceLang, targetLang };
  } catch {
    const local = translateLocally(text, targetLang);
    if (local !== null) {
      return { translatedText: local, sourceLang, targetLang };
    }
    throw new Error(
      'Translation service is unavailable and this phrase is not in the offline dictionary.',
    );
  }
}
