'use client';

import { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { 
  ArrowRight, 
  PlayCircle, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Globe, 
  CheckCircle2, 
  TrendingUp,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses } from '@/store/slices/courseSlice';
import PublicCourseCard from '@/components/courses/PublicCourseCard';

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all group"
  >
    <div className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-200">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
  </motion.div>
);

export default function Home() {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const trendingCourses = Array.isArray(courses) ? courses.slice(0, 3) : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFF] selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* --- Hero Section --- */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
          {/* Background Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute top-[10%] -right-[5%] w-[500px] h-[500px] bg-violet-50 rounded-full blur-[100px] opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-8"
                >
                  <Award className="h-4 w-4" />
                  <span>The Future of Online Education</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8"
                >
                  Learn without <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600">limits.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12 opacity-80"
                >
                  Join a global community of lifelong learners and master in-demand skills with our premium, expert-led curriculum. Built for curious minds.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
                >
                  <Link
                    href="/courses"
                    className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all shadow-[0_20px_40px_-12px_rgba(79,70,229,0.3)] flex items-center justify-center space-x-2 active:scale-[0.98]"
                  >
                    <span>Explore Courses</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <button className="w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 rounded-2xl font-bold text-lg text-slate-700 bg-white border border-slate-100 hover:bg-slate-50 transition-all shadow-sm">
                    <PlayCircle className="h-6 w-6 text-indigo-600" />
                    <span>Watch Demo</span>
                  </button>
                </motion.div>

                {/* Social Proof */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span className="font-bold text-sm uppercase tracking-widest">Global Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-bold text-sm uppercase tracking-widest">Trusted Data</span>
                  </div>
                   <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span className="font-bold text-sm uppercase tracking-widest">Instant Access</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="lg:col-span-5 mt-20 lg:mt-0 relative"
              >
                <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-full blur-[80px] animate-pulse" />
                <div className="relative z-10 p-4 bg-white/40 backdrop-blur-2xl rounded-[3.5rem] border border-white/40 shadow-2xl overflow-hidden">
                  <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/20">
                    <Image 
                      src="/images/home-hero.png" 
                      alt="LMSCore Brand" 
                      fill 
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 -left-8 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center space-x-4"
                  >
                    <div className="bg-green-500 p-2 rounded-xl text-white">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</div>
                      <div className="text-xl font-black text-slate-900">98.4%</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">Crafted for Excellence</h2>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Discover why thousands of students choose LMSCore for their learning journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<BookOpen className="h-7 w-7" />}
                title="Elite Curriculum"
                description="Expertly designed courses that focus on practical, real-world skills used by industry leaders."
                delay={0.1}
              />
              <FeatureCard 
                icon={<Globe className="h-7 w-7" />}
                title="Global Community"
                description="Connect with students worldwide and expand your network through collaborative learning."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Zap className="h-7 w-7" />}
                title="Rapid Progress"
                description="Our accelerated learning paths help you master complex topics faster than traditional methods."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* --- Trending Courses --- */}
        <section className="py-24 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center space-x-2 text-indigo-600 font-black uppercase tracking-widest text-xs mb-3">
                  <TrendingUp className="h-4 w-4" />
                  <span>Popular Right Now</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Trending Courses</h2>
              </div>
              <Link href="/courses" className="flex items-center space-x-2 text-indigo-600 font-bold hover:text-slate-900 transition-colors group">
                <span className="text-lg">View All Catalog</span>
                <ChevronIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-[4/5] bg-white rounded-[2.5rem] animate-pulse border border-slate-100 shadow-sm"></div>
                ))}
              </div>
            ) : trendingCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trendingCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <PublicCourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100 shadow-sm border-dashed">
                 <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center text-indigo-200 mx-auto mb-6">
                    <BookOpen className="h-8 w-8" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">No courses yet</h3>
                 <p className="text-slate-500 font-medium mb-8">Our experts are busy crafting high-quality content. Stay tuned!</p>
                 <Link href="/courses" className="text-indigo-600 font-bold border-b-2 border-indigo-100 hover:border-indigo-600 transition-all">
                    Browse catalog
                 </Link>
              </div>
            )}
          </div>
        </section>

        {/* --- Call to Action --- */}
        <section className="py-32">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div 
               whileHover={{ scale: 1.01 }}
               className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] -ml-32 -mb-32" />
               
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">Ready to start your <br /> educational journey?</h2>
                 <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto mb-12">Join over 10,000+ students and get unlimited access to all courses, projects, and professional certificates.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register" className="w-full sm:w-auto bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-colors shadow-xl">
                      Get Started for Free
                    </Link>
                    <Link href="/courses" className="w-full sm:w-auto text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors border border-white/10">
                      Browse Curriculum
                    </Link>
                 </div>
               </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">LMS<span className="text-indigo-600 font-black tracking-tighter">Core</span></span>
            </div>
            <p className="text-slate-400 font-medium text-sm">© 2026 LMSCore Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
