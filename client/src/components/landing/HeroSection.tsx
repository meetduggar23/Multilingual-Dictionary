import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, BookText, Languages, Sparkles, Users } from 'lucide-react';

const stats = [
  { icon: BookText, value: '500K+', label: 'Words' },
  { icon: Languages, value: '100+', label: 'Languages' },
  { icon: Sparkles, value: 'AI', label: 'Powered' },
  { icon: Users, value: '1M+', label: 'Users' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function HeroSection() {
  const scrollToDictionary = () => {
    document.getElementById('ai-dictionary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-14 scroll-mt-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange-100/60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-32 h-72 w-72 rounded-full bg-orange-50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 -right-32 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center"
      >
        <motion.h1
          variants={item}
          className="font-display text-[44px] sm:text-[60px] md:text-[72px] font-extrabold leading-[1.05] tracking-tight text-navy text-balance"
        >
          Expand Your{' '}
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
            Vocabulary
          </span>
          , One Word at a Time.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-[17px] sm:text-[19px] leading-relaxed text-navy/60"
        >
          Discover meanings, pronunciation, examples, synonyms, translations, and AI-powered
          explanations designed to help you learn faster.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToDictionary}
            className="btn-gradient group inline-flex h-[54px] items-center gap-2.5 px-8 text-[16px]"
          >
            <BookOpenCheck className="h-5 w-5" />
            Explore Dictionary
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <Link
            to="/ai-assistant"
            className="inline-flex h-[54px] items-center gap-2.5 rounded-2xl border border-cream-400 bg-white px-8 text-[16px] font-semibold text-navy shadow-soft transition-all duration-200 hover:shadow-card hover:-translate-y-0.5"
          >
            <Sparkles className="h-5 w-5 text-orange-500" />
            Ask AI Assistant
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-cream-400 bg-white/70 px-4 py-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-card"
              >
                <Icon className="h-5 w-5 text-orange-500" />
                <span className="font-display text-[18px] font-extrabold text-navy">{value}</span>
                <span className="text-[12px] font-medium text-navy/45">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div variants={item} className="relative mx-auto mt-14 max-w-4xl">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="card-premium relative z-10 overflow-hidden p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-50 blur-2xl" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-glow-orange">
                <BookText className="h-7 w-7" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[22px] font-extrabold text-navy">Serendipity</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
                    noun
                  </span>
                </div>
                <p className="mt-1.5 text-[14px] text-navy/60">
                  The occurrence and development of events by chance in a happy or beneficial way.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {['chance', 'fortune', 'luck'].map((s) => (
                  <span key={s} className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[12px] font-medium text-orange-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -left-4 sm:-left-10 top-1/2 z-20 hidden -translate-y-1/2 rotate-[-4deg] rounded-2xl bg-white px-5 py-4 shadow-card sm:block"
          >
            <p className="text-[12px] font-bold text-navy">Word of the Day</p>
            <p className="text-[13px] text-orange-500">+250 XP</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -right-4 sm:-right-8 bottom-1/4 z-20 hidden rotate-[3deg] rounded-2xl bg-white px-5 py-4 shadow-card sm:block"
          >
            <p className="text-[12px] font-bold text-navy">Streak</p>
            <p className="text-[13px] font-semibold text-orange-500">18 days 🔥</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
