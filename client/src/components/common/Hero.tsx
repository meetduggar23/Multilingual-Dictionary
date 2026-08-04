import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center pt-10 pb-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-display text-[48px] sm:text-[60px] md:text-[68px] font-extrabold text-navy leading-[1.1] tracking-tight"
      >
        AI-Dictionary
      </motion.h1>
    </section>
  );
}
