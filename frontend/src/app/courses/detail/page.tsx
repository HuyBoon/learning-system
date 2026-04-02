'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourseById } from '@/store/slices/courseSlice';
import { checkEnrollmentStatus, enrollInCourse } from '@/store/slices/enrollmentSlice';
import Navbar from '@/components/layout/Navbar';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  PlayCircle, 
  ChevronDown, 
  ShieldCheck, 
  Infinity, 
  Smartphone,
  Trophy,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

function CourseDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedCourse, loading: courseLoading, error } = useAppSelector((state) => state.courses);
  const { enrollmentStatus, loading: enrollLoading } = useAppSelector((state) => state.enrollment);
  const { user } = useAppSelector((state) => state.auth);

  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});

  const currentEnrollment = id ? enrollmentStatus[id] : null;
  const loading = courseLoading || enrollLoading;

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
      if (user) {
        dispatch(checkEnrollmentStatus(id));
      }
    }
  }, [dispatch, id, user]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const handleEnrollOrGo = async () => {
    if (!user) {
      toast.error('Please login to enroll in this course');
      router.push('/login');
      return;
    }

    if (currentEnrollment?.enrolled) {
      router.push(`/learning/player?courseId=${id}`);
      return;
    }

    try {
      const result = await dispatch(enrollInCourse(id as string));
      if (enrollInCourse.fulfilled.match(result)) {
        toast.success('Successfully enrolled! Welcome to the course.');
        router.push(`/learning/player?courseId=${id}`);
      } else {
        toast.error(result.payload as string || 'Enrollment failed');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  if (!id) return <div className="p-20 text-center font-bold text-slate-400">Invalid Course ID</div>;
  if (loading && !selectedCourse) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full shadow-lg shadow-indigo-100"></div>
      </div>
    );
  }
  if (error || !selectedCourse) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 p-10 rounded-[3rem] text-center border border-red-100 max-w-md">
           <BookOpen className="h-16 w-16 text-red-200 mx-auto mb-6" />
           <h2 className="text-2xl font-black text-slate-900 mb-2">Course Not Found</h2>
           <p className="text-slate-500 font-medium mb-8">The course you are looking for may have been removed or moved to a new URL.</p>
           <button onClick={() => router.push('/courses')} className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
             Back to Catalog
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
             <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20 mb-8">
               <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
               <span>{selectedCourse.category?.name || 'Featured Course'}</span>
             </div>
             
             <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]">
               {selectedCourse.title}
             </h1>
             
             <p className="text-xl text-slate-400 font-medium leading-relaxed mb-10 max-w-2xl">
               {selectedCourse.description}
             </p>

             <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center space-x-3">
                   <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-indigo-500/20">
                     {selectedCourse.instructor?.name?.charAt(0) || 'I'}
                   </div>
                   <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Instructor</div>
                      <div className="text-lg font-bold text-white">{selectedCourse.instructor?.name || 'Elite Instructor'}</div>
                   </div>
                </div>

                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50">
                   <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                   </div>
                   <span className="text-sm font-black text-white ml-1">4.9/5.0</span>
                   <span className="text-slate-500 text-xs font-bold ml-1">(1,240 students)</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 -mt-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Curriculum Area */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-indigo-50 rounded-2xl">
                       <BookOpen className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight">Full Curriculum</h2>
                       <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                         {selectedCourse._count?.lessons || 0} Professional Lessons
                       </p>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                 {(selectedCourse.lessons || []).map((lesson, idx) => (
                   <div key={lesson.id} className="border border-slate-100 rounded-[2rem] overflow-hidden transition-all group">
                     <button 
                       onClick={() => toggleLesson(lesson.id)}
                       className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-all text-left"
                     >
                       <div className="flex items-center space-x-6">
                         <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-black rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                           {String(idx + 1).padStart(2, '0')}
                         </div>
                         <span className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{lesson.title}</span>
                       </div>
                       <div className="flex items-center space-x-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">8:24 mins</span>
                          {expandedLessons[lesson.id] ? <ChevronDown className="h-5 w-5 text-slate-300 rotate-180 transition-transform" /> : <ChevronDown className="h-5 w-5 text-slate-300 transition-transform" />}
                       </div>
                     </button>
                     
                     <AnimatePresence>
                       {expandedLessons[lesson.id] && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="px-24 pb-8"
                         >
                            <div className="flex items-start space-x-3 text-slate-500 font-medium leading-relaxed italic p-6 bg-slate-50 rounded-2xl border border-slate-100">
                               <PlayCircle className="h-5 w-5 text-indigo-400 mt-1 flex-shrink-0" />
                               <span>In this lesson, you will learn the core concepts and practical applications of {lesson.title}. We'll walk through real-world examples and interactive exercises.</span>
                            </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 ))}
               </div>
            </section>

          </div>

          {/* Right: Enrollment Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-8 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
               
               <div className="relative z-10">
                 <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                   <div className="w-8 h-[1px] bg-indigo-200 mr-2"></div>
                   One-time Purchase
                 </div>
                 
                 <div className="flex items-baseline mb-8">
                   <span className="text-sm font-black text-slate-900 mr-1">$</span>
                   <span className="text-5xl font-black text-slate-900 tracking-tighter">
                     {Number(selectedCourse.price).toFixed(2).split('.')[0]}
                   </span>
                   <span className="text-2xl font-black text-slate-400 tracking-tighter">
                     .{Number(selectedCourse.price).toFixed(2).split('.')[1]}
                   </span>
                 </div>

                 <button 
                   onClick={handleEnrollOrGo}
                   className="w-full flex items-center justify-center space-x-2 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold text-lg hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] mb-4"
                 >
                   <span>{currentEnrollment?.enrolled ? 'Go to Learning' : 'Enroll Now'}</span>
                   <ArrowRight className="h-5 w-5" />
                 </button>

                 {(user?.role === 'ADMIN' || user?.id === selectedCourse.instructorId) && (
                   <button 
                     onClick={() => router.push(`/admin/courses/edit?id=${id}`)}
                     className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-100 text-slate-700 rounded-[1.5rem] font-bold hover:bg-slate-200 transition-all mb-6 border border-slate-200"
                   >
                     <ExternalLink className="h-4 w-4" />
                     <span>Edit Course Content</span>
                   </button>
                 )}

                 <div className="space-y-4 mb-2">
                    {[
                      { icon: Infinity, label: 'Full lifetime access' },
                      { icon: Smartphone, label: 'Access on mobile and TV' },
                      { icon: Trophy, label: 'Certificate of completion' },
                      { icon: ShieldCheck, label: '30-day money-back guarantee' }
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center space-x-3 text-slate-500 font-bold text-sm">
                         <feat.icon className="h-4.5 w-4.5 text-indigo-400" />
                         <span>{feat.label}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
       </div>
    }>
      <CourseDetailContent />
    </Suspense>
  );
}
