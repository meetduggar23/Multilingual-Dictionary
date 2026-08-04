import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookMarked,
  Eye,
  EyeOff,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { api } from '@/services/apiClient';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const benefits = [
  'Sync favorites',
  'Daily word reminders',
  'AI chat history',
  'Quiz progress',
  'Vocabulary statistics',
  'Personalized recommendations',
];

const features = [
  { icon: Star, label: 'Save Favorites' },
  { icon: Flame, label: 'Daily Streaks' },
  { icon: GraduationCap, label: 'Vocabulary Progress' },
  { icon: Globe, label: 'Learn 100+ Languages' },
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

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.post<{ token: string; user: any }>('/auth/login', { email, password });
      localStorage.setItem('dict:token', token);
      localStorage.setItem('dict:user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/');
    } catch (err: any) {
      toast.error(err?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate]);

  const socialButtons = [
    { label: 'Google', icon: 'G', gradient: 'from-blue-500 via-green-500 to-yellow-500' },
    { label: 'GitHub', icon: 'GH', gradient: 'from-gray-700 to-gray-900' },
    { label: 'Microsoft', icon: 'M', gradient: 'from-red-500 to-orange-500' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF7F2]">
      {/* Background */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-orange-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-amber-100/60 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-orange-50 blur-3xl" />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          className="pointer-events-none absolute rounded-full bg-orange-300/50"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}

      <main className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col lg:flex-row">
        {/* LEFT — Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col justify-center lg:w-[45%] px-6 sm:px-12 py-14 lg:py-20"
        >
          {/* Illustration */}
          <div className="relative mx-auto mb-10 flex h-[280px] w-full max-w-[440px] items-center justify-center">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-orange-100 via-cream-100 to-white shadow-card" />
            <div className="absolute inset-6 rounded-[32px] border-2 border-dashed border-orange-200" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-36 w-36 items-center justify-center rounded-[28px] bg-gradient-to-br from-orange-500 to-amber-500 shadow-glow-orange"
            >
              <BookMarked className="h-16 w-16 text-white" strokeWidth={1.6} />
              <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-card">
                <Sparkles className="h-5 w-5 text-orange-500" />
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute left-2 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card"
            >
              <Heart className="h-4 w-4 text-rose-500" />
              <span className="text-[13px] font-semibold text-navy">Saved</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              className="absolute right-2 top-16 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card"
            >
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-[13px] font-semibold text-navy">18 day streak</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="absolute bottom-6 right-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-[13px] font-semibold text-navy">AI Verified</span>
            </motion.div>

            {['word', 'learn', 'AI', 'lexicon', 'fluent'].map((w, i) => (
              <motion.span
                key={w}
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                className="absolute text-[13px] font-bold text-orange-400/70"
                style={{
                  top: `${[22, 38, 60, 76, 30][i]}%`,
                  left: `${[68, 8, 72, 14, 46][i]}%`,
                }}
              >
                {w}
              </motion.span>
            ))}
          </div>

          {/* Left content */}
          <div className="max-w-md">
            <h1 className="font-display text-[40px] font-extrabold tracking-tight text-navy leading-[1.1]">
              Learn Smarter with <span className="text-orange-500">AI</span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-navy/55">
              Save your favorite words, track your learning progress, build daily streaks, and
              unlock personalized vocabulary recommendations powered by AI.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-2xl border border-cream-400 bg-white px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-semibold text-navy">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Auth Card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col items-center justify-center lg:w-[55%] px-6 sm:px-12 py-14 lg:py-20"
        >
          <div className="w-full max-w-[460px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
              className="rounded-[28px] border border-cream-400 bg-white p-8 sm:p-10 shadow-elevated"
            >
              <div className="text-center mb-8">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-glow-orange">
                  <GraduationCap className="h-9 w-9 text-white" />
                </div>
                <h1 className="font-display text-[30px] font-extrabold text-navy">Welcome Back</h1>
                <p className="text-navy/45 text-[14px] mt-1.5">
                  Sign in to continue your learning journey.
                </p>
              </div>

              {/* Social login */}
              <div className="space-y-3">
                {socialButtons.map(({ label, icon, gradient }) => (
                  <button
                    key={label}
                    type="button"
                    className="group flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-cream-400 bg-white text-[14px] font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-[12px] font-extrabold text-white`}
                    >
                      {icon}
                    </span>
                    Continue with {label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-cream-400" />
                <span className="text-[12px] font-semibold uppercase tracking-wider text-navy/35">or</span>
                <span className="h-px flex-1 bg-cream-400" />
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-navy">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="input-premium pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-navy">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy/30" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input-premium pl-11 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2.5 select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-cream-400 accent-orange-500"
                    />
                    <span className="text-[13px] font-medium text-navy/60">Remember me</span>
                  </label>
                  <button type="button" className="text-[13px] font-semibold text-orange-500 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'group flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB8C00] text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200',
                    'hover:scale-[1.02] hover:from-[#EA670C] hover:to-[#F97316] hover:shadow-xl hover:shadow-orange-500/40',
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

              <p className="mt-7 text-center text-[14px] text-navy/45">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-orange-500 hover:underline">
                  Create Account
                </Link>
              </p>
            </motion.div>

            {/* Benefits panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="mt-6 rounded-[24px] border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-glow-orange">
                  <Flame className="h-4 w-4" />
                </span>
                <h3 className="font-display text-[16px] font-bold text-navy">Your Learning Benefits</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-[13px] font-medium text-navy/60">
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {b}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
