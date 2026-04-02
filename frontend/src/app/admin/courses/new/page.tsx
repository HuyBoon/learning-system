'use client';

import CourseForm from '@/components/admin/CourseForm';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewCoursePage() {
  const router = useRouter();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="relative z-10 max-w-2xl">
          <div className="h-14 w-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/30">
            <ChefHat className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-black mb-3 tracking-tight">Create a New Course</h1>
          <p className="text-indigo-100 text-lg font-medium">Design an impactful learning experience. Fill in the details below to start your curriculum.</p>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
        <CourseForm />
      </div>
    </div>
  );
}
