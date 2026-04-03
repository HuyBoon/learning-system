'use client';

import { useState, useEffect } from 'react';
import { Lesson, LessonType } from '@/types/course';
import { X, Type, Video, FileText, Save, Plus, Trash2, Paperclip, FileJson, FileCode, FileImage, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '../common/RichTextEditor';
import { useAppDispatch } from '@/store/hooks';
import { uploadMaterial, deleteMaterial } from '@/store/slices/courseSlice';
import toast from 'react-hot-toast';

interface LessonFormProps {
  lesson?: Lesson | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

export default function LessonForm({ lesson, onSave, onCancel, isOpen }: LessonFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    content: '',
    type: LessonType.VIDEO,
  });
  const [loading, setLoading] = useState(false);
  const [uploadingMaterial, setUploadingMaterial] = useState(false);

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        videoUrl: lesson.videoUrl || '',
        content: lesson.content || '',
        type: lesson.type || LessonType.VIDEO,
      });
    } else {
      setFormData({ title: '', videoUrl: '', content: '', type: LessonType.VIDEO });
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !lesson) return;

    setUploadingMaterial(true);
    const toastId = toast.loading('Uploading resource...');
    try {
      await dispatch(uploadMaterial({ 
        lessonId: lesson.id, 
        file, 
        title: file.name 
      })).unwrap();
      toast.success('Resource added', { id: toastId });
    } catch (error: any) {
      toast.error(error || 'Upload failed', { id: toastId });
    } finally {
      setUploadingMaterial(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    const toastId = toast.loading('Removing resource...');
    try {
      await dispatch(deleteMaterial(id)).unwrap();
      toast.success('Resource removed', { id: toastId });
    } catch (error: any) {
      toast.error(error || 'Failed to remove', { id: toastId });
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-4 w-4 text-red-500" />;
      case 'IMAGE': return <FileImage className="h-4 w-4 text-blue-500" />;
      case 'CODE': return <FileCode className="h-4 w-4 text-green-500" />;
      case 'ZIP': return <FileJson className="h-4 w-4 text-amber-500" />;
      default: return <File className="h-4 w-4 text-slate-400" />;
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
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:left-1/2 md:-translate-x-1/2 md:w-[700px] bg-white rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {lesson ? 'Edit Lesson' : 'Add New Lesson'}
                </h3>
                <p className="text-slate-500 font-medium">Configure your lesson content and resources</p>
              </div>
              <button
                onClick={onCancel}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <form onSubmit={handleSubmit} id="lesson-form" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Lesson Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: LessonType.VIDEO, label: 'Video', icon: Video },
                        { id: LessonType.ARTICLE, label: 'Article', icon: FileText },
                        { id: LessonType.MIXED, label: 'Mixed', icon: Plus },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.id })}
                          className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all font-bold ${
                            formData.type === type.id 
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                              : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          <type.icon className="h-5 w-5" />
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(formData.type === LessonType.VIDEO || formData.type === LessonType.MIXED) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Video URL</label>
                    <div className="relative">
                      <Video className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 font-medium outline-none"
                        required={formData.type === LessonType.VIDEO}
                      />
                    </div>
                  </motion.div>
                )}

                {(formData.type === LessonType.ARTICLE || formData.type === LessonType.MIXED) && (
                  <div>
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-3 px-1">Lesson Content</label>
                    <RichTextEditor 
                      lessonId={lesson?.id}
                      content={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      placeholder="Write your article content here..."
                    />
                  </div>
                )}

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-wider">Materials & Resources</label>
                    {lesson && (
                      <div className="relative">
                        <input
                          type="file"
                          id="material-upload"
                          className="hidden"
                          onChange={handleFileUpload}
                          disabled={uploadingMaterial}
                        />
                        <label
                          htmlFor="material-upload"
                          className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm cursor-pointer hover:bg-indigo-100 transition-all"
                        >
                          <Paperclip className="h-4 w-4" />
                          <span>{uploadingMaterial ? 'Uploading...' : 'Add Resource'}</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {!lesson ? (
                    <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                      <p className="text-sm text-slate-500 font-medium">Save the lesson first to attach materials (PDFs, ZIPs, etc.)</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {lesson.materials && lesson.materials.length > 0 ? (
                        lesson.materials.map((m) => (
                          <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group border border-transparent hover:border-slate-200 transition-all">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                {getFileIcon(m.fileType)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{m.title}</p>
                                <p className="text-xs text-slate-400 font-medium">{(m.size / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteMaterial(m.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400 font-medium text-center py-4 italic">No resources attached yet</p>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center space-x-4 flex-shrink-0">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="lesson-form"
                disabled={loading}
                className="flex-2 flex items-center justify-center space-x-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 px-12 disabled:opacity-50 disabled:shadow-none"
              >
                <Save className="h-5 w-5" />
                <span>{loading ? 'Saving...' : (lesson ? 'Update Lesson' : 'Add Lesson')}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

