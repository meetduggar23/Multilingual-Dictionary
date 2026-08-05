import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookText,
  Bot,
  Clock,
  Heart,
  Languages,
  Sparkles,
  SpellCheck,
  SquarePen,
} from 'lucide-react';

const actions = [
  { to: '/dictionary', label: 'Search Dictionary', desc: 'Find any word instantly', icon: BookText },
  { to: '/ai-assistant', label: 'AI Dictionary', desc: 'AI-powered explanations', icon: Bot },
  { to: '/translator', label: 'Translate Word', desc: '100+ languages', icon: Languages },
  { to: '/quiz', label: 'Daily Quiz', desc: 'Test your knowledge', icon: SquarePen },
  { to: '/history', label: 'Word History', desc: 'Review past searches', icon: Clock },
  { to: '/favorites', label: 'Favorites', desc: 'Your saved words', icon: Heart },
  { to: '/dictionary', label: 'Flashcards', desc: 'Learn with cards', icon: Sparkles },
  { to: '/ai-assistant', label: 'Grammar Checker', desc: 'Fix grammar with AI', icon: SpellCheck },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function QuickActions() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-[13px] font-semibold text-orange-600">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Quick Actions
        </span>
        <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
          Everything You Need to Learn
        </h2>
        <p className="mt-3 text-[15px] text-navy/55">Powerful tools, one tap away.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {actions.map(({ to, label, desc, icon: Icon }) => (
          <motion.div key={label} variants={item}>
            <Link
              to={to}
              className="group relative block overflow-hidden rounded-[24px] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-glow-orange">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-[16px] font-bold text-navy">{label}</h3>
              <p className="mt-1 text-[13px] text-navy/50">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
