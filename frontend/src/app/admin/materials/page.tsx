'use client';

import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  FileVideo, 
  FileCode, 
  FileImage, 
  Download, 
  MoreVertical, 
  Layers, 
  HardDrive,
  Trash2,
  HardDriveDownload,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockMaterials = [
  { id: 1, name: 'Advanced React Architecture.pdf', type: 'DOCUMENT', size: '2.4 MB', date: '2026-03-15', course: 'Mastering Next.js 14' },
  { id: 2, name: 'Cloud Infrastructure Design.mp4', type: 'VIDEO', size: '156.8 MB', date: '2026-03-20', course: 'AWS Professional' },
  { id: 3, name: 'Database Optimization Scripts.zip', type: 'CODE', size: '450 KB', date: '2026-03-22', course: 'PostgreSQL Deep Dive' },
  { id: 4, name: 'UI components library.fig', type: 'IMAGE', size: '12.2 MB', date: '2026-03-25', course: 'Premium UI/UX Design' },
];

export default function AdminMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <FileVideo className="h-6 w-6 text-rose-500" />;
      case 'CODE': return <FileCode className="h-6 w-6 text-indigo-500" />;
      case 'IMAGE': return <FileImage className="h-6 w-6 text-emerald-500" />;
      default: return <FileText className="h-6 w-6 text-indigo-500" />;
    }
  };

  const currentStorage = 85; // 85% full

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Institutional Assets</h1>
          <p className="text-slate-500 font-bold flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Manage architectural resources, documents, and multimedia assets.</span>
          </p>
        </motion.div>
        
        <button 
          onClick={() => setIsUploading(true)}
          className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200/50 hover:bg-slate-800 transition-all flex items-center space-x-3 active:scale-95 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Upload Archive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Storage Health Sidebar */}
        <div className="lg:col-span-1 space-y-8">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6"
           >
              <div className="flex items-center justify-between">
                 <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <HardDrive className="h-6 w-6" />
                 </div>
                 <span className="text-xs font-black text-slate-400 tracking-widest uppercase">Academy Cloud</span>
              </div>
              <div className="space-y-2">
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-black text-slate-900">42.5<span className="text-sm font-bold text-slate-400"> GB</span></span>
                    <span className="text-xs font-black text-rose-500">85% FULL</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${currentStorage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-indigo-600"
                    />
                 </div>
              </div>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">Consider upgrading your infrastructure to accommodate new high-fidelity architectural content.</p>
           </motion.div>

           <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest ml-4">Categories</h3>
              {[
                { label: 'Documents', count: 124, icon: FileText, color: 'text-indigo-600' },
                { label: 'Visuals', count: 56, icon: FileImage, color: 'text-emerald-600' },
                { label: 'Video Assets', count: 18, icon: FileVideo, color: 'text-rose-600' },
                { label: 'Source Files', count: 89, icon: FileCode, color: 'text-amber-600' },
              ].map((cat) => (
                <button key={cat.label} className="w-full flex items-center justify-between p-4 bg-white border border-slate-50 hover:border-indigo-100 rounded-2xl transition-all group shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
                   <div className="flex items-center space-x-3">
                      <cat.icon className={`h-5 w-5 ${cat.color}`} />
                      <span className="font-bold text-slate-600 group-hover:text-slate-900">{cat.label}</span>
                   </div>
                   <span className="text-xs font-black text-slate-300 group-hover:text-indigo-600">{cat.count}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Assets Explorer */}
        <div className="lg:col-span-3 space-y-6">
           <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Query assets by filename or course..." 
                  className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] font-bold outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 placeholder:text-slate-300 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-8 py-5 bg-white border border-slate-100 rounded-[2.5rem] font-black text-slate-600 flex items-center space-x-3 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                 <Filter className="h-5 w-5" />
                 <span>Parameters</span>
              </button>
           </div>

           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden"
           >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Institutional Asset</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Volume</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Origin Curriculum</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <AnimatePresence>
                      {mockMaterials.map((m, idx) => (
                        <motion.tr 
                          key={m.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-10 py-8">
                             <div className="flex items-center space-x-5">
                                <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-100">
                                   {getIcon(m.type)}
                                </div>
                                <div className="space-y-0.5">
                                   <div className="text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors cursor-pointer">{m.name}</div>
                                   <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Added on {m.date}</div>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-8 font-black text-slate-900">{m.size}</td>
                          <td className="px-8 py-8">
                             <div className="flex items-center space-x-2">
                                <Layers className="h-4 w-4 text-indigo-400" />
                                <span className="font-bold text-slate-600 text-sm">{m.course}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                                   <Download className="h-4 w-4" />
                                </button>
                                <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                                   <Share2 className="h-4 w-4" />
                                </button>
                                <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-100">
                                   <Trash2 className="h-4 w-4" />
                                </button>
                             </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              
              <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center">
                 <button className="flex items-center space-x-3 text-indigo-600 font-black text-sm uppercase tracking-widest hover:text-slate-900 transition-colors">
                    <HardDriveDownload className="h-5 w-5" />
                    <span>Synchronize Asset Inventory</span>
                 </button>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
