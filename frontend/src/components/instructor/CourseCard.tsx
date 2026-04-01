'use client';

import { Course } from '@/types/course';
import { Edit2, Users, BookOpen, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  onDelete?: (id: string) => void;
}

export default function CourseCard({ course, onDelete }: CourseCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200 transition-all group">
      <div className="aspect-video relative bg-slate-100 overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50">
            <BookOpen className="h-12 w-12 text-indigo-200" />
          </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-indigo-600 shadow-sm">
          {course.category?.name || 'Uncategorized'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center text-slate-500 text-sm font-medium">
            <Users className="h-4 w-4 mr-1.5 text-slate-400" />
            {course._count?.enrollments || 0} Students
          </div>
          <div className="flex items-center text-slate-500 text-sm font-medium">
            <BookOpen className="h-4 w-4 mr-1.5 text-slate-400" />
            {course._count?.lessons || 0} Lessons
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-lg font-black text-slate-900">
            ${Number(course.price).toFixed(2)}
          </div>
          
          <div className="flex items-center space-x-2">
            <Link 
              href={`/instructor/courses/edit?id=${course.id}`}
              className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95"
              title="Edit Course"
            >
              <Edit2 className="h-5 w-5" />
            </Link>
            <button 
              onClick={() => onDelete?.(course.id)}
              className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              title="Delete Course"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <Link 
              href={`/courses/${course.id}`}
              className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center"
              title="View Live"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
