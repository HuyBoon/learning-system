'use client';

import { Course } from '@/types/course';
import { Users, BookOpen, Star, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

interface PublicCourseCardProps {
  course: Course;
}

export default function PublicCourseCard({ course }: PublicCourseCardProps) {
  return (
    <Link 
      href={`/courses/detail?id=${course.id}`} // Using query params for static export
      className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col h-full"
    >
      {/* Thumbnail Container */}
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50">
            <BookOpen className="h-12 w-12 text-indigo-200" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-sm flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <span>{course.category?.name || 'General'}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-center space-x-1 mb-3">
             {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
             <span className="text-[10px] font-bold text-slate-400 ml-1">(4.8)</span>
          </div>
          
          <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight mb-3">
            {course.title}
          </h3>

          <div className="flex items-center space-x-2 mb-6">
            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 ring-2 ring-white">
              {course.instructor?.name?.charAt(0) || 'I'}
            </div>
            <span className="text-xs font-bold text-slate-500">
              {course.instructor?.name || 'Elite Instructor'}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wider">
               <Users className="h-3.5 w-3.5 mr-1 text-slate-300" />
               {course._count?.enrollments || 0}
             </div>
             <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wider">
               <BookOpen className="h-3.5 w-3.5 mr-1 text-slate-300" />
               {course._count?.lessons || 0}
             </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-slate-900">
              ${Number(course.price).toFixed(2)}
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
