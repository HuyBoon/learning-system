'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Home, ArrowLeft, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse decoration-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Animated 404 Number */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative inline-block mb-8"
        >
          <h1 className="text-[12rem] font-black text-white leading-none tracking-tighter opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
               animate={{ 
                 y: [0, -20, 0],
                 rotate: [0, 5, -5, 0]
               }}
               transition={{ 
                 duration: 6, 
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
               className="h-24 w-24 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/50"
             >
                <Compass className="h-12 w-12 text-white" />
             </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4 architecture-badge">
             <GraduationCap className="h-4 w-4 text-indigo-400" />
             <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Lost in Curriculum</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Knowledge is out here,<br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              but this page isn't.
            </span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium max-w-md mx-auto leading-relaxed">
            The curriculum you're seeking seems to have been archived or moved to a different wing of the academy.
          </p>

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/"
              className="flex items-center space-x-3 px-10 py-5 bg-white text-slate-950 rounded-[2rem] font-black hover:bg-slate-100 transition-all shadow-xl shadow-white/5 group active:scale-95"
            >
              <Home className="h-5 w-5" />
              <span>Return Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-3 px-10 py-5 bg-white/5 text-white border border-white/10 rounded-[2rem] font-black hover:bg-white/10 transition-all backdrop-blur-lg group active:scale-95"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform" />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
