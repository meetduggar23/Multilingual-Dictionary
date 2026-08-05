import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Heart,
  Share2,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useDailyWord } from '@/hooks/useDictionary';
import { useSpeech } from '@/hooks/useVoice';

const fallbackWord = {
  word: 'Serendipity',
  meaning: 'The occurrence and development of events by chance in a happy or beneficial way.',
};

export function DailyLearning() {
  const { word, loading, fetch: fetchWord } = useDailyWord();
  const { speak, speaking, stop } = useSpeech();

  useEffect(() => { fetchWord(); }, [fetchWord]);

  const current = word ?? fallbackWord;

  return (
    <section id="daily-word" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-[13px] font-semibold text-orange-600">
          <Sparkles className="h-3.5 w-3.5" /> Daily Learning
        </span>
        <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
          Today's Word
        </h2>
        <p className="mt-3 text-[15px] text-navy/55">A new word every day to grow your vocabulary.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="card-premium relative overflow-hidden p-8 sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--blob-mid)] blur-2xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-[12px] font-bold text-white">
                Beginner
              </span>
              <span className="inline-flex items-center rounded-full bg-cream-200 px-3 py-1 text-[12px] font-semibold text-navy/60">
                Word of the Day
              </span>
            </div>

            {loading && !word ? (
              <div className="mt-6 h-24 w-64 shimmer-loading rounded-2xl" />
            ) : (
              <>
                <h3 className="font-display mt-5 text-[40px] sm:text-[52px] font-extrabold tracking-tight text-navy">
                  {current.word}
                </h3>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    onClick={() => (speaking ? stop() : speak(current.word))}
                    aria-label="Pronounce word"
                    className="group flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:shadow-glow-orange"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                  <span className="text-[14px] font-medium text-navy/40">/ˌsɛrənˈdɪpɪti/</span>
                </div>

                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-navy/65">
                  {current.meaning}
                </p>
                <p className="mt-4 max-w-xl rounded-2xl bg-cream-100 px-5 py-4 text-[14px] italic leading-relaxed text-navy/60">
                  "We discovered this charming café entirely by serendipity while wandering the old town."
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-navy/40">Synonyms:</span>
                  {['chance', 'fortune', 'luck', 'coincidence'].map((s) => (
                    <span key={s} className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[12px] font-medium text-orange-600">
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-5 text-[14px] font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
                <Heart className="h-4 w-4 text-orange-500" /> Save
              </button>
              <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-5 text-[14px] font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
                <Share2 className="h-4 w-4 text-orange-500" /> Share
              </button>
              <Link
                to="/daily-word"
                className="btn-gradient inline-flex h-11 items-center gap-2 px-6 text-[14px]"
              >
                <BookOpen className="h-4 w-4" /> Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-56 w-56 items-center justify-center rounded-[32px] bg-gradient-to-br from-[var(--blob-soft)] via-[var(--blob-mid)] to-card shadow-card"
            >
              <div className="absolute inset-4 rounded-[24px] border-2 border-dashed border-orange-200" />
              <div className="flex flex-col items-center gap-2">
                <span className="font-display text-[64px] font-extrabold text-navy">
                  {current.word.charAt(0).toUpperCase()}
                </span>
                <span className="rounded-full bg-orange-500 px-4 py-1 text-[11px] font-bold text-white">
                  WORD OF THE DAY
                </span>
              </div>
              <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-card">
                <Sparkles className="h-5 w-5 text-orange-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
