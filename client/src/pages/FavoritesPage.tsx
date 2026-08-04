import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useFavorites } from '@/hooks/useDictionary';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function FavoritesPage() {
  const { favorites, loading, fetchAll, remove } = useFavorites();
  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <Heart className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">Favorites</h1>
          <p className="text-navy/50 mt-2">Your saved words</p>
        </motion.div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="card-premium h-20 shimmer-loading" />)}
          </div>
        ) : favorites.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Heart className="h-10 w-10 text-cream-400 mx-auto mb-4" />
            <p className="text-navy/40 text-[15px]">No favorites yet. Search for a word and tap the heart icon to save it.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav, i) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-premium p-5 flex items-center justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy text-[16px] truncate">{fav.word}</p>
                  <p className="text-xs text-navy/35 mt-0.5">{formatDate(fav.createdAt)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    to={`/dictionary?q=${fav.word}`}
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-cream-200 text-navy/40 hover:bg-orange-50 hover:text-orange-500 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => { remove(fav.id); toast.success('Removed'); }}
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-cream-200 text-navy/40 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
