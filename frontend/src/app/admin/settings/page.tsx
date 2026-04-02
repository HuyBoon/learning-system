'use client';

import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Mail, 
  Key,
  HardDrive,
  Cloud,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('GENERAL');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('System configuration updated successfully');
    }, 1500);
  };

  const tabs = [
    { id: 'GENERAL', label: 'General', icon: Globe },
    { id: 'NOTIFICATIONS', label: 'Notifications', icon: Bell },
    { id: 'SECURITY', label: 'Security', icon: Shield },
    { id: 'DATABASE', label: 'Storage & DB', icon: Database },
    { id: 'APPEARANCE', label: 'Branding', icon: Palette },
  ];

  const SettingToggle = ({ label, description, checked }: any) => (
    <div className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
      <div className="space-y-1">
        <h4 className="font-black text-slate-900 tracking-tight">{label}</h4>
        <p className="text-slate-400 font-bold text-xs">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
        <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 transition-colors"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Institutional Configuration</h1>
          <p className="text-slate-500 font-bold flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Manage core architectural parameters and platform behaviors.</span>
          </p>
        </motion.div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200/50 hover:bg-slate-800 transition-all flex items-center space-x-3 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          <span>Synchronize Config</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:w-80 shrink-0 space-y-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center space-x-4 px-8 py-5 rounded-[2rem] font-black tracking-tight transition-all text-left ${
                 activeTab === tab.id 
                 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                 : 'text-slate-400 hover:text-slate-900 hover:bg-white'
               }`}
             >
               <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-300'}`} />
               <span>{tab.label}</span>
             </button>
           ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/20 space-y-8"
              >
                {activeTab === 'GENERAL' && (
                  <>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-2">Institutional Name</label>
                           <input type="text" defaultValue="HuyBoon Academy" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all" />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-2">Support Email</label>
                           <input type="email" defaultValue="support@huyboon.edu" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all" />
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
                           <Globe className="h-5 w-5 text-indigo-600" />
                           <span>Regional Parameters</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-3xl space-y-4">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">System Language</span>
                              <select className="w-full bg-transparent font-black outline-none appearance-none cursor-pointer">
                                 <option>English (Global)</option>
                                 <option>Vietnamese (Local)</option>
                              </select>
                           </div>
                           <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-3xl space-y-4">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Currency</span>
                              <select className="w-full bg-transparent font-black outline-none appearance-none cursor-pointer">
                                 <option>USD ($)</option>
                                 <option>VND (₫)</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     <div className="pt-8 space-y-4 border-t border-slate-100">
                        <SettingToggle label="Maintenance Mode" description="Prevent all non-admin access while performing updates." checked={false} />
                        <SettingToggle label="Search Engine Visibility" description="Allow curriculum profiles to be indexed by global search engines." checked={true} />
                     </div>
                  </>
                )}

                {activeTab === 'NOTIFICATIONS' && (
                  <div className="space-y-6">
                     <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] flex items-center space-x-6 text-indigo-900">
                        <Mail className="h-10 w-10 shrink-0 opacity-40" />
                        <p className="font-bold">Email notification triggers are currently routing through the <span className="font-black underline">SendGrid</span> infrastructure cluster.</p>
                     </div>
                     <div className="space-y-4">
                        <SettingToggle label="Enrollment Alerts" description="Notify instructors when a student architects a new enrollment." checked={true} />
                        <SettingToggle label="System Health Summaries" description="Weekly institutional analytics sent to administration." checked={false} />
                        <SettingToggle label="User Auth Logs" description="Alert admins of suspicious authentication attempts." checked={true} />
                     </div>
                  </div>
                )}

                {activeTab === 'SECURITY' && (
                  <div className="space-y-8">
                     <div className="p-10 bg-amber-50 border-2 border-amber-100 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 h-full w-2 bg-amber-500" />
                        <div className="flex items-start space-x-6">
                           <AlertTriangle className="h-10 w-10 text-amber-600 shrink-0 animate-bounce" />
                           <div className="space-y-2">
                              <h4 className="text-xl font-black text-amber-900 tracking-tight">Security Audit Required</h4>
                              <p className="text-amber-700 font-bold text-sm">Two-Factor Authentication is currently not enforced for Instructor profiles. This creates a vulnerability in the curriculum architecture cluster.</p>
                              <button className="px-6 py-2 bg-amber-900 text-white rounded-xl font-black text-xs mt-4 hover:bg-slate-900 transition-all">Enforce MFA Globally</button>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                              <Key className="h-5 w-5 text-slate-400" />
                              <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">JWT Invalidation</span>
                           </div>
                           <button className="text-xs font-black text-rose-600">RESET ALL</button>
                        </div>
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                              <HardDrive className="h-5 w-5 text-slate-400" />
                              <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Session Lifetime</span>
                           </div>
                           <span className="text-xs font-black text-slate-900">7 Days</span>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'DATABASE' && (
                   <div className="space-y-10 text-center py-20">
                      <div className="relative h-40 w-40 mx-auto mb-8">
                         <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-ping" />
                         <div className="relative h-40 w-40 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-2xl">
                            <Cloud className="h-16 w-16 text-indigo-600" />
                         </div>
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-3xl font-black text-slate-900 tracking-tight">Infrastructure Cluster 01-HK</h3>
                         <p className="text-slate-400 font-bold max-w-sm mx-auto">Database connection is healthy. Local latency is currently 14ms.</p>
                      </div>
                      <div className="flex items-center justify-center space-x-4">
                         <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm active:scale-95 transition-all">Manual Backup</button>
                         <button className="px-8 py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-sm active:scale-95 transition-all">Vacuum DB</button>
                      </div>
                   </div>
                )}
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
