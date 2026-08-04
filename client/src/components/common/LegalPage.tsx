import { motion } from 'framer-motion';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { cn } from '@/lib/utils';

interface LegalSection {
  title: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  updated: string;
  sections: LegalSection[];
  current: 'privacy' | 'terms';
}

export function LegalPage({ title, subtitle, icon: Icon, updated, sections, current }: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-12 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Back to home */}
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold text-navy/50 transition-colors hover:text-orange-500"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          {/* Privacy / Terms switcher */}
          <div className="mb-8 inline-flex rounded-full border border-cream-400 bg-white p-1 shadow-soft">
            <Link
              to="/privacy"
              className={cn(
                'rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-200',
                current === 'privacy'
                  ? 'bg-gradient-to-r from-[#F97316] to-[#FB8C00] text-white shadow-lg shadow-orange-500/25'
                  : 'text-navy/55 hover:text-navy',
              )}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={cn(
                'rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-200',
                current === 'terms'
                  ? 'bg-gradient-to-r from-[#F97316] to-[#FB8C00] text-white shadow-lg shadow-orange-500/25'
                  : 'text-navy/55 hover:text-navy',
              )}
            >
              Terms of Service
            </Link>
          </div>

          {/* Hero */}
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
              <Icon className="h-7 w-7 text-orange-500" />
            </div>
            <h1 className="font-display text-[36px] font-extrabold text-navy">{title}</h1>
            <p className="mt-2 text-navy/50">{subtitle}</p>
            <p className="mt-4 inline-block rounded-full border border-cream-400 bg-white px-4 py-1.5 text-xs font-medium text-navy/40 shadow-soft">
              Last updated: {updated}
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="card-premium p-8"
            >
              <h2 className="mb-4 flex items-center gap-3 font-display text-[20px] font-bold text-navy">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-[12px] font-extrabold text-white shadow-glow-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-navy/55">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
