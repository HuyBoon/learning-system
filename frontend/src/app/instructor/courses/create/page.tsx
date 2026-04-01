'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createCourse, fetchCategories } from '@/store/slices/courseSlice';
import Navbar from '@/components/layout/Navbar';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Type, 
  FileText, 
  Tag, 
  DollarSign, 
  Image as ImageIcon,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CreateCourseWizard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.courses);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    price: '',
    thumbnail: '',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createCourse({
        ...formData,
        price: Number(formData.price),
      }));
      
      if (createCourse.fulfilled.match(resultAction)) {
        toast.success('Course created successfully!');
        router.push(`/instructor/courses/edit?id=${resultAction.payload.id}`);
      } else {
        toast.error(resultAction.payload as string || 'Failed to create course');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  const steps = [
    { id: 1, title: 'Basics', icon: Type },
    { id: 2, title: 'Details', icon: DollarSign },
    { id: 3, title: 'Launch', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    step >= s.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {step > s.id ? <Check className="h-6 w-6" /> : <s.icon className="h-6 w-6" />}
                </div>
                <span className={`text-xs font-bold mt-2 ${step >= s.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <form onSubmit={(e) => e.preventDefault()} className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Course Title</label>
                      <div className="relative">
                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Advanced Next.js Development"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Description</label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          placeholder="What will students learn in this course?"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none resize-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Category</label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <select
                          name="categoryId"
                          value={formData.categoryId}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none appearance-none"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Course Price ($)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Thumbnail URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="url"
                          name="thumbnail"
                          value={formData.thumbnail}
                          onChange={handleChange}
                          placeholder="https://images.unsplash.com/your-image-url"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 font-medium outline-none"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500 italic">Pro-tip: Use an Unsplash URL for high-quality placeholder images.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 text-center"
                >
                  <div className="bg-indigo-50 p-10 rounded-[2rem] border border-indigo-100 mb-8">
                    <Rocket className="h-20 w-20 text-indigo-600 mx-auto mb-6" />
                    <h3 className="text-3xl font-black text-slate-900 mb-3">Ready to Launch!</h3>
                    <p className="text-slate-600 font-medium text-lg leading-relaxed">
                      You are about to create your course. You will be redirected to the curriculum editor to add lessons next.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-left p-6 bg-slate-50 rounded-2xl border border-slate-100">
                     <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Title</div>
                        <div className="font-bold text-slate-900 truncate">{formData.title}</div>
                     </div>
                     <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Price</div>
                        <div className="font-bold text-slate-900">${formData.price}</div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-2 text-slate-600 font-bold hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Go Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.title || !formData.description || (step === 1 && !formData.categoryId)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:shadow-none active:scale-95"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 active:scale-95"
                >
                  {loading ? 'Creating...' : 'Launch Course'}
                  <Rocket className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
