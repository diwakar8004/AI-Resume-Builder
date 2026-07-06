'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Home, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0F0F2D 50%, #0A0A18 100%)' }}
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full px-6 py-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-xl text-white font-['Outfit']">
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </Link>
      </header>

      {/* Hero section */}
      <main className="max-w-md mx-auto px-6 py-20 text-center relative z-10 flex-1 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)' }}>
          <span className="text-3xl font-black text-indigo-400">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 font-['Outfit']">
          Page Not Found
        </h1>
        <p className="text-white/50 text-xs md:text-sm mb-8 leading-relaxed">
          The page you are looking for might have been moved, deleted, or is temporarily under construction.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
          >
            <Home className="w-3.5 h-3.5" />
            Go to Home
          </Link>
          <Link
            href="/help"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white/70 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Visit Help Center
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-[11px] text-white/20 relative z-10">
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </footer>
    </div>
  );
}
