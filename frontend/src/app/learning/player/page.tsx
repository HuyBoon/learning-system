'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourseById } from '@/store/slices/courseSlice';
import Navbar from '@/components/layout/Navbar';
import { 
  Play, 
  CheckCircle, 
  ChevronRight, 
  Layout, 
  MessageSquare, 
  Download, 
  FileText,
  Lock,
  Loader2,
  ChevronLeft,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function PlayerContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedCourse, loading } = useAppSelector((state) => state.courses);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (selectedCourse?.lessons?.length && !activeLessonId) {
      setActiveLessonId(selectedCourse.lessons[0].id);
    }
  }, [selectedCourse, activeLessonId]);

  const activeLesson = selectedCourse?.lessons?.find(l => l.id === activeLessonId);

  if (loading && !selectedCourse) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-black mb-6">Classroom not initialized</h2>
        <button 
          onClick={() => router.push('/my-learning')}
          className="px-8 py-3 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
        >
          Return to My Learning
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pt-20">
        
        {/* Main Player Area */}
        <div className="flex-1 flex flex-col bg-black overflow-y-auto">
          <div className="relative aspect-video w-full bg-slate-900 group">
            {activeLesson ? (
              <div className="absolute inset-0 flex items-center justify-center">
                 {/* Mock video player */}
                 <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-slate-900/60 flex flex-col items-center justify-center p-10 text-center">
                    <div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 mb-8 cursor-pointer hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-white fill-white ml-1" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{activeLesson.title}</h3>
                    <p className="text-slate-400 font-medium">Session {selectedCourse.lessons?.indexOf(activeLesson)! + 1} of {selectedCourse.lessons?.length}</p>
                 </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                <Lock className="h-12 w-12 mb-4 opacity-20" />
                <span className="font-bold">Select a lesson to begin</span>
              </div>
            )}
            
            {/* Player Controls Mockup */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-1.5 w-full bg-white/20 rounded-full mb-6">
                 <div className="h-full w-[45%] bg-indigo-500 rounded-full relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow-lg"></div>
                 </div>
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-6">
                   <Play className="h-6 w-6 fill-white" />
                   <div className="text-sm font-bold tracking-widest">12:45 / 24:00</div>
                </div>
                <div className="flex items-center space-x-6">
                   <Settings className="h-5 w-5" />
                   <Fullscreen className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 text-white space-y-8">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <span>Currently Viewing</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-4">{activeLesson?.title}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm">
                   <Clock className="h-4 w-4" />
                   <span>Duration: 18 mins</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm">
                   <FileText className="h-4 w-4" />
                   <span>1 Resource attached</span>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <div className="prose prose-invert max-w-none">
              <p className="text-slate-400 leading-relaxed text-lg">
                {activeLesson?.content || "No detailed description available for this lesson. Please follow along with the video instruction for full details on this module's objectives."}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Curriculum */}
        <div className="w-full lg:w-[400px] bg-slate-900 border-l border-white/10 flex flex-col">
          <div className="p-8 border-b border-white/10">
             <h2 className="text-xl font-black text-white tracking-tight mb-1">Course Content</h2>
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">3 / {selectedCourse.lessons?.length || 0} COMPLETED</span>
                <span className="text-xs font-black text-indigo-400">24%</span>
             </div>
             <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[24%] bg-indigo-500 rounded-full"></div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {(selectedCourse.lessons || []).map((lesson, idx) => {
              const isActive = activeLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full flex items-start space-x-4 p-4 rounded-2xl transition-all text-left ${
                    isActive 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`mt-0.5 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border-2 ${
                    isActive ? 'border-white/40 bg-white/20' : 'border-slate-700 bg-slate-800'
                  }`}>
                    {idx < 3 ? <CheckCircle className="h-3 w-3 fill-current" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm line-clamp-2 leading-tight mb-1">{lesson.title}</div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-200' : 'text-slate-600'}`}>
                      12:15 mins
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple icons for the placeholder
function Settings(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
}

function Fullscreen(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6M21 3l-6 6M3 21l6-6"></path></svg>;
}

export default function LearningPlayerPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
       </div>
    }>
      <PlayerContent />
    </Suspense>
  );
}
