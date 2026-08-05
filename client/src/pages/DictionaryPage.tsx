import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Languages, Heart, Share2, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useDictionary, useFavorites } from '@/hooks/useDictionary';
import { useSpeech } from '@/hooks/useVoice';
import { toast } from 'sonner';

export default function DictionaryPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [recentWords, setRecentWords] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('dict:recent') ?? '[]'); } catch { return []; }
  });
  const { entries, relatedWords, loading, error, search } = useDictionary();
  const { speak, speaking, stop } = useSpeech();
  const { favorites, fetchAll: fetchFavorites, add: addFav, remove: removeFav } = useFavorites();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleSearch = useCallback(async (wordOverride?: string) => {
    const word = (wordOverride ?? query).trim();
    if (!word) return;
    const result = await search(word);
    if (result?.length) {
      setRecentWords((prev) => {
        const updated = [word, ...prev.filter((w) => w !== word)].slice(0, 10);
        localStorage.setItem('dict:recent', JSON.stringify(updated));
        return updated;
      });
    }
  }, [query, search]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      handleSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const entry = entries[0];
  const favorite = entry ? favorites.find((f) => f.word.toLowerCase() === entry.word.toLowerCase()) : undefined;
  const favorited = !!favorite;

  const handleToggleFavorite = useCallback(async () => {
    if (!entry) return;
    try {
      if (favorited && favorite) {
        await removeFav(favorite.id);
      } else {
        await addFav(entry.word);
      }
    } catch (err: any) {
      if (err?.status === 401) {
        toast.error('Please sign in to save favorites');
      } else {
        toast.error(err?.message ?? 'Could not update favorite');
      }
    }
  }, [entry, favorite, favorited, addFav, removeFav]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 pt-8 pb-16">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-3 flex items-center gap-3 mb-8"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 shrink-0">
            <Search className="h-5 w-5 text-orange-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search any word..."
            className="flex-1 h-11 bg-transparent text-navy placeholder:text-cream-500 focus:outline-none text-[15px]"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="h-10 px-5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><ArrowRight className="h-4 w-4" /> Search</>}
          </button>
        </motion.div>

        {/* Recent words */}
        {recentWords.length > 0 && !entry && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">Recent Searches</p>
            <div className="flex flex-wrap gap-2">
              {recentWords.map((w) => (
                <button
                  key={w}
                  onClick={() => { setQuery(w); handleSearch(w); }}
                  className="px-4 py-2 rounded-xl bg-card border border-border text-sm text-foreground/70 hover:border-orange-300 hover:text-orange-500 transition-all shadow-soft"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="card-premium p-8 text-center mb-8">
            <p className="text-navy/50 text-[15px]">{error}</p>
          </div>
        )}

        {/* Definition Results */}
        {entry && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Word Header */}
            <div className="card-premium p-7 mb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-[36px] font-extrabold text-navy leading-tight">{entry.word}</h1>
                  {entry.phonetic && (
                    <p className="text-navy/45 text-[15px] mt-1 font-mono">{entry.phonetic}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => speaking ? stop() : speak(entry.word)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-cream-200 text-navy/50 hover:bg-orange-50 hover:text-orange-500 transition-all"
                    title="Listen"
                  >
                    <Languages className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all ${favorited ? 'bg-orange-50 text-orange-500' : 'bg-cream-200 text-navy/50 hover:bg-orange-50 hover:text-orange-500'}`}
                    title="Favorite"
                  >
                    <Heart className={`h-5 w-5 ${favorited ? 'fill-orange-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(entry.word); toast.success('Copied!'); }}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-cream-200 text-navy/50 hover:bg-orange-50 hover:text-orange-500 transition-all"
                    title="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Meanings */}
            <div className="space-y-4">
              {entry.meanings.map((meaning, i) => (
                <motion.div
                  key={`${meaning.partOfSpeech}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-premium p-6"
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold mb-4 border border-orange-100">
                    {meaning.partOfSpeech}
                  </span>
                  <div className="space-y-4">
                    {meaning.definitions.map((def, j) => (
                      <div key={j}>
                        <p className="text-[15px] text-navy leading-relaxed">{j + 1}. {def.definition}</p>
                        {def.example && (
                          <p className="mt-1.5 ml-4 text-[13px] text-navy/50 italic border-l-2 border-orange-200 pl-3">
                            "{def.example}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {(meaning.synonyms?.length ?? 0) > 0 && (
                    <div className="mt-4 pt-4 border-t border-cream-300">
                      <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-2">Synonyms</p>
                      <div className="flex flex-wrap gap-1.5">
                        {meaning.synonyms!.slice(0, 8).map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs border border-orange-100">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Related Words */}
            {relatedWords && (relatedWords.rhymes.length > 0 || relatedWords.related.length > 0) && (
              <div className="card-premium p-6 mt-4">
                {relatedWords.rhymes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-2">Rhymes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedWords.rhymes.slice(0, 10).map((r) => (
                        <span key={r} className="px-2.5 py-1 rounded-full bg-cream-200 text-navy/60 text-xs">{r}</span>
                      ))}
                    </div>
                  </div>
                )}
                {relatedWords.related.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-2">Related Words</p>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedWords.related.slice(0, 10).map((r) => (
                        <span key={r} className="px-2.5 py-1 rounded-full bg-cream-200 text-navy/60 text-xs">{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
