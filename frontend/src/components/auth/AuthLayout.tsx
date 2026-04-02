'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Sparkles, GraduationCap, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFDFF]">
      {/* Brand Section - Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-indigo-700 overflow-hidden"
      >
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative z-10 w-full flex flex-col justify-between p-12 xl:p-20 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">LMS<span className="text-indigo-200">CORE</span></span>
          </Link>

          {/* Hero Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Modern Learning Experience</span>
              </div>
              <h1 className="text-5xl xl:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                Master Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">Future</span> Today.
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed mb-10 opacity-90">
                Join thousands of students and instructors on the most advanced educational platform built for the next generation of learners.
              </p>

              {/* USP List */}
              <div className="space-y-5">
                {[
                  { icon: <CheckCircle2 className="h-5 w-5" />, text: "Expert-led interactive courses" },
                  { icon: <GraduationCap className="h-5 w-5" />, text: "Professional certification paths" },
                  { icon: <Globe className="h-5 w-5" />, text: "Collaborative global community" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-indigo-50 font-medium">
                    <div className="bg-white/10 p-1 rounded-lg">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Featured Image / Card Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-12 relative"
          >
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl opacity-20" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video">
              <Image 
                src="/images/auth-hero.png" 
                alt="Auth Hero" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Form Section - Right Side */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-12 xl:px-24 bg-white relative">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-black tracking-tighter text-slate-900">LMS<span className="text-indigo-600">CORE</span></span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">{title}</h2>
            <p className="text-slate-500 text-lg font-medium">{subtitle}</p>
          </div>

          <div className="relative">
            {/* Decors */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-50 rounded-full -z-10 opacity-70" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-sky-50 rounded-full -z-10 opacity-70" />
            
            {/* Main Form Container */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-10 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-bl-full" />
              {children}
            </div>
          </div>
        </motion.div>

        {/* Footer info/links */}
        <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm font-medium italic">
                Secure 256-bit SSL encrypted connection
            </p>
        </div>
      </div>
    </div>
  );
}
