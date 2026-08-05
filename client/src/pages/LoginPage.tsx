import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookMarked,
  Eye,
  EyeOff,
  Flame,
  Globe,
  Heart,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { api } from '@/services/apiClient';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function GithubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MicrosoftLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 23 23" className={className} aria-hidden="true">
      <path fill="#F35325" d="M1 1h10v10H1z" />
      <path fill="#81BC06" d="M12 1h10v10H12z" />
      <path fill="#05A6F0" d="M1 12h10v10H1z" />
      <path fill="#FFBA08" d="M12 12h10v10H12z" />
    </svg>
  );
}

const socials = [
  { label: 'Google', Icon: GoogleLogo },
  { label: 'GitHub', Icon: GithubLogo },
  { label: 'Microsoft', Icon: MicrosoftLogo },
];

const floatingWords = [
  { word: 'Serendipity', pos: 'top-[10%] left-[8%]', delay: 0 },
  { word: 'AI', pos: 'top-[30%] right-[12%]', delay: 0.8 },
  { word: 'lexicon', pos: 'bottom-[22%] left-[10%]', delay: 1.6 },
  { word: 'fluent', pos: 'bottom-[12%] right-[8%]', delay: 0.4 },
  { word: 'learn', pos: 'top-[52%] right-[38%]', delay: 2.2 },
];

