'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories, createCourse, updateCourse } from '@/store/slices/courseSlice';
import { Course } from '@/types/course';
import { courseSchema, type CourseInput } from '@/lib/validation/course';
import { Save, Type, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../common/RichTextEditor';
import CloudinaryUpload from '../common/CloudinaryUpload';

interface CourseFormProps {
  initialData?: Course | null;
  isEditing?: boolean;
}

export default function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      thumbnail: '',
      categoryId: '',
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        price: Number(initialData.price) || 0,
        thumbnail: initialData.thumbnail || '',
        categoryId: initialData.categoryId || '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: CourseInput) => {
    setLoading(true);
    try {
      if (isEditing && initialData) {
        await dispatch(updateCourse({ id: initialData.id, data })).unwrap();
        toast.success('Course variations updated');
      } else {
        const result = await dispatch(createCourse(data)).unwrap();
        toast.success('New course established');
        router.push(`/admin/courses/edit?id=${result.id}`);
        return;
      }
      router.push('/admin/courses');
    } catch (error: any) {
      toast.error(error || 'Operational failure. Check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Section: Content & Core Info */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Type className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Identity & Narrative</h3>
            </div>

            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-indigo-600 transition-colors">
                Course Title
              </label>
              <input
                {...register('title')}
                type="text"
                placeholder="e.g. Theoretical Neural Engineering"
                className={`w-full px-8 py-5 bg-slate-50 border ${errors.title ? 'border-red-200 ring-4 ring-red-50' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold text-lg outline-none placeholder:text-slate-200`}
              />
              {errors.title && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.title.message}</p>}
            </div>

            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-indigo-600 transition-colors">
                The Curriculum Blueprint (Description)
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor 
                    content={field.value || ''} 
                    onChange={field.onChange} 
                    placeholder="Define the learning trajectory..."
                  />
                )}
              />
              {errors.description && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {/* Right Section: Logistics & Media */}
        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-200/20 text-white selection:bg-indigo-500/30">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-indigo-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter">Logistics</h3>
            </div>

            <div className="space-y-8">
              <div className="group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-indigo-400 transition-colors">
                  Sector (Category)
                </label>
                <select
                  {...register('categoryId')}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-white font-bold outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-900 text-slate-400">Select Target Domain</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-slate-900">{cat.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="mt-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">{errors.categoryId.message}</p>}
              </div>

              <div className="group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-indigo-400 transition-colors">
                  Access Valuation (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black">$</span>
                  <input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    className="w-full pl-10 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-white font-black text-xl outline-none"
                  />
                </div>
                {errors.price && <p className="mt-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">{errors.price.message}</p>}
              </div>

              <div className="group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-indigo-400 transition-colors">
                  Visual Representation (Thumbnail)
                </label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <CloudinaryUpload 
                      value={field.value || ''} 
                      onChange={field.onChange} 
                      onRemove={() => field.onChange('')}
                    />
                  )}
                />
                {errors.thumbnail && <p className="mt-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">{errors.thumbnail.message}</p>}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-900/40 hover:bg-white hover:text-indigo-600 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>{isEditing ? 'Sync Changes' : 'Initialize Course'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
