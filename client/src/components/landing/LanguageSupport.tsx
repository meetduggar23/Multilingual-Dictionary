import { motion } from 'framer-motion';
import { Check, Globe2 } from 'lucide-react';

const languages = [
  'English', 'Hindi', 'Spanish', 'French',
  'German', 'Japanese', 'Chinese', 'Arabic',
];

export function LanguageSupport() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="card-premium relative overflow-hidden p-8 sm:p-12"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-50 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-[13px] font-semibold text-orange-600">
              <Globe2 className="mr-1.5 h-3.5 w-3.5" /> Language Support
            </span>
            <h2 className="font-display mt-4 text-[32px] sm:text-[40px] font-extrabold tracking-tight text-navy">
              Learn in Any Language
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-navy/55">
              From English to Arabic, get definitions, translations, and pronunciation in the
              language you're learning.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-2.5">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center gap-2.5 rounded-2xl border border-cream-400 bg-white px-4 py-3 text-[14px] font-semibold text-navy transition-all duration-200 hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </span>
                  {lang}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-glow-orange">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-[22px] font-extrabold text-navy">100+ Languages</p>
                <p className="text-[13px] text-navy/45">Supported across all features</p>
              </div>
            </div>
          </div>

          {/* World map illustration */}
          <div className="relative">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center rounded-[32px] bg-gradient-to-br from-cream-100 to-orange-50 shadow-card"
            >
              <Globe2 className="h-40 w-40 text-orange-200" strokeWidth={1.2} />
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-orange-200" />
              {[
                { top: '18%', left: '30%', delay: 0 },
                { top: '30%', left: '68%', delay: 0.6 },
                { top: '55%', left: '22%', delay: 1.2 },
                { top: '68%', left: '60%', delay: 0.3 },
                { top: '42%', left: '48%', delay: 1.8 },
              ].map(({ top, left, delay }, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay }}
                  className="absolute h-3 w-3 rounded-full bg-orange-500 shadow-glow-orange"
                  style={{ top, left }}
                />
              ))}
              <span className="absolute bottom-6 rounded-full bg-white px-4 py-1.5 text-[12px] font-bold text-navy shadow-card">
                100+ Languages
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
