import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Heart, Clock, GraduationCap, LogOut, Settings } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useFavorites, useHistory, useAnalytics } from '@/hooks/useDictionary';

export default function ProfilePage() {
  const user = (() => { try { return JSON.parse(localStorage.getItem('dict:user') ?? 'null'); } catch { return null; } })();
  const token = localStorage.getItem('dict:token');
  const { favorites, fetchAll: fetchFavs } = useFavorites();
  const { history, fetchAll: fetchHistory } = useHistory();
  const { summary, fetch: fetchAnalytics } = useAnalytics();

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
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <User className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">Profile</h1>
        </motion.div>

        {!token ? (
          <div className="card-premium p-10 text-center">
            <p className="text-navy/50 mb-6">Sign in to track your progress and save favorites.</p>
            <Link to="/login" className="btn-gradient h-11 px-8 inline-flex items-center">
              Sign In
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="card-premium p-6 flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <User className="h-7 w-7 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy text-[18px] truncate">{user?.name ?? 'User'}</p>
                <p className="text-sm text-navy/40 truncate">{user?.email ?? ''}</p>
              </div>
              <button onClick={handleLogout} className="h-10 px-4 rounded-xl text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-all">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Heart, label: 'Favorites', value: favorites.length ?? summary?.favoriteCount ?? 0, to: '/favorites' },
                { icon: Clock, label: 'Searches', value: summary?.totalSearches ?? history.length ?? 0, to: '/history' },
                { icon: GraduationCap, label: 'Streak', value: `${summary?.streak ?? 0} days`, to: '/quiz' },
              ].map(({ icon: Icon, label, value, to }) => (
                <Link key={label} to={to} className="card-elevated p-5 text-center">
                  <Icon className="h-5 w-5 text-orange-500 mx-auto mb-2" />
                  <p className="text-[22px] font-extrabold text-navy">{value}</p>
                  <p className="text-xs text-navy/40 mt-1">{label}</p>
                </Link>
              ))}
            </div>

            <div className="card-premium p-6">
              <h3 className="font-semibold text-navy mb-4">Top Words Searched</h3>
              {summary?.topWords?.length > 0 ? (
                <div className="space-y-2">
                  {summary.topWords.slice(0, 5).map(({ word, count }: any) => (
                    <div key={word} className="flex items-center justify-between py-2 border-b border-cream-300 last:border-0">
                      <span className="text-[15px] text-navy font-medium">{word}</span>
                      <span className="text-xs text-navy/40">{count} searches</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-navy/40">No data yet. Start searching!</p>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
