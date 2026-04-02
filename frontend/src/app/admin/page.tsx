'use client';

import { useAppSelector } from '@/store/hooks';
import { 
  Users, 
  BookOpen, 
  PlayCircle, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Students', value: '1,284', icon: Users, color: 'bg-indigo-50 text-indigo-600', trend: '+12.5%' },
  { label: 'Active Courses', value: '42', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600', trend: '+3.2%' },
  { label: 'Total Sales', value: '$12,450', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', trend: '+18.2%' },
  { label: 'Watch Time', value: '842h', icon: PlayCircle, color: 'bg-rose-50 text-rose-600', trend: '+5.4%' },
];

export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 font-bold text-sm tracking-wide">
            Welcome back, <span className="text-indigo-600">{user?.name}</span>. Here's what's happening today.
          </p>
        </div>
        <Link 
          href="/admin/courses/new"
          className="inline-flex items-center space-x-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>CREATE NEW COURSE</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-emerald-500 text-xs font-black bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Recent Submissions</h2>
            <Link href="/admin/courses" className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center space-x-1 hover:space-x-2 transition-all">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            {[1, 2, 3].map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${i !== 2 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 tracking-tight">Fullstack React Mastery</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-slate-400 font-bold text-xs">Updated 2h ago</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">In Progress</span>
                    </div>
                  </div>
                </div>
                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Review */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase px-2">Announcements</h2>
          <div className="bg-gradient-to-tr from-indigo-900 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
            <Clock className="h-8 w-8 text-indigo-400 mb-6" />
            <h3 className="text-xl font-black tracking-tight mb-3 italic">New Student Onboarding</h3>
            <p className="text-indigo-200 text-sm font-bold leading-relaxed mb-8">
              System update scheduled for tonight at 2:00 AM UTC. Please ensure all live sessions are completed by then.
            </p>
            <Link 
              href="#"
              className="flex items-center justify-center space-x-2 py-3 bg-white text-indigo-900 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-indigo-50 transition-colors shadow-lg"
            >
              <span>View Schedule</span>
              <CheckCircle2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
