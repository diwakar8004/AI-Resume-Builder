'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const perks = [
  'Free forever plan — no credit card needed',
  'AI bullet point generator included',
  '5 templates free, 30+ with Pro',
  'Export PDF in one click',
];

export function CTASection() {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79,70,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Join 2,000,000+ job seekers who chose ResumeAI</span>
        </div>

        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Your Dream Job Starts{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818CF8, #A78BFA, #34D399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            With One Resume
          </span>
        </h2>

        <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop spending hours on formatting and start getting interviews. Our AI handles the hard
          part — you just fill in the details.
        </p>

        {/* Perks list */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12">
          {perks.map((perk, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              {perk}
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              boxShadow: '0 8px 32px rgba(79,70,229,0.45)',
            }}
          >
            <Sparkles className="w-5 h-5" />
            Build My Resume — It&apos;s Free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/70 rounded-2xl border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            Already have an account? Sign in
          </Link>
        </div>

        {/* Fine print */}
        <p className="text-xs text-white/25 mt-8">
          No credit card required · Cancel anytime · GDPR compliant
        </p>
      </div>
    </section>
  );
}
