'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories, createCourse, updateCourse } from '@/store/slices/courseSlice';
import { Course } from '@/types/course';
import { Save, X, Image as ImageIcon, Layout, DollarSign, Type, AlignLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CourseFormProps {
  initialData?: Course | null;
  isEditing?: boolean;
}

export default function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    categoryId: '',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: Number(initialData.price) || 0,
        thumbnail: initialData.thumbnail || '',
        categoryId: initialData.categoryId || '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && initialData) {
        await dispatch(updateCourse({ id: initialData.id, data: formData })).unwrap();
        toast.success('Course updated successfully');
      } else {
        await dispatch(createCourse(formData)).unwrap();
        toast.success('Course created successfully');
      }
      router.push('/admin/courses');
    } catch (error: any) {
      toast.error(error || 'Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Essential Info */}
        <div className="space-y-6">
          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-indigo-600 transition-colors">
              <Type className="h-4 w-4" />
              <span>Course Title</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Master React & Next.js"
              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold shadow-sm outline-none placeholder:text-slate-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-indigo-600 transition-colors">
              <AlignLeft className="h-4 w-4" />
              <span>Full Description</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what students will learn..."
              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-medium shadow-sm outline-none placeholder:text-slate-300 resize-none"
            />
          </div>
        </div>

        {/* Right Column: Media & Pricing */}
        <div className="space-y-6">
          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-indigo-600 transition-colors">
              <Layout className="h-4 w-4" />
              <span>Category</span>
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold shadow-sm outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-indigo-600 transition-colors">
              <DollarSign className="h-4 w-4" />
              <span>Pricing (USD)</span>
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full pl-10 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold shadow-sm outline-none"
              />
            </div>
          </div>

          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-indigo-600 transition-colors">
              <ImageIcon className="h-4 w-4" />
              <span>Thumbnail URL</span>
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-medium shadow-sm outline-none placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="pt-8 flex items-center space-x-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold text-lg hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          <span>{isEditing ? 'Save Changes' : 'Create Course'}</span>
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-5 bg-slate-100 text-slate-600 rounded-[1.5rem] font-bold hover:bg-slate-200 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
