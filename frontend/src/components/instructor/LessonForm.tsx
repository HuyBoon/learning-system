'use client';

import { useState, useEffect } from 'react';
import { Lesson } from '@/types/course';
import { X, Type, Video, FileText, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '../common/RichTextEditor';

interface LessonFormProps {
  lesson?: Lesson | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

export default function LessonForm({ lesson, onSave, onCancel, isOpen }: LessonFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        content: lesson.content || '',
      });
    } else {
      setFormData({ title: '', videoUrl: '', content: '' });
    }
  }, [lesson, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onCancel();
    } catch (error) {
      // Error handled by parent/slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900">
                  {lesson ? 'Edit Lesson' : 'Add New Lesson'}
                </h3>
                <button
                  onClick={onCancel}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Lesson Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Introduction to Hooks"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Video URL</label>
                  <div className="relative">
                    <Video className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-3 px-1">Lesson Content</label>
                  <RichTextEditor 
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder="Provide detailed instructions, code snippets, or upload images directly into this lesson..."
                  />
                </div>

                <div className="pt-4 flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-2 flex items-center justify-center space-x-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 px-8 disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    <span>{loading ? 'Saving...' : (lesson ? 'Update Lesson' : 'Add Lesson')}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
