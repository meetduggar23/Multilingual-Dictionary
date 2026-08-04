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
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="mt-4 text-[17px] sm:text-lg text-orange-500 font-medium max-w-xl"
      >
        Generate fast and accurate definitions of any word.
      </motion.p>
    </section>
  );
}
