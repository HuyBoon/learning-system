'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllUsers } from '@/store/slices/authSlice';
import { 
  Users, Search, Shield, User as UserIcon, 
  CheckCircle2, XCircle, Mail, MoreHorizontal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminStudentsPage() {
  const dispatch = useAppDispatch();
  // Lấy thêm error để hiển thị nếu API tèo
  const { users, loading, usersLoading, error } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    const hasUsers = Array.isArray(users) && users.length > 0;
    if (!loading && !hasUsers && !usersLoading) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, loading, users, usersLoading]);

  // Dùng useMemo để tối ưu hiệu năng và tránh crash nếu users undefined
  const filteredUsers = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    return safeUsers.filter(u => {
      const name = u?.name?.toLowerCase() || '';
      const email = u?.email?.toLowerCase() || '';
      const search = searchTerm.toLowerCase();
      
      const matchesSearch = name.includes(search) || email.includes(search);
      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Tính toán stats an toàn
  const stats = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    return [
      { label: 'Total Users', value: safeUsers.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { label: 'Instructors', value: safeUsers.filter(u => u.role === 'INSTRUCTOR').length, icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50' },
      { label: 'Students', value: safeUsers.filter(u => u.role === 'STUDENT').length, icon: UserIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Admins', value: safeUsers.filter(u => u.role === 'ADMIN').length, icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];
  }, [users]);

  return (
    <div className="space-y-10">
      {/* Thông báo lỗi nếu có */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center font-bold">
          <XCircle className="mr-2 h-5 w-5" />
          Error: {error}
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Academy Directory</h1>
          <p className="text-slate-500 font-bold flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Manage and oversee all members of your educational ecosystem.</span>
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
          >
            <div className={`h-14 w-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900 font-bold outline-none"
          />
        </div>
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-8 py-5 bg-white border border-slate-200 rounded-[2rem] font-black text-slate-600 outline-none cursor-pointer min-w-[200px]"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Administrators</option>
          <option value="INSTRUCTOR">Instructors</option>
          <option value="STUDENT">Students</option>
        </select>
      </div>

      {/* Table Container */}
      <motion.div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
        {usersLoading ? (
          <div className="p-32 flex flex-col items-center justify-center space-y-6">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 border-8 border-indigo-50 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Accessing personnel files...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Privileges</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Engagement</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {filteredUsers.map((u, idx) => (
                    <motion.tr key={u.id || idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center space-x-6">
                          <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl uppercase shadow-lg">
                            {u.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="text-lg font-black text-slate-900 tracking-tight mb-0.5 group-hover:text-indigo-600">
                              {u.name}
                            </div>
                            <div className="flex items-center text-slate-400 text-xs font-bold leading-none">
                              <Mail className="h-3 w-3 mr-1.5" />
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          u.role === 'ADMIN' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          u.role === 'INSTRUCTOR' ? 'bg-violet-50 text-violet-600 border-violet-100' :
                          'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-8">
                        <div className="text-lg font-black text-slate-900 mb-0.5">{u._count?.enrollments || 0} Enrollments</div>
                        <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                           <span>Active Academic</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-32 text-center">
            <XCircle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No members found.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}