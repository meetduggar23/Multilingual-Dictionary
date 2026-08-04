import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Languages, Volume2 } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useDailyWord } from '@/hooks/useDictionary';
import { useSpeech } from '@/hooks/useVoice';

export default function DailyWordPage() {
  const { word, loading, fetch: fetchWord } = useDailyWord();
  const { speak, speaking, stop } = useSpeech();

  useEffect(() => { fetchWord(); }, [fetchWord]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <CalendarHeart className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">Daily Word</h1>
          <p className="text-navy/50 mt-2">Discover a new word every day</p>
        </motion.div>

        {loading ? (
          <div className="card-premium p-10 shimmer-loading h-48" />
        ) : word ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-premium p-8 text-center"
          >
            <h2 className="font-display text-[42px] font-extrabold text-navy mb-2">{word.word}</h2>
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => speaking ? stop() : speak(word.word)}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100 transition-all"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[16px] text-navy/65 leading-relaxed max-w-md mx-auto">{word.meaning}</p>
            <p className="text-xs text-navy/30 mt-6">{word.date}</p>
          </motion.div>
        ) : (
          <div className="card-premium p-10 text-center text-navy/40">No daily word available.</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
