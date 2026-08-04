import { motion, type Variants } from 'framer-motion';
import { Zap, Shield, Globe, Brain } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast Results',
    description: 'Get instant meanings and definitions powered by AI.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    icon: Shield,
    title: 'Accurate',
    description: 'AI ensures the most accurate and reliable results.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Supports definitions in 100+ languages.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    icon: Brain,
    title: 'AI Powered',
    description: 'Advanced AI understands context and intent.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {features.map(({ icon: Icon, title, description, color, iconColor }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            className="card-elevated p-6 flex flex-col gap-4 cursor-default"
          >
            <div className={`h-12 w-12 flex items-center justify-center rounded-2xl ${color}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className="font-display text-[16px] font-bold text-navy">{title}</h3>
              <p className="text-[14px] text-navy/55 mt-1.5 leading-relaxed">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
