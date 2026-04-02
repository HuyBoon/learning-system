'use client';

import Link from 'next/link';
import { Rocket, Globe, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="bg-blue-600 p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                HUYBOON <span className="text-blue-500">ACADEMY</span>
              </span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-8">
              Empowering the next generation of developers with premium, project-based learning. Master the tech stack of the future.
            </p>
            <div className="flex items-center space-x-4">
              <SocialLink href="#" icon={<Globe className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Globe className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Globe className="h-5 w-5" />} />
              <SocialLink href="mailto:contact@huyboon.tech" icon={<Mail className="h-5 w-5" />} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4">
              <FooterLink href="/courses">All Courses</FooterLink>
              <FooterLink href="/learning-paths">Learning Paths</FooterLink>
              <FooterLink href="/certifications">Certificates</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Academy</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/mentors">Our Mentors</FooterLink>
              <FooterLink href="/success-stories">Success Stories</FooterLink>
              <FooterLink href="/blog">Tech blog</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Links</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://huyboon.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 font-bold hover:text-white transition-colors group"
                >
                  <span>My Portfolio</span>
                  <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <FooterLink href="/support">Support Center</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} HuyBoon Academy. Crafted with ❤️ for modern learners.
          </p>
          <div className="flex items-center space-x-8 text-slate-500 text-sm font-medium">
            <button className="hover:text-blue-500 transition-colors">English (US)</button>
            <button className="hover:text-blue-500 transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-400 font-medium hover:text-blue-400 transition-colors">
        {children}
      </Link>
    </li>
  );
}
