'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses, fetchInstructorCourses, deleteCourse } from '@/store/slices/courseSlice';
import { Plus, Edit2, Trash2, Search, Filter, BookOpen, MoreVertical, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

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

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Course Management</h1>
          <p className="text-slate-500 font-medium">Manage and monitor all curriculum content across the platform.</p>
        </div>
        <button 
          onClick={() => router.push('/admin/courses/new')}
          className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Stats & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by course title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-600 font-medium shadow-sm outline-none"
          />
        </div>
        <div className="md:col-span-4 flex gap-4">
          <button className="flex-1 flex items-center justify-center space-x-2 px-5 py-4 bg-white border border-slate-200 rounded-[1.5rem] font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="h-5 w-5 text-slate-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            <p className="text-slate-400 font-bold">Synchronizing content...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Course Description</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Price</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Enrolled</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100 relative">
                          {course.thumbnail ? (
                            <Image src={course.thumbnail} alt="" fill className="object-cover" />
                          ) : (
                            <BookOpen className="h-6 w-6 text-indigo-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                            {course.title}
                          </div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                            ID: {course.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-base font-black text-slate-900">${course.price}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-500">{course._count?.enrollments || 0} students</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-lg border border-indigo-200 uppercase tracking-widest">
                        {course.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => router.push(`/courses/detail?id=${course.id}`)}
                          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="View course"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => router.push(`/admin/courses/edit?id=${course.id}`)}
                          className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                          title="Edit course"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(course.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete course"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="h-20 w-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
               <BookOpen className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search filters or create a new course.</p>
          </div>
        )}
      </div>
    </div>
  );
}
