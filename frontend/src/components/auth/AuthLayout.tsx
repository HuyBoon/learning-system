'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] relative">
        {/* Background Decorative Elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          {/* Top Branding Section */}
          <div className="px-8 pt-10 pb-6 text-center">
            <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 mb-6 group transition-all duration-300 hover:scale-110">
              <ShieldCheck className="w-8 h-8" />
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 font-medium">
              {subtitle}
            </p>
          </div>

          {/* Form Content Area */}
          <div className="px-10 pb-10">
            {children}
          </div>

          {/* Footer Decoration */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Bottom Trust Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Platform</span>
          </div>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest">HuyBoon Certified</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
