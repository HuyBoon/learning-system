'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMyEnrollments } from '@/store/slices/enrollmentSlice';
import Navbar from '@/components/layout/Navbar';
import { BookOpen, Play, Clock, Trophy, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MyLearningPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { myEnrollments, loading } = useAppSelector((state) => state.enrollment);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMyEnrollments());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="flex items-center space-x-2 text-indigo-600 font-black uppercase tracking-[0.2em] mb-4 text-xs">
            <div className="w-8 h-[1px] bg-indigo-200"></div>
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">
            Welcome back, <span className="text-indigo-600">{user?.name || 'Scholar'}</span>!
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl">Continue your journey where you left off. You have {myEnrollments.length} active courses.</p>
        </header>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            <p className="text-slate-400 font-bold">Resuming your education...</p>
          </div>
        ) : myEnrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myEnrollments.map((enrollment) => (
              <div 
                key={enrollment.id}
                className="group bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all overflow-hidden"
              >
                <div className="relative h-56 bg-slate-100">
                  {enrollment.course?.thumbnail ? (
                    <Image src={enrollment.course.thumbnail} alt="" fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-indigo-50">
                       <BookOpen className="h-12 w-12 text-indigo-200" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-lg border border-white/30 uppercase tracking-widest">
                       {enrollment.course?.category?.name || 'Development'}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {enrollment.course?.title}
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span>Overall Progress</span>
                       <span className="text-indigo-600">35%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full w-[35%] bg-indigo-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center space-x-4 text-slate-400 font-bold text-sm">
                       <div className="flex items-center space-x-1.5 uppercase tracking-widest text-[10px]">
                          <Clock className="h-4 w-4" />
                          <span>4h 20m</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/learning/player?courseId=${enrollment.courseId}`)}
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all active:scale-95"
                    >
                      <span>Resume</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-200 border-dashed max-w-4xl mx-auto">
            <div className="h-24 w-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-indigo-100">
               <Trophy className="h-12 w-12 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">You haven't started yet!</h2>
            <p className="text-lg text-slate-500 font-medium mb-10 max-w-md mx-auto">Explore our premium catalog and begin your transformation today.</p>
            <button 
              onClick={() => router.push('/courses')}
              className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              Discover Courses
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
