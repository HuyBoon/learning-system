'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';

interface LearningLayoutProps {
  children: ReactNode;
}

export default function LearningLayout({ children }: LearningLayoutProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30">
      {/* Distraction-free Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <Link href="/courses" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group">
            <div className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-bold tracking-tight">Catalog</span>
          </Link>
          <div className="h-4 w-px bg-slate-700"></div>
          <Link href="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-black tracking-tighter uppercase">LMS<span className="text-indigo-500">Core</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
           {/* Progress Indicator (could be dynamic) */}
           <div className="hidden md:flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50">
              <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    className="h-full bg-indigo-500"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">45% Complete</span>
           </div>

           <div className="h-8 w-px bg-slate-800 hidden md:block"></div>

           {/* User context */}
           <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                 <div className="text-xs font-bold text-white uppercase tracking-wider">{user?.name || 'Student'}</div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Premium Member</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20">
                {user?.name?.charAt(0) || 'S'}
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
