'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses, fetchInstructorCourses, deleteCourse } from '@/store/slices/courseSlice';
import { Plus, Edit2, Trash2, Search, Filter, BookOpen, Eye, MoreHorizontal, ArrowUpRight, Users, DollarSign, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCoursesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { courses, instructorCourses, loading } = useAppSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      dispatch(fetchCourses());
    } else if (user?.role === 'INSTRUCTOR') {
      dispatch(fetchInstructorCourses());
    }
  }, [dispatch, user]);

  const displayCourses = user?.role === 'ADMIN' ? courses : instructorCourses;

  const filteredCourses = displayCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const result = await dispatch(deleteCourse(id));
        if (deleteCourse.fulfilled.match(result)) {
          toast.success('Course successfully deleted');
        } else {
          toast.error(result.payload as string || 'Failed to delete course');
        }
      } catch (err) {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const stats = [
    { label: 'Total Courses', value: displayCourses.length, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Students', value: displayCourses.reduce((acc, c) => acc + (c._count?.enrollments || 0), 0), icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Total Revenue', value: `$${displayCourses.reduce((acc, c) => acc + (c.price * (c._count?.enrollments || 0)), 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Rating', value: '4.8', icon: ArrowUpRight, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Curriculum Hub</h1>
          <p className="text-slate-500 font-bold flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Design, manage, and scale your academic content.</span>
          </p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/admin/courses/new')}
          className="flex items-center justify-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200/50 hover:bg-slate-800 transition-all border-b-4 border-slate-950"
        >
          <Plus className="h-5 w-5" />
          <span>New Masterclass</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
          >
            <div className={`h-14 w-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search curricula by title, instructor or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold shadow-sm outline-none placeholder:text-slate-300"
          />
        </div>
        <button className="px-8 py-5 bg-white border border-slate-200 rounded-[2rem] font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center space-x-3 shadow-sm active:scale-95">
          <Filter className="h-5 w-5" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden"
      >
        {loading ? (
          <div className="p-32 flex flex-col items-center justify-center space-y-6">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 border-8 border-indigo-50 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Decrypting database...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Course Architecture</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status & Price</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Engagement</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {filteredCourses.map((course, idx) => (
                    <motion.tr 
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50/30 transition-colors group"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center space-x-6">
                          <div className="h-20 w-20 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-xl relative group-hover:scale-110 transition-transform duration-500">
                            {course.thumbnail ? (
                              <Image src={course.thumbnail} alt="" fill className="object-cover" />
                            ) : (
                              <BookOpen className="h-8 w-8 text-indigo-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                              {course.title}
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100 uppercase tracking-widest leading-none">
                                {course.category?.name || 'General'}
                              </span>
                              <div className="flex items-center text-slate-400 text-xs font-bold leading-none">
                                <Clock className="h-3 w-3 mr-1" />
                                12h 45m
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="text-2xl font-black text-slate-900 mb-1">${course.price}</div>
                        <div className="flex items-center space-x-2">
                           <span className="h-2 w-2 rounded-full bg-emerald-500" />
                           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-md" />
                            ))}
                          </div>
                          <span className="text-sm font-black text-slate-900">+{course._count?.enrollments || 0}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Students Managed</div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button 
                            onClick={() => router.push(`/courses/detail?id=${course.id}`)}
                            className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100"
                            title="Preview Class"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => router.push(`/admin/courses/edit?id=${course.id}`)}
                            className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100"
                            title="Modify Curriculum"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(course.id)}
                            className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                            title="Archive Course"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-32 text-center">
            <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
               <BookOpen className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No Curricula Detected</h3>
            <p className="text-slate-500 font-bold mb-10 max-w-md mx-auto">Your academy is currently empty. Start by architecting your first world-class masterclass.</p>
            <button 
              onClick={() => router.push('/admin/courses/new')}
              className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200 hover:bg-slate-900 transition-all flex items-center space-x-3 mx-auto border-b-4 border-indigo-800"
            >
              <Plus className="h-6 w-6" />
              <span>Create Initial Course</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
