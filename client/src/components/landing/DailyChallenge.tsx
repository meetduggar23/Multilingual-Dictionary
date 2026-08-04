import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Gift, ListChecks, Mic, NotebookPen } from 'lucide-react';

const tasks = [
  { icon: NotebookPen, text: 'Learn 5 New Words', done: true },
  { icon: ListChecks, text: 'Complete Daily Quiz', done: false },
  { icon: Mic, text: 'Practice Pronunciation', done: false },
];

export function DailyChallenge() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 p-8 sm:p-12"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[13px] font-bold text-white backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5" /> Today's Challenge
            </span>
            <h2 className="font-display mt-5 text-[32px] sm:text-[42px] font-extrabold tracking-tight text-white">
              Complete Today's Challenge
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              Three quick tasks to keep your streak alive and your vocabulary growing.
            </p>

            <div className="mt-7 space-y-3">
              {tasks.map(({ icon: Icon, text, done }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-3.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${done ? 'bg-white text-orange-500' : 'border-2 border-white/60'}`}>
                    {done ? '✓' : ''}
                  </span>
                  <Icon className={`h-4 w-4 ${done ? 'text-white' : 'text-white/70'}`} />
                  <span className={`text-[14px] font-semibold ${done ? 'text-white' : 'text-white/80'}`}>{text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/quiz"
              className="group mt-7 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-7 text-[15px] font-bold text-orange-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Start Challenge
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center rounded-[32px] bg-white/15 p-10 backdrop-blur-sm"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-lg">
                <Gift className="h-10 w-10 text-orange-500" />
              </div>
              <p className="font-display mt-5 text-[15px] font-bold text-white/80">Daily Reward</p>
              <p className="font-display mt-1 text-[44px] font-extrabold text-white">+250 XP</p>
              <span className="mt-3 rounded-full bg-white/20 px-4 py-1.5 text-[12px] font-bold text-white">
                Keep going!
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
