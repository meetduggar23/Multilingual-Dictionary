import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Trophy } from 'lucide-react';

const paths = [
  {
    level: 'Beginner (A1)',
    progress: 82,
    learned: 1200,
    milestone: '2,000 words',
    color: 'from-emerald-400 to-teal-500',
    icon: '🌱',
  },
  {
    level: 'Intermediate (B1)',
    progress: 55,
    learned: 1800,
    milestone: '3,500 words',
    color: 'from-orange-400 to-amber-500',
    icon: '🚀',
  },
  {
    level: 'Advanced (C1)',
    progress: 31,
    learned: 2400,
    milestone: '5,000 words',
    color: 'from-blue-400 to-indigo-500',
    icon: '🏆',
  },
  {
    level: 'Professional',
    progress: 12,
    learned: 3100,
    milestone: '8,000 words',
    color: 'from-purple-400 to-violet-500',
    icon: '🎓',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export function LearningPath() {
  return (
    <section className="bg-white/60 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-[13px] font-semibold text-orange-600">
            <GraduationCap className="mr-1.5 h-3.5 w-3.5" /> Learning Path
          </span>
          <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
            Your Journey to Fluency
          </h2>
          <p className="mt-3 text-[15px] text-navy/55">Progress through levels at your own pace.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {paths.map(({ level, progress, learned, milestone, color, icon }) => (
            <motion.div
              key={level}
              variants={item}
              className="group relative overflow-hidden rounded-[24px] border border-cream-400 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-100 text-[22px] transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                <span className="rounded-full bg-cream-100 px-3 py-1 text-[12px] font-bold text-navy/60">
                  {progress}%
                </span>
              </div>
              <h3 className="font-display text-[16px] font-bold text-navy">{level}</h3>

              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${color}`}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-[13px]">
                <span className="font-semibold text-navy">{learned.toLocaleString()} words</span>
                <span className="text-navy/45">learned</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-navy/55">
                <Trophy className="h-3.5 w-3.5 text-orange-400" />
                Next: {milestone}
              </div>

              <Link
                to="/quiz"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cream-400 py-2.5 text-[14px] font-semibold text-navy transition-all duration-200 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-600"
              >
                Continue Learning <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
