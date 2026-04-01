'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchCourseById, 
  updateCourse, 
  fetchCategories,
  addLesson,
  updateLesson,
  deleteLesson,
  reorderLessons
} from '@/store/slices/courseSlice';
import Navbar from '@/components/layout/Navbar';
import LessonForm from '@/components/instructor/LessonForm';
import { 
  Save, 
  Plus, 
  GripVertical, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Settings, 
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import toast from 'react-hot-toast';
import { Lesson } from '@/types/course';

function CourseEditorContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedCourse, categories, loading } = useAppSelector((state) => state.courses);

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
  });

  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (id) {
        dispatch(fetchCourseById(id));
        dispatch(fetchCategories());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCourse) {
      setCourseData({
        title: selectedCourse.title,
        description: selectedCourse.description,
        price: selectedCourse.price.toString(),
        categoryId: selectedCourse.categoryId || '',
      });
    }
  }, [selectedCourse]);

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    const result = await dispatch(updateCourse({
      id: id,
      data: { ...courseData, price: Number(courseData.price) }
    }));
    if (updateCourse.fulfilled.match(result)) {
      toast.success('Course updated successfully!');
    } else {
      toast.error('Failed to update course');
    }
  };

  const handleSaveLesson = async (lessonData: any) => {
    if (!id) return;
    
    if (editingLesson) {
      const result = await dispatch(updateLesson({ id: editingLesson.id, data: lessonData }));
      if (updateLesson.fulfilled.match(result)) {
        toast.success('Lesson updated!');
      }
    } else {
      const result = await dispatch(addLesson({ ...lessonData, courseId: id }));
      if (addLesson.fulfilled.match(result)) {
        toast.success('Lesson added!');
      }
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      const result = await dispatch(deleteLesson(lessonId));
      if (deleteLesson.fulfilled.match(result)) {
        toast.success('Lesson deleted!');
      }
    }
  };

  const handleReorder = async (newLessons: Lesson[]) => {
    if (!id) return;
    const lessonIds = newLessons.map(l => l.id);
    await dispatch(reorderLessons({ courseId: id, lessonIds }));
  };

  if (!id) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
             <p className="text-slate-400 font-bold">No Course ID provided.</p>
        </div>
    );
  }

  if (!selectedCourse && loading) {
     return (
        <div className="flex items-center justify-center min-h-[400px]">
             <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        </div>
     );
  }

  if (!selectedCourse) return null;

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-10 flex items-center justify-between">
           <button onClick={() => router.push('/instructor/dashboard')} className="flex items-center text-slate-500 hover:text-indigo-600 font-bold transition-colors">
             <ChevronLeft className="h-5 w-5 mr-1" />
             Back to Dashboard
           </button>
           <div className="flex items-center space-x-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold border border-emerald-100">
             <CheckCircle2 className="h-4 w-4" />
             <span>Autosaving lessons</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Panel omitted for brevity but remains the same conceptually */}
          <div className="lg:col-span-5 space-y-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2.5 bg-slate-100 rounded-xl">
                    <Settings className="h-6 w-6 text-slate-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Main Settings</h2>
                </div>

                <form onSubmit={handleUpdateCourse} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Course Title</label>
                    <input
                      type="text"
                      value={courseData.title}
                      onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      value={courseData.description}
                      onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Price ($)</label>
                      <input
                        type="number"
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                      <select
                        value={courseData.categoryId}
                        onChange={(e) => setCourseData({ ...courseData, categoryId: e.target.value })}
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-900 appearance-none"
                      >
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Basic Changes</span>
                  </button>
                </form>
             </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-50 rounded-xl">
                      <BookOpen className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Curriculum</h2>
                  </div>
                  <button
                    onClick={() => {
                        setEditingLesson(null);
                        setIsLessonModalOpen(true);
                    }}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Lesson</span>
                  </button>
                </div>

                <Reorder.Group 
                   axis="y" 
                   values={selectedCourse.lessons || []} 
                   onReorder={handleReorder}
                   className="space-y-4"
                >
                  {(selectedCourse.lessons || []).map((lesson) => (
                    <Reorder.Item 
                      key={lesson.id} 
                      value={lesson}
                      className="group flex items-center bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors cursor-grab active:cursor-grabbing"
                    >
                      <div className="p-2 mr-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
                        <GripVertical className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{lesson.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                              Order: {lesson.order}
                           </span>
                           <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest truncate max-w-[150px]">
                              {lesson.videoUrl.split('v=')[1] || 'video'}
                           </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                              setEditingLesson(lesson);
                              setIsLessonModalOpen(true);
                          }}
                          className="p-2 bg-white text-slate-600 rounded-lg hover:text-indigo-600 border border-slate-200 transition-all"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-2 bg-white text-slate-600 rounded-lg hover:text-red-600 border border-slate-200 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>

                {(!selectedCourse.lessons || selectedCourse.lessons.length === 0) && (
                   <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                      <BookOpen className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold">Your curriculum is empty</p>
                      <p className="text-sm text-slate-400 mt-1">Start by adding your first lesson above</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </main>

      <LessonForm 
        isOpen={isLessonModalOpen}
        onCancel={() => setIsLessonModalOpen(false)}
        onSave={handleSaveLesson}
        lesson={editingLesson}
      />
    </>
  );
}

export default function CourseEditor() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center p-20 animate-pulse text-indigo-600">Loading editor...</div>}>
        <CourseEditorContent />
      </Suspense>
    </div>
  );
}
