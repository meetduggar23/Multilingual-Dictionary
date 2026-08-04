import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Volume2 } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useDictionary } from '@/hooks/useDictionary';
import { useSpeech } from '@/hooks/useVoice';
import { LANGUAGES } from '@dictionary/shared';

export default function TranslatorPage() {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('es');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { translateText } = useDictionary();
  const { speak } = useSpeech();

  const handleTranslate = useCallback(async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await translateText(text, targetLang);
      setResult(res.translatedText);
    } catch {
      setResult('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [text, targetLang, translateText]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <Globe className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">Translator</h1>
          <p className="text-navy/50 mt-2">Translate words across languages</p>
        </motion.div>

        <div className="card-premium p-6 mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text to translate..."
            className="w-full h-32 bg-transparent text-navy placeholder:text-cream-500 focus:outline-none resize-none text-[15px]"
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-300">
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="select-premium w-auto min-w-[180px]"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
            <button
              onClick={handleTranslate}
              disabled={loading || !text.trim()}
              className="btn-gradient h-11 px-6 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4" /> Translate</>}
            </button>
          </div>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-premium p-6">
            <p className="text-[15px] text-navy leading-relaxed">{result}</p>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
