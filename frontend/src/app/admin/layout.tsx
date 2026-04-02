'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAppSelector } from '@/store/hooks';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const { isSidebarCollapsed } = useAppSelector((state) => state.ui);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user?.role !== 'ADMIN' && user?.role !== 'INSTRUCTOR'))) {
      router.push('/');
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 border-8 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user?.role !== 'ADMIN' && user?.role !== 'INSTRUCTOR')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <Navbar />
      <div className="flex">
        {/* Sidebar Space (Hidden on mobile, static on desktop) */}
        <div className={`hidden lg:block transition-all duration-500 ease-in-out flex-shrink-0 ${isSidebarCollapsed ? 'w-32' : 'w-80'}`} />
        <AdminSidebar />
        
        <main className={`flex-1 w-full transition-all duration-500 ease-in-out pr-6 lg:pr-10 pt-32 pb-20 overflow-x-hidden ${isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-4'}`}>
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
