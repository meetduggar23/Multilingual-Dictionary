import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CalendarHeart,
  Heart,
  Clock,
  GraduationCap,
  Globe,
  Sparkles,
  User,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dictionary', label: 'Dictionary', icon: Search },
  { to: '/daily-word', label: 'Daily Word', icon: CalendarHeart },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/quiz', label: 'Quiz', icon: GraduationCap },
  { to: '/translator', label: 'Translator', icon: Globe },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5 shrink-0">
          <span className="font-display text-[26px] font-extrabold tracking-tight text-navy">Lexi</span>
          <span className="text-[26px] font-extrabold text-orange-500">.</span>
        </Link>

        {/* Center nav — desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || (to === '/dictionary' && location.pathname === '/');
            return (
              <Link
                key={to}
                to={to}
                className={cn('nav-link', active && 'active')}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="hidden xl:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: profile + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft border border-cream-400 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5"
          >
            <User className="h-[18px] w-[18px] text-navy/60" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft border border-cream-400"
          >
            {mobileOpen ? <X className="h-5 w-5 text-navy" /> : <Menu className="h-5 w-5 text-navy" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-cream-400/60 bg-white/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={cn('nav-link', active && 'active')}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {label}
                  </Link>
                );
              })}
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="nav-link sm:hidden"
              >
                <User className="h-[18px] w-[18px]" />
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
