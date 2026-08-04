import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Clock, Flame, Heart, Target } from 'lucide-react';

const stats = [
  { label: 'Words Learned', value: 86, current: '3,420', goal: 'of 4,000', icon: BookOpen, color: 'text-orange-500', stroke: '#F97316' },
  { label: 'Saved Words', value: 64, current: '128', goal: 'saved words', icon: Heart, color: 'text-rose-500', stroke: '#F43F5E' },
  { label: 'Quiz Accuracy', value: 92, current: '92%', goal: 'accuracy', icon: Target, color: 'text-emerald-500', stroke: '#10B981' },
  { label: 'Current Streak', value: 100, current: '18', goal: 'days streak', icon: Flame, color: 'text-amber-500', stroke: '#F59E0B' },
  { label: 'Learning Time', value: 74, current: '12.5h', goal: 'this week', icon: Clock, color: 'text-sky-500', stroke: '#0EA5E9' },
  { label: 'Weekly Goal', value: 55, current: '55%', goal: 'of 100% goal', icon: BarChart3, color: 'text-violet-500', stroke: '#8B5CF6' },
];

function CircularStat({
  label, value, current, goal, icon: Icon, color, stroke,
}: (typeof stats)[number]) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group flex flex-col items-center rounded-[24px] border border-cream-400 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
    >
      <div className="relative mb-4 h-[104px] w-[104px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F8F4EE" strokeWidth="9" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (circumference * value) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
      <h3 className="font-display text-[15px] font-bold text-navy">{label}</h3>
      <p className="mt-1 font-display text-[22px] font-extrabold text-navy">{current}</p>
      <p className="text-[12px] font-medium text-navy/45">{goal}</p>
    </motion.div>
  );
}

export function LearningStats() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-[13px] font-semibold text-orange-600">
          <BarChart3 className="mr-1.5 h-3.5 w-3.5" /> Learning Stats
        </span>
        <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
          Your Progress at a Glance
        </h2>
        <p className="mt-3 text-[15px] text-navy/55">Track every step of your vocabulary journey.</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {stats.map((s) => <CircularStat key={s.label} {...s} />)}
      </div>
    </section>
  );
}
