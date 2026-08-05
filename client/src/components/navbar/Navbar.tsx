import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Brain,
  ChevronDown,
  Clock,
  Gamepad2,
  Heart,
  Home,
  Layers,
  Languages,
  LayoutDashboard,
  ListChecks,
  Menu,
  Mic,
  Search,
  Sparkles,
  SpellCheck,
  User,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface MenuItem {
  label: string;
  to: string;
  icon?: typeof Home;
  desc?: string;
}

interface NavItem {
  label: string;
  icon: typeof Home;
  type: 'link' | 'scroll' | 'dropdown' | 'route';
  target?: string;
  to?: string;
  items?: MenuItem[];
  iconOnly?: boolean;
}

const aiTools: MenuItem[] = [
  { label: 'AI Dictionary', to: '/dictionary', icon: BookOpen, desc: 'Instant definitions with AI' },
  { label: 'AI Translator', to: '/translator', icon: Languages, desc: 'Translate 100+ languages' },
  { label: 'AI Assistant', to: '/ai-assistant', icon: Brain, desc: 'Ask anything about words' },
  { label: 'Grammar Checker', to: '/ai-assistant', icon: SpellCheck, desc: 'Perfect your writing' },
  { label: 'Synonyms', to: '/dictionary', icon: Layers, desc: 'Find better words' },
  { label: 'Antonyms', to: '/dictionary', icon: Zap, desc: 'Discover opposites' },
  { label: 'Pronunciation', to: '/dictionary', icon: Volume2, desc: 'Master every accent' },
];

const learn: MenuItem[] = [
  { label: 'Daily Word', to: '/daily-word', icon: Sparkles, desc: 'A new word every day' },
  { label: 'Quiz', to: '/quiz', icon: ListChecks, desc: 'Test your knowledge' },
  { label: 'Flashcards', to: '/dictionary', icon: LayoutDashboard, desc: 'Learn with cards' },
  { label: 'Word Games', to: '/quiz', icon: Gamepad2, desc: 'Play while you learn' },
  { label: 'Vocabulary Builder', to: '/dictionary', icon: Layers, desc: 'Grow word by word' },
];

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, type: 'scroll', target: 'home', iconOnly: true },
  { label: 'Dictionary', icon: Search, type: 'scroll', target: 'ai-dictionary' },
  { label: 'AI Tools', icon: Sparkles, type: 'dropdown', items: aiTools },
  { label: 'Learn', icon: Brain, type: 'dropdown', items: learn },
  { label: 'Favorites', icon: Heart, type: 'route', to: '/favorites' },
  { label: 'History', icon: Clock, type: 'route', to: '/history' },
];

