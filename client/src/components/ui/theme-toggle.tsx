import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-card/80 backdrop-blur-md border border-border shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-card hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex items-center justify-center text-orange-500"
        >
          {isDark ? <Moon className="h-[19px] w-[19px]" /> : <Sun className="h-[19px] w-[19px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