const particles = [
  { top: '18%', left: '12%', size: 6, delay: 0 },
  { top: '32%', left: '80%', size: 4, delay: 0.6 },
  { top: '55%', left: '8%', size: 5, delay: 1.2 },
  { top: '70%', left: '85%', size: 7, delay: 0.3 },
  { top: '85%', left: '20%', size: 4, delay: 1.8 },
  { top: '12%', left: '55%', size: 5, delay: 2.1 },
  { top: '65%', left: '48%', size: 3, delay: 1.4 },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.post<{ token: string; user: any }>('/auth/login', { email, password });
      const store = remember ? localStorage : sessionStorage;
      store.setItem('dict:token', token);
      store.setItem('dict:user', JSON.stringify(user));
      if (!remember) {
        localStorage.removeItem('dict:token');
        localStorage.removeItem('dict:user');
      }
      toast.success(`Welcome back, ${user.name}!`);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from !== '/login' ? from : '/');
    } catch (err: any) {
      toast.error(err?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [email, password, remember, navigate, location.state]);

  const handleSocial = useCallback((label: string) => {
    toast.info(`${label} sign-in isn't configured yet. Use email instead.`);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background lg:h-screen lg:overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[var(--blob-soft)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-[var(--blob-amber)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-[var(--blob-mid)] blur-3xl" />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          className="pointer-events-none absolute rounded-full bg-orange-300/50"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}

      <Navbar />

      <main className="flex min-h-0 flex-1">
        <div className="mx-auto flex min-h-0 w-full max-w-[1400px]">
          {/* LEFT — 55% Illustration */}
          <section className="hidden min-h-0 flex-1 items-center justify-center px-6 lg:flex lg:px-10 xl:px-14">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative h-[520px] w-full max-w-[560px]"
            >
              {/* Backdrop */}
              <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-[var(--blob-soft)] via-cream-100 to-card shadow-elevated" />
              <div className="absolute inset-5 rounded-[40px] border-2 border-dashed border-orange-200/80" />

              {/* Glow blobs */}
              <div className="pointer-events-none absolute left-8 top-10 h-40 w-40 rounded-full bg-orange-300/30 blur-2xl" />
              <div className="pointer-events-none absolute bottom-12 right-8 h-48 w-48 rounded-full bg-amber-200/40 blur-2xl" />

              {/* Central book */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[36px] bg-gradient-to-br from-orange-500 to-amber-500 shadow-glow-orange"
              >
                <BookMarked className="h-20 w-20 text-white" strokeWidth={1.5} />
                <span className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-card">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                </span>
                <span className="absolute -bottom-3 -left-3 flex items-center gap-1.5 rounded-2xl bg-card px-3.5 py-2 shadow-card">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-[12px] font-bold text-navy">AI Powered</span>
                </span>
              </motion.div>

              {/* Floating word chips */}
              {floatingWords.map(({ word, pos, delay }, i) => (
                <motion.span
                  key={word}
                  animate={{ y: [0, -10, 0], opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay, ease: 'easeInOut' }}
                  className={cn(
                    'absolute rounded-2xl bg-card/95 px-4 py-2.5 text-[15px] font-bold text-navy shadow-card backdrop-blur',
                    pos,
                  )}
                >
                  <span className="text-orange-500">#</span> {word}
                </motion.span>
              ))}

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute left-[6%] top-[40%] flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50">
                  <Heart className="h-4 w-4 text-rose-500" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy">Favorites</p>
                  <p className="text-[11px] text-navy/40">48 words saved</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                className="absolute right-[6%] top-[26%] flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
                  <Flame className="h-4 w-4 text-orange-500" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy">Streak</p>
                  <p className="text-[11px] text-navy/40">18 days</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute bottom-[14%] right-[10%] flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy">AI Verified</p>
                  <p className="text-[11px] text-navy/40">Def &amp; examples</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="absolute bottom-[20%] left-[8%] flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50">
                  <Globe className="h-4 w-4 text-sky-500" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy">100+ Languages</p>
                  <p className="text-[11px] text-navy/40">Global vocabulary</p>
                </div>
              </motion.div>

              {/* Star rating chip */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                className="absolute right-[24%] bottom-[38%] flex items-center gap-1 rounded-full bg-card px-3 py-1.5 shadow-card"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-[11px] font-bold text-navy/60">4.9</span>
              </motion.div>

              {/* Bottom caption */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                <p className="text-[13px] font-semibold text-navy/40">
                  Learn a language, one word at a time.
                </p>
              </div>
            </motion.div>
          </section>

          {/* RIGHT — 45% Login Card */}
          <section className="flex min-h-0 w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-[45%] lg:px-8 lg:py-10 xl:px-12">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="w-full max-w-[460px] max-h-[760px] rounded-[28px] border border-cream-400 bg-card p-8 shadow-elevated"
            >
              <div className="text-center">
                <h1 className="font-display text-[48px] font-extrabold tracking-tight text-navy leading-[1.05]">
                  Welcome Back<span className="text-orange-500">.</span>
                </h1>
                <p className="mt-2 text-[16px] text-navy/45">
                  Continue your AI vocabulary journey.
                </p>
              </div>

              {/* Social login */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {socials.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`Continue with ${label}`}
                    title={`Continue with ${label}`}
                    onClick={() => handleSocial(label)}
                    className="group flex h-[52px] items-center justify-center rounded-2xl border border-cream-400 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-cream-500 hover:shadow-card"
                  >
                    <Icon className="h-[22px] w-[22px]" />
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-4">
                <span className="h-px flex-1 bg-cream-400" />
                <span className="text-[12px] font-semibold uppercase tracking-wider text-navy/35">
                  or sign in with email
                </span>
                <span className="h-px flex-1 bg-cream-400" />
              </div>

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[14px] font-semibold text-navy">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="h-[52px] w-full rounded-2xl border border-cream-400 bg-card pl-11 pr-4 text-sm text-navy placeholder:text-cream-500 shadow-soft transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mt-4">
                  <label className="mb-1.5 block text-[14px] font-semibold text-navy">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy/30" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-[52px] w-full rounded-2xl border border-cream-400 bg-card pl-11 pr-12 text-sm text-navy placeholder:text-cream-500 shadow-soft transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 transition-colors hover:text-navy/60"
                      aria-label="Toggle password visibility"
                    >
                      {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                    </button>
                  </div>
                </div>

                {/* Remember / Forgot */}
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2.5 select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-cream-400 accent-orange-500"
                    />
                    <span className="text-[14px] font-medium text-navy/60">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info('Password reset is not available yet.')}
                    className="text-[14px] font-semibold text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Continue */}
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'group mt-5 flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200',
                    'hover:scale-[1.02] hover:from-orange-600 hover:to-orange-500 hover:shadow-xl hover:shadow-orange-500/40',
                    'disabled:opacity-50 disabled:hover:scale-100',
                  )}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-[14px] text-navy/45">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-orange-500 hover:underline">
                  Create one
                </Link>
              </p>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
