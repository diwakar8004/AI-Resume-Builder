'use client';

import { Brain, Zap, FileText, Target, Shield, Download, Palette, Clock } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Content Writer',
    description: 'Generate compelling bullet points, summaries, and cover letters tailored to any job description using GPT-4.',
    color: '#4F46E5',
    gradient: 'from-indigo-500/20 to-indigo-600/5',
  },
  {
    icon: Target,
    title: 'ATS Score & Analysis',
    description: 'Real-time ATS scoring with keyword recommendations to ensure your resume passes automated screeners.',
    color: '#10B981',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    icon: Palette,
    title: '30+ Premium Templates',
    description: 'Designer-crafted templates for every industry — from tech to finance to creative roles. All ATS-compatible.',
    color: '#7C3AED',
    gradient: 'from-violet-500/20 to-violet-600/5',
  },
  {
    icon: Zap,
    title: 'Live Preview',
    description: 'See every change reflected instantly in your resume preview. No refresh, no lag — pure real-time editing.',
    color: '#F59E0B',
    gradient: 'from-amber-500/20 to-amber-600/5',
  },
  {
    icon: Download,
    title: 'PDF & DOCX Export',
    description: 'Pixel-perfect PDF export with custom fonts. Also export to DOCX for maximum compatibility.',
    color: '#EF4444',
    gradient: 'from-rose-500/20 to-rose-600/5',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is encrypted and private. We never share, sell, or use your resume data for training AI.',
    color: '#06B6D4',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
  },
  {
    icon: FileText,
    title: 'Cover Letter Builder',
    description: 'AI-generated cover letters tailored to specific job postings. Professional, personalized, and compelling.',
    color: '#8B5CF6',
    gradient: 'from-purple-500/20 to-purple-600/5',
  },
  {
    icon: Clock,
    title: 'Version History',
    description: 'Never lose your work. Restore any previous version of your resume with one click.',
    color: '#0EA5E9',
    gradient: 'from-sky-500/20 to-sky-600/5',
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 sm:py-24 lg:py-32 relative px-4 sm:px-6"
      style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-violet-300 border border-violet-500/30 bg-violet-500/10 mb-4 sm:mb-6">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Everything You Need to Land the Job</span>
            <span className="sm:hidden">Tools to Land the Job</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-6 leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Tools That Give You an{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #818CF8, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Unfair Advantage
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            From AI writing to ATS optimization, every feature is designed to get your resume in
            front of hiring managers.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 overflow-hidden cursor-default"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${feature.color}10, transparent 60%)`,
                  }}
                />

              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 relative"
                style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
              >
                <Icon className="w-5 h-5 sm:w-5 sm:h-5" style={{ color: feature.color }} />
              </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2 relative">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-white/45 leading-relaxed relative">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
