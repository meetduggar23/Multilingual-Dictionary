import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Sparkles } from 'lucide-react';

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
    <section id="home" className="relative overflow-hidden pt-14 pb-4 scroll-mt-20">
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
      </motion.div>
    </section>
  );
}
