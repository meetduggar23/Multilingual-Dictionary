import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';

const exploreLinks = [
  { label: 'AI Dictionary', to: '/dictionary' },
  { label: 'Daily Word', to: '/daily-word' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Translator', to: '/translator' },
  { label: 'AI Assistant', to: '/ai-assistant' },
];

const learnLinks = [
  { label: 'Favorites', to: '/favorites' },
  { label: 'History', to: '/history' },
  { label: 'Profile', to: '/profile' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const socials = [
  { label: 'GitHub', Icon: Github },
  { label: 'Twitter', Icon: Twitter },
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
];

function FooterLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      className="text-[14px] text-navy/45 transition-colors duration-200 hover:text-orange-500"
    >
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-cream-400/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12 xl:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-0.5">
              <span className="font-display text-[28px] font-extrabold tracking-tight text-navy">D</span>
              <span className="text-[28px] font-extrabold text-orange-500">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-navy/45">
              The AI-powered multilingual dictionary that helps you learn 100+ languages, one word
              at a time.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-cream-400 bg-white text-navy/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 hover:shadow-card"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-display text-[15px] font-bold text-navy">Explore</h3>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink label={l.label} to={l.to} />
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="mb-4 font-display text-[15px] font-bold text-navy">Learn</h3>
            <ul className="flex flex-col gap-3">
              {learnLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink label={l.label} to={l.to} />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-display text-[15px] font-bold text-navy">Legal</h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink label={l.label} to={l.to} />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-navy/35">
              Questions? Reach us at{' '}
              <a href="mailto:support@dictionary.ai" className="text-orange-500 hover:underline">
                support@dictionary.ai
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream-400/50 pt-6 sm:flex-row">
          <p className="text-xs text-navy/30">© 2022 D. Dictionary AI. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-xs text-navy/40 transition-colors hover:text-orange-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-navy/40 transition-colors hover:text-orange-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
