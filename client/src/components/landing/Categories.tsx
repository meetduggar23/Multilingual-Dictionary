import { motion } from 'framer-motion';
import { ArrowRight, FolderOpen } from 'lucide-react';

const categories = [
  { name: 'Business English', words: '2,400 words', icon: '💼', gradient: 'from-sky-400 to-blue-500' },
  { name: 'Technology', words: '3,100 words', icon: '💻', gradient: 'from-violet-400 to-purple-500' },
  { name: 'Medical', words: '1,800 words', icon: '🩺', gradient: 'from-rose-400 to-red-500' },
  { name: 'Law', words: '1,500 words', icon: '⚖️', gradient: 'from-stone-400 to-slate-500' },
  { name: 'Programming', words: '2,900 words', icon: '👨‍💻', gradient: 'from-emerald-400 to-teal-500' },
  { name: 'IELTS', words: '4,200 words', icon: '📘', gradient: 'from-amber-400 to-orange-500' },
  { name: 'TOEFL', words: '3,800 words', icon: '📗', gradient: 'from-lime-400 to-green-500' },
  { name: 'GRE', words: '5,000 words', icon: '📕', gradient: 'from-orange-400 to-red-500' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function Categories() {
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
          <FolderOpen className="mr-1.5 h-3.5 w-3.5" /> Featured Categories
        </span>
        <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
          Learn by Topic
        </h2>
        <p className="mt-3 text-[15px] text-navy/55">Focused vocabulary sets for every goal.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {categories.map(({ name, words, icon, gradient }) => (
          <motion.div
            key={name}
            variants={item}
            className="group relative overflow-hidden rounded-[24px] border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
          >
            <div className={`h-20 w-full bg-gradient-to-br ${gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_2px,transparent_2px)] [background-size:16px_16px]" />
              <div className="absolute -bottom-4 left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-[28px] shadow-card transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {icon}
              </div>
            </div>
            <div className="p-6 pt-9">
              <h3 className="font-display text-[17px] font-bold text-navy">{name}</h3>
              <p className="mt-1 text-[13px] font-medium text-navy/45">{words}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-orange-500 transition-all duration-200 hover:gap-3">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