const scrollTargets = ['home', 'ai-dictionary'];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const dropdownTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      for (const id of scrollTargets) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimer.current) window.clearTimeout(dropdownTimer.current);
    };
  }, []);

  const scrollToSection = useCallback(
    (target: string) => {
      const scroll = () => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      if (isHome) {
        scroll();
      } else {
        navigate('/');
        setTimeout(scroll, 150);
      }
    },
    [isHome, navigate],
  );

  const handleNav = useCallback(
    (item: NavItem) => {
      if (item.type === 'route' && item.to) navigate(item.to);
      else if (item.type === 'scroll' && item.target) scrollToSection(item.target);
      setMobileOpen(false);
    },
    [navigate, scrollToSection],
  );

  const handleDropdownItem = useCallback(
    (to: string, label: string) => {
      setOpenDropdown(null);
      setMobileOpen(false);
      if (label === 'AI Dictionary') {
        scrollToSection('ai-dictionary');
      } else if (label === 'Flashcards') {
        scrollToSection('ai-dictionary');
      } else {
        navigate(to);
      }
    },
    [navigate, scrollToSection],
  );

  const isActive = useCallback(
    (item: NavItem) => {
      if (item.type === 'route') return location.pathname === item.to;
      if (item.type === 'scroll') return isHome && activeSection === item.target;
      return false;
    },
    [location.pathname, isHome, activeSection],
  );

  const isDropdownActive = useCallback(
    (items: MenuItem[]) => items.some((i) => location.pathname === i.to),
    [location.pathname],
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        window.scrollTo(0, 0);
      }
    },
    [isHome, navigate],
  );

  const enterDropdown = (label: string) => {
    if (dropdownTimer.current) window.clearTimeout(dropdownTimer.current);
    setOpenDropdown(label);
  };

  const leaveDropdown = () => {
    dropdownTimer.current = window.setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className="sticky top-0 z-50 bg-navbar/75 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-6 lg:px-12 xl:px-16">
        {/* Logo */}
        <Logo onClick={handleLogoClick} className="mr-4" />

        {/* Center nav — desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-[22px] xl:gap-8">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              const isOpen = openDropdown === item.label;
              const dropdownActive = item.type === 'dropdown' && isDropdownActive(item.items ?? []);

              if (item.type === 'dropdown') {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => enterDropdown(item.label)}
                    onMouseLeave={leaveDropdown}
                  >
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      className={cn(
                        'group relative flex items-center gap-1.5 py-2 text-[14px] font-medium transition-colors duration-200 cursor-pointer',
                        active || dropdownActive ? 'text-orange-500' : 'text-navy/70 hover:text-navy',
                      )}
                    >
                      <Icon className="h-[17px] w-[17px]" />
                      {item.label}
                      <ChevronDown
                        className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
                      />
                      <span
                        className={cn(
                          'absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-orange-500 transition-all duration-300',
                          isOpen ? 'w-full' : 'w-0 group-hover:w-full',
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute left-1/2 top-full pt-3 -translate-x-1/2"
                        >
                          <div className="w-[300px] rounded-2xl border border-border bg-card p-2.5 shadow-elevated">
                            {item.items?.map((sub) => {
                              const SubIcon = sub.icon ?? Home;
                              return (
                                <button
                                  key={sub.label}
                                  onClick={() => handleDropdownItem(sub.to, sub.label)}
                                  className="flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-all duration-150 hover:bg-orange-50"
                                >
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream-200 text-orange-500">
                                    <SubIcon className="h-4 w-4" />
                                  </span>
                                  <span>
                                    <span className="block text-[14px] font-semibold text-navy">
                                      {sub.label}
                                    </span>
                                    <span className="mt-0.5 block text-[12px] text-navy/45">
                                      {sub.desc}
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  title={item.label}
                  className={cn(
                    'group relative flex items-center gap-1.5 py-2 text-[14px] font-medium transition-colors duration-200 cursor-pointer rounded-full',
                    active ? 'text-orange-500' : 'text-navy/70 hover:text-navy',
                  )}
                >
                  <Icon className="h-[17px] w-[17px]" />
                  {!item.iconOnly && item.label}
                  <span
                    className={cn(
                      'absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-orange-500 transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Get Started + Theme + Profile */}
        <div className="flex items-center gap-3 lg:gap-4 ml-6 lg:ml-10">
          <button
            onClick={() => scrollToSection('ai-dictionary')}
            className="hidden md:inline-flex h-12 w-[150px] xl:w-[164px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.03] hover:from-orange-600 hover:to-orange-500 hover:shadow-xl hover:shadow-orange-500/40 cursor-pointer"
          >
            Get Started
          </button>

          <ThemeToggle />

          <Link
            to="/profile"
            aria-label="Profile"
            className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border shadow-soft transition-all duration-200 hover:shadow-card hover:-translate-y-0.5"
          >
            <User className="h-[19px] w-[19px] text-foreground/60" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-soft border border-border"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
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
            className="lg:hidden overflow-hidden border-t border-border bg-card/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-4 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                if (item.type === 'dropdown') {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-navy/70 hover:bg-cream-200"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-[18px] w-[18px]" />
                          {item.label}
                        </span>
                        <ChevronDown className={cn('h-4 w-4 transition-transform', openDropdown === item.label && 'rotate-180')} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-cream-300 pl-3">
                              {item.items?.map((sub) => (
                                <button
                                  key={sub.label}
                                  onClick={() => handleDropdownItem(sub.to, sub.label)}
                                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-navy/60 hover:bg-cream-200 hover:text-navy"
                                >
                                  {sub.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                      active ? 'text-orange-500 bg-orange-50' : 'text-navy/70 hover:bg-cream-200',
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </button>
                );
              })}
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-navy/70 hover:bg-cream-200"
              >
                <User className="h-[18px] w-[18px]" />
                Profile
              </Link>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToSection('ai-dictionary');
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
