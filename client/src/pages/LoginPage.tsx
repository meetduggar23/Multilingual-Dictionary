import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { api } from '@/services/apiClient';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium w-full max-w-md p-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-orange-50 mb-4">
              <LogIn className="h-6 w-6 text-orange-500" />
            </div>
            <h1 className="font-display text-[28px] font-extrabold text-navy">Welcome Back</h1>
            <p className="text-navy/45 text-sm mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-premium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="input-premium"
              />
            </div>
            <div>
              <label className="label-premium mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-premium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full h-12 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-navy/40 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 font-medium hover:underline">Sign up</Link>
          </p>

          <div className="mt-4 pt-4 border-t border-cream-300 text-center">
            <p className="text-xs text-navy/30">Demo: demo@dictionary.ai / password123</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
