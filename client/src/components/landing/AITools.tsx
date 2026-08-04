import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenText,
  Bot,
  Languages,
  Layers,
  Mic,
  PenLine,
  Shuffle,
  Sparkles,
  SpellCheck2,
} from 'lucide-react';

const tools = [
  { to: '/dictionary', label: 'AI Dictionary', desc: 'Instant meanings with AI context', icon: BookOpenText, color: 'bg-orange-50 text-orange-500' },
  { to: '/translator', label: 'AI Translator', desc: 'Translate naturally across 100+ languages', icon: Languages, color: 'bg-sky-50 text-sky-500' },
  { to: '/ai-assistant', label: 'AI Sentence Generator', desc: 'Build natural example sentences', icon: PenLine, color: 'bg-emerald-50 text-emerald-500' },
  { to: '/ai-assistant', label: 'AI Synonym Finder', desc: 'Discover better word choices', icon: Layers, color: 'bg-violet-50 text-violet-500' },
  { to: '/ai-assistant', label: 'AI Antonym Finder', desc: 'Find precise opposites', icon: Shuffle, color: 'bg-rose-50 text-rose-500' },
  { to: '/ai-assistant', label: 'AI Grammar Fixer', desc: 'Perfect your writing instantly', icon: SpellCheck2, color: 'bg-amber-50 text-amber-500' },
  { to: '/ai-assistant', label: 'AI Explain Like I\'m 10', desc: 'Simple explanations for complex words', icon: Bot, color: 'bg-cyan-50 text-cyan-500' },
  { to: '/ai-assistant', label: 'AI Pronunciation Coach', desc: 'Master accent and tone with audio', icon: Mic, color: 'bg-indigo-50 text-indigo-500' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function AITools() {
  return (
    <section className="relative overflow-hidden bg-navy py-16">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-orange-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> AI Tools
          </span>
          <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-white">
            Supercharge Your Learning
          </h2>
          <p className="mt-3 text-[15px] text-white/60">Eight intelligent tools, one powerful platform.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {tools.map(({ to, label, desc, icon: Icon, color }) => (
            <motion.div key={label} variants={item}>
              <Link
                to={to}
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.1] hover:shadow-glow-orange"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-[15px] font-bold text-white">{label}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-white/50">{desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-orange-300">
                  Open Tool
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
