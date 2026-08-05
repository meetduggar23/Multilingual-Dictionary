import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Trash2, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useHistory } from '@/hooks/useDictionary';
import { formatRelative } from '@/lib/utils';
import { toast } from 'sonner';

export default function HistoryPage() {
  const { history, loading, fetchAll, clear } = useHistory();
  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <Clock className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">History</h1>
          <p className="text-navy/50 mt-2">Your recent searches</p>
        </motion.div>

        {history.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => { clear(); toast.success('History cleared'); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="card-premium h-16 shimmer-loading" />)}
          </div>
        ) : history.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-navy/40 text-[15px]">No search history yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="card-premium px-5 py-3.5 flex items-center justify-between gap-3"
              >
                <Link
                  to={`/dictionary?q=${h.word}`}
                  className="flex-1 flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity"
                >
                  <span className="font-medium text-navy text-[15px] truncate">{h.word}</span>
                  <span className="text-xs text-navy/30 shrink-0">{h.language?.toUpperCase()}</span>
                </Link>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-navy/30">{formatRelative(h.searchedAt)}</span>
                  <Link
                    to={`/dictionary?q=${h.word}`}
                    className="h-8 w-8 flex items-center justify-center rounded-lg text-navy/30 hover:text-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
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
