'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, Eye, EyeOff, GraduationCap, Laptop } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import AuthLayout from '@/components/auth/AuthLayout';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('STUDENT');
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
    const result = await dispatch(registerUser({ email, password, name, role }));
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created successfully! Please login.');
      router.push('/login');
    } else {
      toast.error(result.payload as string || 'Registration failed');
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join LMSCore and start your journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors duration-300">
              <UserIcon className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-300 font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
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
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-300 font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors duration-300">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-300 font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
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

        <div className="pb-2">
          <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`p-4 rounded-2xl font-bold flex flex-col items-center justify-center space-y-2 transition-all duration-300 border-2 ${
                role === 'STUDENT' 
                  ? 'bg-indigo-50/50 dark:bg-indigo-500/10 border-indigo-600 text-indigo-700 dark:text-indigo-400 shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className={`h-6 w-6 ${role === 'STUDENT' ? 'text-indigo-600 animate-bounce' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="text-sm">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('INSTRUCTOR')}
              className={`p-4 rounded-2xl font-bold flex flex-col items-center justify-center space-y-2 transition-all duration-300 border-2 ${
                role === 'INSTRUCTOR' 
                  ? 'bg-indigo-50/50 dark:bg-indigo-500/10 border-indigo-600 text-indigo-700 dark:text-indigo-400 shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Laptop className={`h-6 w-6 ${role === 'INSTRUCTOR' ? 'text-indigo-600 animate-pulse' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="text-sm">Instructor</span>
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
                <span className="text-lg">Create Account</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-600 dark:text-slate-400 font-medium">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-all relative group">
          <span>Sign In</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>
    </AuthLayout>
  );
}
