import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[36px] bg-band p-10 sm:p-16 text-center"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[560px] -translate-x-1/2 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-orange-300">
            <Sparkles className="h-3.5 w-3.5" /> Ready to Level Up?
          </span>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-[36px] sm:text-[52px] font-extrabold leading-tight tracking-tight text-white text-balance">
            Start Learning Smarter with AI.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-white/60">
            Build your vocabulary faster using intelligent explanations, quizzes, translations,
            and personalized learning.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dictionary"
              className="btn-gradient group inline-flex h-[54px] items-center gap-2.5 px-8 text-[16px]"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/ai-assistant"
              className="inline-flex h-[54px] items-center gap-2.5 rounded-2xl bg-white/10 px-8 text-[16px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              <Sparkles className="h-5 w-5 text-orange-300" />
              Explore AI Tools
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
