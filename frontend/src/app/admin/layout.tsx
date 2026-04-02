'use client';

import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'ADMIN' && user?.role !== 'INSTRUCTOR')) {
      // Allow INSTRUCTOR for now as they also manage courses
      router.push('/');
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || (user?.role !== 'ADMIN' && user?.role !== 'INSTRUCTOR')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </div>
  );
}
