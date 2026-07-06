'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Crown } from 'lucide-react';
import { TEMPLATE_META, type TemplateId } from '@/types/resume';

const categories = ['All', 'Popular', 'Tech', 'Business', 'Creative', 'Academic', 'Premium'];

const templateColors: Record<string, { bg: string; accent: string; sidebar?: string }> = {
  modern: { bg: '#1a2744', accent: '#4F46E5', sidebar: '#4F46E5' },
  minimal: { bg: '#fafafa', accent: '#111827' },
  professional: { bg: '#fff', accent: '#1e3a5f' },
  'ats-friendly': { bg: '#fff', accent: '#374151' },
  executive: { bg: '#0f172a', accent: '#3B82F6' },
  corporate: { bg: '#f8fafc', accent: '#1e40af' },
  creative: { bg: '#18181b', accent: '#F59E0B' },
  designer: { bg: '#111827', accent: '#EC4899' },
  'software-engineer': { bg: '#0d1117', accent: '#10B981', sidebar: '#161b22' },
  'data-scientist': { bg: '#0a0e27', accent: '#06B6D4' },
  'product-manager': { bg: '#faf5ff', accent: '#7C3AED' },
  student: { bg: '#f0fdf4', accent: '#16a34a' },
  fresher: { bg: '#eff6ff', accent: '#2563EB' },
  'academic-cv': { bg: '#fff', accent: '#7c3aed' },
  'research-cv': { bg: '#fff8f0', accent: '#ea580c' },
  medical: { bg: '#f0fdfa', accent: '#0d9488' },
  finance: { bg: '#f8fafc', accent: '#1e3a5f' },
  marketing: { bg: '#fff7ed', accent: '#ea580c' },
  legal: { bg: '#f9fafb', accent: '#374151' },
  elegant: { bg: '#fafaf8', accent: '#92400e' },
  timeline: { bg: '#0f172a', accent: '#818CF8' },
  'two-column': { bg: '#fff', accent: '#4F46E5', sidebar: '#f3f4f6' },
  'single-column': { bg: '#fff', accent: '#111827' },
  european: { bg: '#fff', accent: '#003399' },
  startup: { bg: '#18181b', accent: '#22c55e' },
  'premium-dark': { bg: '#09090b', accent: '#a78bfa' },
  'minimal-bw': { bg: '#fff', accent: '#000' },
};

function TemplateCard({ id }: { id: TemplateId }) {
  const meta = TEMPLATE_META[id];
  const colors = templateColors[id] || { bg: '#f3f4f6', accent: '#4F46E5' };
  const isDark = colors.bg.startsWith('#0') || colors.bg.startsWith('#1') || colors.bg === '#18181b' || colors.bg === '#09090b';

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
      {/* Template thumbnail preview */}
      <div
        className="relative h-52 overflow-hidden"
        style={{ background: colors.bg }}
      >
        {/* Mini resume layout preview */}
        <div className="absolute inset-0 p-3 scale-90 origin-top-left" style={{ width: '111%' }}>
          {/* Header bar */}
          <div
            className="h-10 rounded mb-2 flex items-center px-3 gap-2"
            style={{
              background: colors.sidebar || colors.accent,
              opacity: isDark ? 1 : 0.9,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-white/30" />
            <div className="space-y-1 flex-1">
              <div className="h-2 bg-white/60 rounded w-24" />
              <div className="h-1.5 bg-white/30 rounded w-16" />
            </div>
          </div>
          {/* Body lines */}
          <div className="flex gap-2">
            {colors.sidebar && (
              <div className="w-16 space-y-2">
                <div className="h-1.5 rounded" style={{ background: `${colors.accent}40`, width: '80%' }} />
                <div className="h-1.5 rounded" style={{ background: `${colors.accent}30`, width: '60%' }} />
                <div className="h-12 rounded mt-3" style={{ background: `${colors.accent}15` }} />
                <div className="h-8 rounded" style={{ background: `${colors.accent}10` }} />
              </div>
            )}
            <div className="flex-1 space-y-1.5">
              {[100, 85, 70, 90, 60, 75, 80, 65].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded"
                  style={{
                    width: `${w}%`,
                    background: isDark
                      ? `rgba(255,255,255,${i % 3 === 0 ? 0.25 : 0.1})`
                      : `rgba(0,0,0,${i % 3 === 0 ? 0.2 : 0.08})`,
                  }}
                />
              ))}
              <div className="h-2.5 mt-1 rounded" style={{ width: '50%', background: `${colors.accent}50` }} />
              {[90, 70, 55].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded"
                  style={{
                    width: `${w}%`,
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <Link
              href="/register"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-lg"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
            >
              Use Template
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Premium badge */}
        {meta.isPremium && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30">
            <Crown className="w-3 h-3" />
            Pro
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-3 bg-white/3 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">{meta.name}</h3>
            <p className="text-xs text-white/40 mt-0.5">{meta.category}</p>
          </div>
          {meta.isPremium ? (
            <Lock className="w-3.5 h-3.5 text-white/30" />
          ) : (
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Free
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const allIds = Object.keys(TEMPLATE_META) as TemplateId[];

  const filtered =
    activeCategory === 'All'
      ? allIds
      : allIds.filter((id) => TEMPLATE_META[id].category === activeCategory);

  return (
    <section
      id="templates"
      className="py-24 lg:py-32 relative"
      style={{ background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-purple-300 border border-purple-500/30 bg-purple-500/10 mb-6">
            <Crown className="w-3.5 h-3.5" />
            <span>30+ Designer Templates</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Find Your Perfect{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Template
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Every template is ATS-compatible and designed by professional recruiters and designers.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-white shadow-lg'
                  : 'text-white/50 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
              style={
                activeCategory === cat
                  ? { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((id) => (
            <TemplateCard key={id} id={id} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/register"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              boxShadow: '0 8px 32px rgba(79,70,229,0.4)',
            }}
          >
            Explore All Templates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
