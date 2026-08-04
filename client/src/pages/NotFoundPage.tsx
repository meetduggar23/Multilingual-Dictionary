import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-[120px] font-extrabold text-cream-400 leading-none">404</div>
          <h1 className="font-display text-[28px] font-extrabold text-navy -mt-4 mb-3">Page Not Found</h1>
          <p className="text-navy/45 text-[15px] mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn-gradient h-11 px-7 inline-flex items-center gap-2">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
