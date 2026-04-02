'use client';

import { useEffect, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourseById } from '@/store/slices/courseSlice';
import { useSearchParams, useRouter } from 'next/navigation';
import CourseForm from '@/components/admin/CourseForm';
import LessonManager from '@/components/admin/LessonManager';
import { Settings, BookOpen, ArrowLeft, Loader2 } from 'lucide-react';

function EditCourseContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedCourse, loading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  if (loading && !selectedCourse) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-slate-400 font-bold">Loading course architecture...</p>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Course not found</h2>
        <button 
          onClick={() => router.push('/admin/courses')}
          className="text-indigo-600 font-bold hover:underline"
        >
          Return to course list
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-indigo-400 font-black uppercase tracking-[0.2em] mb-4 text-xs">
            <Settings className="h-4 w-4" />
            <span>Course Workshop</span>
          </div>
          <h1 className="text-4xl font-black mb-3 tracking-tight">Edit: {selectedCourse.title}</h1>
          <p className="text-slate-400 text-lg font-medium max-w-2xl">Refine your curriculum and update course parameters to ensure the best learning outcome.</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 space-y-12">
          {/* Form Section */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <div className="flex items-center space-x-3 mb-8">
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Core Configuration</h2>
            </div>
            <CourseForm initialData={selectedCourse} isEditing />
          </section>

          {/* Lessons Section */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <LessonManager courseId={selectedCourse.id} lessons={selectedCourse.lessons || []} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default function EditCoursePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
      </div>
    }>
      <EditCourseContent />
    </Suspense>
  );
}
