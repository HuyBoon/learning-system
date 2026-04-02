'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addLesson, deleteLesson } from '@/store/slices/courseSlice';
import { Lesson } from '@/types/course';
import { Play, Trash2, Plus, GripVertical, FileText, Video } from 'lucide-react';
import toast from 'react-hot-toast';

interface LessonManagerProps {
  courseId: string;
  lessons: Lesson[];
}

export default function LessonManager({ courseId, lessons }: LessonManagerProps) {
  const dispatch = useAppDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: '',
    videoUrl: '',
    content: '',
    order: lessons.length + 1,
  });

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addLesson({ ...newLesson, courseId })).unwrap();
      toast.success('Lesson added successfully');
      setShowAddForm(false);
      setNewLesson({ title: '', videoUrl: '', content: '', order: lessons.length + 2 });
    } catch (error: any) {
      toast.error(error || 'Failed to add lesson');
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await dispatch(deleteLesson(id)).unwrap();
        toast.success('Lesson deleted');
      } catch (error: any) {
        toast.error(error || 'Failed to delete lesson');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Course Curriculum</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition-all border border-indigo-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Lesson</span>
        </button>
      </div>

      <div className="space-y-3">
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <div 
              key={lesson.id}
              className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="text-slate-300 group-hover:text-indigo-300 transition-colors cursor-grab">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="h-10 w-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-0.5">{lesson.title}</h3>
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center space-x-1">
                      <Video className="h-3 w-3" />
                      <span>Video</span>
                    </span>
                    {lesson.content && (
                      <span className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>Resources</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-bold">No lessons yet. Start building your curriculum!</p>
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Add New Lesson</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleAddLesson} className="space-y-6">
              <div className="group">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block group-focus-within:text-indigo-600 transition-colors">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="e.g. Introduction to React"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-bold outline-none"
                />
              </div>

              <div className="group">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block group-focus-within:text-indigo-600 transition-colors">Video URL</label>
                <input
                  type="url"
                  required
                  value={newLesson.videoUrl}
                  onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium outline-none"
                />
              </div>

              <div className="group">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block group-focus-within:text-indigo-600 transition-colors">Optional Description</label>
                <textarea
                  value={newLesson.content}
                  onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                  rows={3}
                  placeholder="What will students learn in this video?"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95"
                >
                  Add to Curriculum
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
