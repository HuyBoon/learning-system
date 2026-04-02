'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import AuthLayout from '@/components/auth/AuthLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, router, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      toast.success('Welcome back!');
    } else {
      toast.error(result.payload as string || 'Login failed');
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors duration-300">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-300 font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Forgot?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors duration-300">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-300 font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.01, translateY: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-[0_12px_24px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_20px_32px_-12px_rgba(79,70,229,0.5)] active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span className="text-lg">Sign In</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </div>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          New to LMSCore?{' '}
          <Link 
            href="/register" 
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-all relative group"
          >
            <span>Create account</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
