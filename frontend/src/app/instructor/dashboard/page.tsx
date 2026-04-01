'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchInstructorCourses, fetchCategories } from '@/store/slices/courseSlice';
import Navbar from '@/components/layout/Navbar';
import CourseCard from '@/components/instructor/CourseCard';
import Link from 'next/link';
import { Plus, LayoutDashboard, BarChart3, Users, BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InstructorDashboard() {
  const dispatch = useAppDispatch();
  const { instructorCourses, loading, error } = useAppSelector((state) => state.courses);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchInstructorCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  const totalEnrollments = instructorCourses.reduce((acc, course) => acc + (course._count?.enrollments || 0), 0);
  const totalLessons = instructorCourses.reduce((acc, course) => acc + (course._count?.lessons || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Instructor Dashboard</h1>
            <p className="text-slate-500 mt-2 font-medium">Manage your courses, track student progress, and create new curriculum.</p>
          </div>
          <Link
            href="/instructor/courses/create"
            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Course</span>
          </Link>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Courses', value: instructorCourses.length, icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Total Students', value: totalEnrollments, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Curriculum Items', value: totalLessons, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-5 group hover:border-indigo-100 transition-colors"
            >
              <div className={`${stat.bg} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              <span>Your Course Performance</span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 h-[400px] animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center space-x-3 text-red-700">
               <AlertCircle className="h-6 w-6" />
               <span className="font-semibold">{error}</span>
            </div>
          ) : instructorCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructorCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 p-20 text-center flex flex-col items-center justify-center">
              <div className="bg-slate-50 p-6 rounded-full mb-6">
                 <LayoutDashboard className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No courses yet</h3>
              <p className="text-slate-500 max-w-sm mb-8 font-medium">Start your teaching journey today and create your first high-impact course.</p>
              <Link
                href="/instructor/courses/create"
                className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
              >
                Launch your first course
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
