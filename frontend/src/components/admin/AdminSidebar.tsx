'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  GraduationCap,
  PlusCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
  { icon: FileText, label: 'Materials', href: '/admin/materials' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <aside className={`fixed left-6 top-32 bottom-6 z-40 transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'w-24' : 'w-72'}`}>
      <div className={`h-full bg-slate-900 shadow-2xl shadow-indigo-500/10 border border-white/10 rounded-[2.5rem] flex flex-col backdrop-blur-xl relative overflow-hidden group ${isSidebarCollapsed ? 'p-4' : 'p-8'}`}>
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-colors duration-700" />
        
        {/* Profile/Brand Section */}
        <div className={`relative ${isSidebarCollapsed ? 'mb-6 text-center' : 'mb-10 text-left'}`}>
          <div className={`flex items-center mb-8 ${isSidebarCollapsed ? 'flex-col space-y-4 items-center' : 'space-x-4'}`}>
            <div className="h-14 w-14 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap className="h-8 w-8" />
            </div>
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h2 className="text-white font-black text-xl tracking-tight">HuyBoon</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Management</p>
              </motion.div>
            )}
          </div>
          
          <Link 
            href="/admin/courses/new"
            className={`flex items-center justify-center bg-white text-slate-900 rounded-2xl font-black transition-all shadow-xl shadow-white/5 active:scale-95 ${isSidebarCollapsed ? 'h-14 w-14 mx-auto' : 'w-full py-4 space-x-2 text-sm'}`}
            title={isSidebarCollapsed ? 'Create Course' : ''}
          >
            <PlusCircle className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Create Course</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 relative">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="relative group block"
                title={isSidebarCollapsed ? item.label : ''}
              >
                <div className={`
                  flex items-center rounded-2xl transition-all duration-300
                  ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  ${isSidebarCollapsed ? 'justify-center h-14 w-14 mx-auto p-0' : 'space-x-4 px-6 py-4'}
                `}>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-indigo-600 rounded-2xl -z-10 shadow-lg shadow-indigo-600/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {!isSidebarCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-bold tracking-tight"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className={`pt-8 border-t border-white/5 mt-auto relative ${isSidebarCollapsed ? 'text-center' : 'text-left'}`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center space-x-3 text-slate-500 mb-4 px-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">System Online</span>
            </div>
          )}
          <button 
            onClick={() => dispatch(toggleSidebar())}
            className={`flex items-center text-slate-400 hover:text-white transition-colors group ${isSidebarCollapsed ? 'justify-center w-full' : 'space-x-2 px-2'}`}
          >
            <ChevronLeft className={`h-5 w-5 transition-transform duration-500 font-bold ${isSidebarCollapsed ? 'rotate-180' : 'group-hover:-translate-x-1'}`} />
            {!isSidebarCollapsed && <span className="text-xs font-bold whitespace-nowrap">Collapse Sidebar</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
