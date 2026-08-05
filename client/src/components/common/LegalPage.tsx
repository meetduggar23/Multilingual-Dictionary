import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, LifeBuoy, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LegalSection {
  title: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  updated: string;
  sections: LegalSection[];
  current: 'privacy' | 'terms';
}

export function LegalPage({ title, description, icon: Icon, updated, sections, current }: LegalPageProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const other = current === 'privacy'
    ? { label: 'Terms of Service', to: '/terms-of-service' }
    : { label: 'Privacy Policy', to: '/privacy-policy' };

  return (
    <div className="min-h-screen bg-background">
      {/* Soft background accents */}
      <div className="pointer-events-none fixed -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[var(--blob-soft)] blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[var(--blob-amber)] blur-3xl" />

      {/* Sticky legal navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/85 backdrop-blur-xl">
        {/* Reading progress indicator */}
        <div className="h-1 w-full bg-cream-200">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mx-auto flex h-16 w-full max-w-[900px] items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-navy/60 transition-colors duration-200 hover:text-orange-500"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <span className="flex items-center gap-2 text-[15px] font-bold text-navy">
            <Icon className="h-4 w-4 text-orange-500" />
            <span className="hidden sm:inline">{title}</span>
            <span className="sm:hidden">Home</span>
          </span>

          <Link
            to={other.to}
            className="group flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-orange-500 transition-colors duration-200 hover:text-orange-600"
          >
            <span className="hidden md:inline">{other.label}</span>
            <span className="md:hidden">Next</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-[900px] px-5 pb-16 pt-12 sm:px-8">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-glow-orange">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-[40px] font-extrabold tracking-tight text-navy sm:text-[44px]">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-navy/50">
            {description}
          </p>
          <p className="mt-5 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-[13px] font-semibold text-orange-600">
            Last Updated: {updated}
          </p>
        </motion.div>

        {/* Reading card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[32px] border border-border bg-card p-8 shadow-elevated sm:p-12"
        >
          <div className="space-y-12">
            {sections.map((section, i) => (
              <section key={section.title} className="scroll-mt-28">
                <h2 className="flex items-center gap-4 font-display text-[24px] font-bold tracking-tight text-navy sm:text-[26px]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[13px] font-extrabold text-orange-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-6 max-w-[720px] space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-[16px] leading-[1.9] text-navy/60">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </motion.div>

        {/* Legal footer */}
        <footer className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-center">
          <p className="text-[14px] font-medium text-foreground/40">Last Updated: {updated}</p>
          <a
            href="mailto:support@dictionary.ai"
            className={cn(
              'group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3',
              'text-[14px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200',
              'hover:scale-[1.03] hover:from-orange-600 hover:to-orange-500 hover:shadow-xl hover:shadow-orange-500/40',
            )}
          >
            <LifeBuoy className="h-4 w-4" />
            Need help? Contact Support
          </a>
        </footer>
      </main>
    </div>
  );
}
