'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllEnrollments } from '@/store/slices/enrollmentSlice';
import { fetchCourses } from '@/store/slices/courseSlice';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  Activity,
  Calendar,
  Globe,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminAnalyticsPage() {
  const dispatch = useAppDispatch();
  const { allEnrollments, loading: enrollLoading } = useAppSelector((state) => state.enrollment);
  const { courses, loading: courseLoading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchAllEnrollments());
    dispatch(fetchCourses());
  }, [dispatch]);

  const totalRevenue = useMemo(() => 
    courses.reduce((acc, c) => acc + (c.price * (c._count?.enrollments || 0)), 0),
  [courses]);

  const cards = [
    { label: 'Market Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Learners', value: allEnrollments.length, change: '+18.2%', trend: 'up', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Course Library', value: courses.length, change: '+5.4%', trend: 'up', icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Completion Rate', value: '78%', change: '-2.1%', trend: 'down', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Institutional Intelligence</h1>
          <p className="text-slate-500 font-bold flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Real-time platform metrics and deep specialized analytics.</span>
          </p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center space-x-2 shadow-sm">
             <Calendar className="h-4 w-4" />
             <span>Last 30 Days</span>
           </button>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-indigo-200/50">
             Export Data
           </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden"
          >
            <div className={`h-14 w-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500`}>
              <card.icon className="h-7 w-7" />
            </div>
            
            <div className="space-y-1">
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">{card.label}</p>
              <div className="flex items-end space-x-3">
                <p className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</p>
                <div className={`flex items-center text-xs font-black mb-1.5 ${card.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {card.trend === 'up' ? <ArrowUpRight className="h-4 w-4 mr-0.5" /> : <ArrowDownRight className="h-4 w-4 mr-0.5" />}
                   {card.change}
                </div>
              </div>
            </div>

            {/* Decorative Sparkline Simulation */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                className={`h-full ${card.trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/20"
        >
          <div className="flex items-center justify-between mb-10">
             <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Stream</h3>
               <p className="text-slate-400 font-bold text-sm">Monthly fiscal performance overview</p>
             </div>
             <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-indigo-600" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Growth</span>
             </div>
          </div>
          
          {/* Simulated Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4">
             {[45, 60, 55, 80, 95, 70, 85, 90, 65, 75, 88, 92].map((val, i) => (
               <div key={i} className="flex-1 group relative">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${val}%` }}
                   transition={{ duration: 1, delay: i * 0.05 + 0.5 }}
                   className="w-full bg-slate-900 rounded-t-xl group-hover:bg-indigo-600 transition-colors cursor-pointer relative"
                 >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${(val * 120).toLocaleString()}
                    </div>
                 </motion.div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </motion.div>

        {/* Categories Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/20 flex flex-col"
        >
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Category Spread</h3>
          <p className="text-slate-400 font-bold text-sm mb-10">Popular educational segments</p>

          <div className="flex-1 space-y-8">
             {[
               { label: 'Technology', value: 45, color: 'bg-indigo-600' },
               { label: 'Business', value: 30, color: 'bg-emerald-600' },
               { label: 'Design', value: 15, color: 'bg-violet-600' },
               { label: 'Others', value: 10, color: 'bg-slate-200' },
             ].map((cat, i) => (
               <div key={cat.label} className="space-y-3">
                 <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-900">
                    <span>{cat.label}</span>
                    <span>{cat.value}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value}%` }}
                      transition={{ duration: 1.5, delay: 1 + i * 0.1 }}
                      className={`h-full ${cat.color}`}
                    />
                 </div>
               </div>
             ))}
          </div>

          <div className="mt-10 pt-10 border-t border-slate-100">
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                   <Award className="h-5 w-5 text-indigo-600" />
                   <span className="text-xs font-black uppercase tracking-widest text-slate-900">Elite Performance</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
             </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Global Reach */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-500/20 group overflow-hidden relative"
        >
           <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-colors duration-700" />
           <div className="relative z-10 flex items-start justify-between">
              <div>
                <Globe className="h-10 w-10 text-indigo-400 mb-6" />
                <h3 className="text-3xl font-black tracking-tight mb-2">Global Impact</h3>
                <p className="text-indigo-200/60 font-bold max-w-xs">Your curriculum is being consumed across 42 countries worldwide.</p>
              </div>
              <div className="text-right">
                <p className="text-6xl font-black tracking-tighter mb-2">42</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Nations Reached</p>
              </div>
           </div>
        </motion.div>

        {/* Community Engagement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-600/30 group overflow-hidden relative"
        >
           <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-colors duration-700" />
           <div className="relative z-10 flex items-start justify-between font-black">
              <div>
                <TrendingUp className="h-10 w-10 text-white mb-6" />
                <h3 className="text-3xl tracking-tight mb-2">Social Velocity</h3>
                <p className="text-indigo-100/60 font-bold max-w-xs">User interactions and peer reviews have increased by 24% this week.</p>
              </div>
              <div className="text-right">
                <p className="text-6xl tracking-tighter mb-2">+24%</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-200">Community Growth</p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
