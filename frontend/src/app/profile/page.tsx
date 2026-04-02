'use client';

import { useAppSelector } from '@/store/hooks';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  MapPin, 
  Edit3, 
  LogOut,
  Camera,
  CheckCircle2,
  BookOpen,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Profile Header Card */}
      <div className="relative mb-12">
        <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-[3rem] shadow-2xl relative overflow-hidden">
          {/* Decorative background patterns */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="absolute -bottom-16 left-8 md:lg:left-16 flex flex-col md:flex-row items-end gap-6 w-full pr-16 md:pr-0">
          <div className="relative group">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2.5rem] bg-white p-2 shadow-2xl overflow-hidden">
              <div className="w-full h-full rounded-[2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 relative overflow-hidden group">
                <User size={64} className="group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer">
                  <Camera className="text-white h-8 w-8" />
                </div>
              </div>
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-4 right-4 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
          </div>
          
          <div className="flex-1 pb-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
                {user.name}
              </h1>
              <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-500/20">
                {user.role}
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 font-bold text-sm tracking-wide">
              <span className="flex items-center space-x-1.5">
                <MapPin className="h-4 w-4" />
                <span>Global Student</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-200" />
              <span className="flex items-center space-x-1.5">
                <Calendar className="h-4 w-4" />
                <span>Joined Oct 2023</span>
              </span>
            </div>
          </div>

          <div className="flex gap-3 pb-4">
            <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/20 active:scale-95 flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-rose-50 text-rose-600 rounded-2xl font-black hover:bg-rose-100 transition-all active:scale-95 shadow-xl shadow-rose-200/10"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Account Details */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 tracking-tight uppercase">Security Info</h2>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center space-x-4 transition-all group-hover:bg-white group-hover:border-indigo-100 dark:group-hover:border-slate-700">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-indigo-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 tracking-tight">{user.email}</span>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Access Level</label>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center space-x-4 transition-all group-hover:bg-white group-hover:border-indigo-100 dark:group-hover:border-slate-700">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-emerald-600">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 tracking-tight uppercase">{user.role} Authorization</span>
                </div>
              </div>
              
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl flex items-start space-x-3 text-indigo-600 dark:text-indigo-400 mt-4">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold leading-relaxed">
                  Your account is protected with enterprise-grade encryption. Your data is never shared with third parties.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Experience/Progress */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group"
            >
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 blur-[80px] rounded-full group-hover:bg-white/20 transition-colors duration-700" />
              <div className="p-4 bg-white/10 rounded-2xl w-fit mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <p className="text-indigo-100 font-black text-xs uppercase tracking-[0.25em] mb-2">Learning Path</p>
              <h3 className="text-3xl font-black tracking-tighter italic">4 Active Courses</h3>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full" />
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl w-fit mb-6 text-indigo-600">
                <Award className="h-8 w-8" />
              </div>
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.25em] mb-2">Achievements</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">12 Certificates</h3>
            </motion.div>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase px-4 flex items-center space-x-3">
              <span className="italic">Recent Learning Session</span>
              <span className="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </h2>
            
            <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-500">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                  <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay group-hover:bg-indigo-600/0 transition-all" />
                  <div className="w-full h-full flex items-center justify-center font-black text-indigo-600 text-2xl uppercase">HT</div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">Advanced React Patterns</h4>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 md:w-48 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-indigo-600 rounded-full animate-pulse" />
                    </div>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">65% Progress</span>
                  </div>
                </div>
              </div>
              <button className="h-14 w-14 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Edit3 className="h-6 w-6" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
