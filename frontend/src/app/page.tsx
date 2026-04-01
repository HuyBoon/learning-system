import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowRight, PlayCircle, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold mb-6 animate-fade-in">
                  <Star className="h-4 w-4 fill-indigo-600" />
                  <span>The #1 Learning Management Platform</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
                  Master New Skills with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Expert-Led</span> Courses.
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
                  Join 10,000+ students learning world-class skills from industry leaders. Start your journey today with our curated curriculum.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/courses"
                    className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <span>Browse Courses</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-bold text-lg text-slate-700 hover:bg-slate-100 transition-all border border-slate-200">
                    <PlayCircle className="h-6 w-6 text-indigo-600" />
                    <span>Watch Demo</span>
                  </button>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 border-t border-slate-100 pt-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200"></div>
                       ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-bold text-slate-900">10k+ Students</div>
                      <div className="text-slate-500">Joined this week</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                    <span className="font-bold text-slate-900">4.9/5</span>
                    <span className="text-slate-500">(2k+ reviews)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 mt-16 lg:mt-0 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                   {/* Placeholder for Hero Image */}
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center overflow-hidden">
                      <div className="relative animate-pulse">
                         <div className="w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                         <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-600 rounded-[2rem] rotate-12 opacity-80 shadow-lg shadow-indigo-200"></div>
                         <div className="absolute bottom-10 right-10 w-40 h-40 bg-violet-600 rounded-[2rem] -rotate-6 opacity-80 shadow-lg shadow-violet-200"></div>
                         <Users className="absolute inset-0 m-auto h-32 w-32 text-indigo-600 opacity-20" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
