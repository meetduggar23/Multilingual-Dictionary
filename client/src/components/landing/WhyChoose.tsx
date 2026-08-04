import { motion } from 'framer-motion';
import { BookMarked, Sparkles, Zap, MessageSquareText, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Instant results the moment you search any word.' },
  { icon: Sparkles, title: 'Context Aware AI', desc: 'Understands how a word is used in real sentences.' },
  { icon: MessageSquareText, title: 'Natural Examples', desc: 'Real-world sentences that make meaning stick.' },
  { icon: ShieldCheck, title: 'Accurate Definitions', desc: 'Curated, verified definitions you can trust.' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function WhyChoose() {
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
          <BookMarked className="mr-1.5 h-3.5 w-3.5" /> Why Choose Us
        </span>
        <h2 className="font-display mt-4 text-[34px] sm:text-[42px] font-extrabold tracking-tight text-navy">
          Why Choose Our AI Dictionary
        </h2>
        <p className="mt-3 text-[15px] text-navy/55">Built to make vocabulary learning effortless.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {features.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={item}
            className="group rounded-[24px] border border-cream-400 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-glow-orange">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-[16px] font-bold text-navy">{title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/50">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
