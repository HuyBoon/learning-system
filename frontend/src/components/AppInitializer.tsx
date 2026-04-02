"use client"
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProfile, completeInitialization } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { token, user, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but no user, fetch profile
    if (token && !user) {
      dispatch(fetchProfile());
    } 
    // If we have no token, or we already have user and token
    else {
      dispatch(completeInitialization());
    }
  }, [dispatch, token, user]);

  // Show a premium loading screen while initializing to prevent flashing of guest UI
  if (!isInitialized) {
     return (
       <div className="fixed inset-0 z-[100] bg-white dark:bg-[#020617] flex flex-col items-center justify-center p-4">
         <div className="relative">
           <div className="absolute -inset-10 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
           <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-2xl flex flex-col items-center">
             <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
             <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">HuyBoon Academy</h2>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Initializing Secure Session</p>
           </div>
         </div>
       </div>
     );
  }

  return <>{children}</>;
}
