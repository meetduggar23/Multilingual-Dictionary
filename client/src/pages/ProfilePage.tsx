import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookMarked,
  Clock,
  Flame,
  GraduationCap,
  Heart,
  LogOut,
  Search,
  Sparkles,
  User,
} from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useFavorites, useHistory, useAnalytics } from '@/hooks/useDictionary';

export default function ProfilePage() {
  const user = (() => { try { return JSON.parse(localStorage.getItem('dict:user') ?? sessionStorage.getItem('dict:user') ?? 'null'); } catch { return null; } })();
  const token = localStorage.getItem('dict:token') ?? sessionStorage.getItem('dict:token');
  const { favorites, fetchAll: fetchFavs } = useFavorites();
  const { history, fetchAll: fetchHistory } = useHistory();
  const { summary, fetch: fetchAnalytics } = useAnalytics();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchFavs();
      fetchHistory();
      fetchAnalytics();
    }
  }, [token, fetchFavs, fetchHistory, fetchAnalytics]);

  const handleLogout = () => {
    localStorage.removeItem('dict:token');
    localStorage.removeItem('dict:user');
    sessionStorage.removeItem('dict:token');
    sessionStorage.removeItem('dict:user');
    navigate('/');
  };

  const initials = (user?.name ?? 'U')
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 pt-12 pb-16">
        {!token ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-glow-orange">
              <User className="h-9 w-9 text-white" />
            </div>
            <h1 className="font-display text-[28px] font-extrabold text-navy">Sign in to see your profile</h1>
            <p className="text-navy/50 mt-2 mb-8">Track your progress and save favorites.</p>
            <Link to="/login" className="btn-gradient h-12 px-10 inline-flex items-center gap-2 rounded-full">
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Header card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium relative overflow-hidden p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--blob-mid)] blur-2xl" />
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-[24px] font-extrabold text-white shadow-glow-orange">
                  {initials}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="font-display text-[26px] font-extrabold text-navy">{user?.name ?? 'User'}</h1>
                  <p className="text-[14px] text-navy/45">{user?.email ?? ''}</p>
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-[12px] font-semibold text-orange-600">
                      <Flame className="h-3 w-3" /> {summary?.streak ?? 0} day streak
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-600">
                      <Sparkles className="h-3 w-3" /> AI Learner
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="h-11 px-5 rounded-full text-[13px] font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-all"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Heart, label: 'Favorites', value: favorites.length ?? summary?.favoriteCount ?? 0, to: '/favorites', color: 'bg-rose-50 text-rose-500' },
                { icon: Search, label: 'Searches', value: summary?.totalSearches ?? history.length ?? 0, to: '/history', color: 'bg-sky-50 text-sky-500' },
                { icon: Flame, label: 'Streak', value: `${summary?.streak ?? 0} days`, to: '/quiz', color: 'bg-orange-50 text-orange-500' },
              ].map(({ icon: Icon, label, value, to, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link to={to} className="card-elevated p-5 sm:p-6 text-center">
                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[22px] font-extrabold text-navy">{value}</p>
                    <p className="text-xs text-navy/40 mt-1">{label}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Top words */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-premium p-7"
            >
              <div className="mb-5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <BookMarked className="h-4 w-4" />
                </span>
                <h3 className="font-display text-[17px] font-bold text-navy">Top Words Searched</h3>
              </div>
              {summary?.topWords?.length > 0 ? (
                <div className="space-y-2">
                  {summary.topWords.slice(0, 5).map(({ word, count }: any, i: number) => (
                    <div key={word} className="flex items-center justify-between py-2.5 border-b border-cream-300 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cream-200 text-[11px] font-bold text-navy/50">
                          {i + 1}
                        </span>
                        <span className="text-[15px] text-navy font-medium">{word}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-navy/40">
                        <Clock className="h-3 w-3" /> {count} searches
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-navy/40">No data yet. Start searching!</p>
              )}
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: GraduationCap, label: 'Quiz', to: '/quiz' },
                { icon: Heart, label: 'Favorites', to: '/favorites' },
                { icon: Clock, label: 'History', to: '/history' },
                { icon: Sparkles, label: 'AI Assistant', to: '/ai-assistant' },
              ].map(({ icon: Icon, label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-[13px] font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                >
                  <Icon className="h-4 w-4 text-orange-500" />
                  {label}
                </Link>
              ))}
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
