'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { LogOut, User as UserIcon, BookOpen, Menu, X, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { RootState } from '@/store';

export default function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto relative w-full max-w-6xl transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'glass rounded-full shadow-[0_20px_50px_rgba(59,130,246,0.15)] py-2' 
            : 'bg-white/50 backdrop-blur-md rounded-3xl py-4 border border-slate-200/50 shadow-sm'
        }`}
      >
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-blue-600 p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-black tracking-tight leading-none ${scrolled ? 'text-white' : 'text-slate-950'}`}>
                    HUYBOON <span className="text-blue-500">ACADEMY</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Future of Learning</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/courses" 
                className={`font-bold transition-all hover:text-blue-500 ${scrolled ? 'text-slate-300' : 'text-slate-600'}`}
              >
                Catalog
              </Link>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-6">
                  {user?.role === 'STUDENT' && (
                    <Link href="/my-learning" className={`font-bold transition-all hover:text-blue-500 ${scrolled ? 'text-slate-300' : 'text-slate-600'}`}>
                      Dashboard
                    </Link>
                  )}
                  {(user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN') && (
                    <Link href="/admin" className={`font-bold transition-all hover:text-blue-500 ${scrolled ? 'text-slate-300' : 'text-slate-600'}`}>
                      Management
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
                    <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 glass rounded-full ring-1 ring-white/5 hover:bg-white/10 transition-colors pointer-events-auto">
                      <UserIcon className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-bold text-white truncate max-w-[100px]">{user?.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors pointer-events-auto"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className={`font-bold transition-all hover:text-blue-500 ${scrolled ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-blue-600 transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl glass border-white/10 ${scrolled ? 'text-white' : 'text-slate-900'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden glass rounded-[2rem] mt-4 p-6 space-y-6"
            >
              <Link href="/courses" className="block text-white font-bold text-lg" onClick={() => setIsMenuOpen(false)}>
                Catalog
              </Link>
              {isAuthenticated ? (
                <div className="space-y-6">
                   <div className="flex items-center space-x-3 text-blue-400 font-black">
                    <UserIcon className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </div>
                  <div className="h-[1px] bg-white/10 w-full" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-500 font-bold"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <Link href="/login" className="block text-slate-300 font-bold" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block bg-blue-600 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Academy
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
