'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses, fetchCategories } from '@/store/slices/courseSlice';
import Navbar from '@/components/layout/Navbar';
import PublicCourseCard from '@/components/courses/PublicCourseCard';
import { Search, Filter, BookOpen, AlertCircle, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CatalogContent() {
  const dispatch = useAppDispatch();
  const { courses, categories, loading, error } = useAppSelector((state) => state.courses);
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(fetchCourses({ 
      categoryId: selectedCategory || undefined, 
      search: debouncedSearch || undefined 
    }));
  }, [dispatch, selectedCategory, debouncedSearch]);

  const filteredCourses = courses; // Backend now handles filtering

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <header className="mb-12">
           <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Course Catalog</h1>
           <p className="text-slate-500 font-medium text-lg">Invest in your career with world-class education from elite instructors.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar: Filters */}
          <aside className="lg:col-span-3 space-y-8">
            <div>
              <div className="flex items-center space-x-2 text-slate-900 font-black uppercase tracking-widest text-xs mb-6">
                <Filter className="h-4 w-4" />
                <span>Filter by Category</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold transition-all ${
                    selectedCategory === null ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>All Courses</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${selectedCategory === null ? 'rotate-90' : ''}`} />
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold transition-all ${
                      selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${selectedCategory === cat.id ? 'rotate-90' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main: Course Grid */}
          <section className="lg:col-span-9">
            {/* Search Top Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, skills, or instructors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-12 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 4, 5].map((i) => (
                  <div key={i} className="bg-white rounded-[2rem] h-[400px] animate-pulse border border-slate-100 shadow-sm"></div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 flex items-center space-x-4 text-red-600 shadow-sm">
                 <AlertCircle className="h-8 w-8" />
                 <span className="font-bold text-lg">{error}</span>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {filteredCourses.map((course, index) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <PublicCourseCard course={course} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 p-20 text-center flex flex-col items-center justify-center">
                <div className="bg-slate-50 p-8 rounded-full mb-8">
                   <BookOpen className="h-16 w-16 text-slate-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">No courses found</h3>
                <p className="text-slate-500 max-w-sm mb-8 font-medium text-lg leading-relaxed">
                   Try adjusting your search terms or exploring a different category.
                </p>
                <button 
                  onClick={() => { setSearch(''); setSelectedCategory(null); }}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                >
                  Browse all courses
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function CourseCatalogPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full shadow-lg shadow-indigo-100"></div>
       </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
