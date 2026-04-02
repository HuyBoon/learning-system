import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import StoreProvider from "@/components/providers/StoreProvider";
import AppInitializer from "@/components/AppInitializer";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HuyBoon Academy | Master the Future",
  description: "A premium Full-stack Education Platform built by HuyBoon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100">
        <StoreProvider>
          <AppInitializer>
            <Navbar />
            <main className="flex-1 pt-32 pb-20">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" />
          </AppInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}
