import { motion } from 'framer-motion';
import { Globe2, HeartHandshake, SearchCheck, Star } from 'lucide-react';

const metrics = [
  { icon: HeartHandshake, value: '1M+', label: 'Active Learners', color: 'bg-orange-50 text-orange-500' },
  { icon: SearchCheck, value: '500K+', label: 'Daily Searches', color: 'bg-sky-50 text-sky-500' },
  { icon: Globe2, value: '100+', label: 'Supported Languages', color: 'bg-emerald-50 text-emerald-500' },
  { icon: Star, value: '4.9', label: 'User Rating', color: 'bg-amber-50 text-amber-500', badge: '★' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function Community() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
          Loved by Learners Worldwide
        </h2>
        <p className="mt-3 text-[15px] text-navy/55">Join a growing community of curious minds.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {metrics.map(({ icon: Icon, value, label, color, badge }) => (
          <motion.div
            key={label}
            variants={item}
            className="group rounded-[24px] border border-cream-400 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
          >
            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-display text-[34px] font-extrabold text-navy">
              {badge && <span className="text-amber-400">{badge} </span>}
              {value}
            </p>
            <p className="mt-1 text-[13px] font-medium text-navy/50">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
