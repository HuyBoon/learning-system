'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addLesson, deleteLesson, reorderLessons, updateLesson } from '@/store/slices/courseSlice';
import { Lesson } from '@/types/course';
import { Play, Trash2, Plus, X, Video, FileText, Layout, Type, Save, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import DraggableLessonList from './DraggableLessonList';
import RichTextEditor from '../common/RichTextEditor';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonManagerProps {
  courseId: string;
  lessons: Lesson[];
}

export default function LessonManager({ courseId, lessons }: LessonManagerProps) {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [lessonData, setLessonData] = useState({
    title: '',
    videoUrl: '',
    content: '',
  });

  const resetForm = () => {
    setLessonData({ title: '', videoUrl: '', content: '' });
    setEditingLessonId(null);
    setShowModal(false);
  };

  const handleEdit = (lesson: Lesson) => {
    setLessonData({
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      content: lesson.content || '',
    });
    setEditingLessonId(lesson.id);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingLessonId) {
        await dispatch(updateLesson({ id: editingLessonId, data: { ...lessonData, courseId } })).unwrap();
        toast.success('Lesson updated successfully');
      } else {
        await dispatch(addLesson({ ...lessonData, courseId, order: lessons.length + 1 })).unwrap();
        toast.success('Lesson added to curriculum');
      }
      resetForm();
    } catch (error: any) {
      toast.error(error || 'Failed to save lesson');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await dispatch(deleteLesson(id)).unwrap();
        toast.success('Lesson removed');
      } catch (error: any) {
        toast.error(error || 'Failed to delete lesson');
      }
    }
  };

  const handleReorder = async (reorderedItems: Lesson[]) => {
    try {
      const lessonIds = reorderedItems.map(item => item.id);
      await dispatch(reorderLessons({ courseId, lessonIds })).unwrap();
      toast.success('Curriculum reordered');
    } catch (error: any) {
      toast.error(error || 'Failed to reorder lessons');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Curriculum Architect</h2>
          <p className="text-slate-500 font-bold text-sm tracking-wide">Manage your instructional sequence and resources.</p>
        </div>
        <button
          onClick={() => {
            setEditingLessonId(null);
            setLessonData({ title: '', videoUrl: '', content: '' });
            setShowModal(true);
          }}
          className="flex items-center justify-center space-x-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95 border-b-4 border-slate-950"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Lesson</span>
        </button>
      </div>

      <div className="bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8">
        {lessons.length > 0 ? (
          <DraggableLessonList 
            items={lessons} 
            onReorder={handleReorder}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="py-20 text-center">
            <div className="h-20 w-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Video className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No Content Yet</h3>
            <p className="text-slate-500 font-bold max-w-xs mx-auto">Your curriculum is empty. Add your first lesson to start building your course.</p>
          </div>
        )}
      </div>

      {/* Lesson Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {editingLessonId ? 'Modify Lesson Architecture' : 'Add New Curriculum Node'}
                  </h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                    {editingLessonId ? `Editing ID: ${editingLessonId.slice(0, 8)}` : 'New Lesson Creation'}
                  </p>
                </div>
                <button 
                  onClick={resetForm}
                  className="h-12 w-12 flex items-center justify-center bg-white rounded-full hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <X className="h-6 w-6 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <form id="lesson-form" onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                       <div className="group">
                        <label className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-indigo-600 transition-colors">
                          <Type className="h-3 w-3" />
                          <span>Lesson Title</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={lessonData.title}
                          onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                          placeholder="e.g. Master the Fundamental Laws"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold outline-none placeholder:text-slate-300"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-indigo-600 transition-colors">
                          <Play className="h-3 w-3" />
                          <span>Video Asset URL</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={lessonData.videoUrl}
                          onChange={(e) => setLessonData({ ...lessonData, videoUrl: e.target.value })}
                          placeholder="Vimeo, YouTube or Cloud URL..."
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold outline-none placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
                        <h4 className="font-black text-indigo-900 text-sm mb-2 flex items-center gap-2 uppercase tracking-widest">
                          <Layout className="h-4 w-4" />
                          Curriculum Preview
                        </h4>
                        <p className="text-indigo-700/70 text-xs font-bold leading-relaxed mb-4">
                          Title and video assets are required for every curriculum node. Descriptions are recommended for better engagement.
                        </p>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100 flex items-center gap-4">
                           <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black animate-pulse">
                             <Play className="h-5 w-5 fill-current" />
                           </div>
                           <div className="flex-1 overflow-hidden">
                             <div className="text-sm font-black text-slate-900 truncate">
                               {lessonData.title || 'Drafting Title...'}
                             </div>
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                               VOD Asset Attached
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 transition-colors">
                      <MessageSquare className="h-3 w-3" />
                      <span>Lesson Resources & Description</span>
                    </label>
                    <RichTextEditor 
                      content={lessonData.content}
                      onChange={(content) => setLessonData({ ...lessonData, content })}
                    />
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-10 py-6 border-t border-slate-100 flex items-center justify-end space-x-4 bg-slate-50/30">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 text-slate-500 font-black text-sm uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  Terminate
                </button>
                <button
                  form="lesson-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95 border-b-4 border-slate-950 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  <span>{editingLessonId ? 'Confirm Modifications' : 'Initialize Node'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
