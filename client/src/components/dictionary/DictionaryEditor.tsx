import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Languages } from 'lucide-react';
import { useDictionary } from '@/hooks/useDictionary';
import { useSpeech } from '@/hooks/useVoice';
import { EditorCard } from './EditorCard';
import { toast } from 'sonner';

export function DictionaryEditor() {
  const [word, setWord] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const { entries, relatedWords, loading, error, search } = useDictionary();
  const { speak, speaking, stop } = useSpeech();

  const handleGenerate = useCallback(async () => {
    if (!word.trim()) {
      toast.error('Please enter a word');
      return;
    }
    const results = await search(word);
    if (results && results.length > 0) {
      const entry = results[0];
      const lines: string[] = [];

      lines.push(`# ${entry.word}`);
      if (entry.phonetic) lines.push(`*${entry.phonetic}*`);
      lines.push('');

      for (const meaning of entry.meanings) {
        lines.push(`## ${meaning.partOfSpeech}`);
        meaning.definitions.forEach((def, i) => {
          lines.push(`${i + 1}. ${def.definition}`);
          if (def.example) lines.push(`   _Example: "${def.example}"_`);
        });
        if (meaning.synonyms?.length) lines.push(`\n**Synonyms:** ${meaning.synonyms.slice(0, 5).join(', ')}`);
        if (meaning.antonyms?.length) lines.push(`**Antonyms:** ${meaning.antonyms.slice(0, 5).join(', ')}`);
        lines.push('');
      }

      if (relatedWords) {
        if (relatedWords.rhymes.length) lines.push(`**Rhymes:** ${relatedWords.rhymes.slice(0, 8).join(', ')}`);
        if (relatedWords.related.length) lines.push(`**Related:** ${relatedWords.related.slice(0, 8).join(', ')}`);
      }

      lines.push(`\n_Source: dictionaryapi.dev_`);
      setEditorContent(lines.join('\n'));
      toast.success(`Definition loaded for "${entry.word}"`);
    }
  }, [word, search, relatedWords]);

  const handleSpeak = useCallback(() => {
    if (speaking) {
      stop();
    } else if (word.trim()) {
      speak(word);
    }
  }, [word, speaking, speak, stop]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-premium p-7"
        >
          {/* Word Input */}
          <label className="label-premium mb-2 block">Word</label>
          <div className="relative mb-5">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Type any word..."
              className="input-premium pr-12"
            />
            <button
              onClick={handleSpeak}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-lg text-navy/40 hover:text-orange-500 hover:bg-orange-50 transition-all"
              title="Listen to pronunciation"
            >
              <Languages className="h-4 w-4" />
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !word.trim()}
            className="btn-gradient w-full h-14 text-[16px] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Definition
              </>
            )}
          </button>

          {error && (
            <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Quick synonyms */}
          {relatedWords && relatedWords.synonyms.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold text-navy/50 mb-2 uppercase tracking-wider">Quick Synonyms</p>
              <div className="flex flex-wrap gap-2">
                {relatedWords.synonyms.slice(0, 6).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setWord(s); }}
                    className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-medium border border-orange-100 hover:bg-orange-100 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick rhymes */}
          {relatedWords && relatedWords.rhymes.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-navy/50 mb-2 uppercase tracking-wider">Rhymes</p>
              <div className="flex flex-wrap gap-2">
                {relatedWords.rhymes.slice(0, 6).map((r) => (
                  <span
                    key={r}
                    className="px-3 py-1.5 rounded-full bg-cream-200 text-navy/70 text-xs font-medium"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right: Editor Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EditorCard content={editorContent} onChange={setEditorContent} />
        </motion.div>
      </div>
    </section>
  );
}
