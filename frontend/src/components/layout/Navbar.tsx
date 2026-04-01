'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { LogOut, User as UserIcon, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { RootState } from '@/store';

export default function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                LMS Platform
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
              Courses
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-full">
                  <UserIcon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-slate-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/courses"
                  className="text-slate-600 font-bold hover:text-indigo-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-50"
                >
                  Courses
                </Link>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <Link href="/courses" className="block text-slate-600 font-medium py-2">
            Courses
          </Link>
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="py-2 text-indigo-600 font-semibold">{user?.name}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <Link href="/login" className="block py-2 text-slate-600 font-medium">
                Log in
              </Link>
              <Link
                href="/register"
                className="block bg-indigo-600 text-white text-center py-2.5 rounded-xl font-semibold transition-all shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
