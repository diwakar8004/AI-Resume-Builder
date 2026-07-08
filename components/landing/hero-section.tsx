'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

const floatingBadges = [
  { icon: '🎯', text: 'ATS Optimized', color: '#10B981', x: '5%', y: '25%', delay: '0s' },
  { icon: '⚡', text: 'AI-Powered', color: '#4F46E5', x: '80%', y: '20%', delay: '1.5s' },
  { icon: '📄', text: 'PDF Export', color: '#7C3AED', x: '75%', y: '70%', delay: '0.8s' },
  { icon: '✨', text: '30+ Templates', color: '#F59E0B', x: '8%', y: '65%', delay: '2s' },
];

const stats = [
  { value: '2M+', label: 'Resumes Created' },
  { value: '94%', label: 'Interview Rate' },
  { value: '30+', label: 'Templates' },
  { value: '4.9★', label: 'User Rating' },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0F0F2D 40%, #0A0A18 100%)' }}
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #4F46E5, transparent)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #7C3AED, transparent)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(circle, #10B981, transparent)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '4s',
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating badges - only show on larger screens */}
      {floatingBadges.map((badge, i) => (
        <div
          key={i}
          className="absolute hidden 2xl:flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white border border-white/10 backdrop-blur-sm"
          style={{
            left: badge.x,
            top: badge.y,
            background: `${badge.color}22`,
            borderColor: `${badge.color}40`,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: badge.delay,
            boxShadow: `0 4px 20px ${badge.color}30`,
          }}
        >
          <span className="text-base">{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-6 sm:mb-8">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">AI-Powered Resume Builder — 2025</span>
          <span className="sm:hidden">AI Resume Builder — 2025</span>
          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-4 sm:mb-6"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Build Resumes That{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818CF8, #A78BFA, #34D399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Get You Hired
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          AI writes your bullet points. 30+ ATS-optimized templates make you stand out.
          One-click PDF export gets you into interviews faster.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              boxShadow: '0 8px 32px rgba(79,70,229,0.4)',
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Building Free
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#templates"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white/80 rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
          >
            View Templates
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex -space-x-2">
            {[
              'bg-gradient-to-br from-pink-400 to-rose-500',
              'bg-gradient-to-br from-violet-400 to-indigo-500',
              'bg-gradient-to-br from-emerald-400 to-teal-500',
              'bg-gradient-to-br from-amber-400 to-orange-500',
              'bg-gradient-to-br from-sky-400 to-blue-500',
            ].map((cls, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${cls} border-2 border-[#0A0A18] flex items-center justify-center text-white text-xs font-bold`}
              >
                {['A', 'B', 'C', 'D', 'E'][i]}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-white/50">Trusted by 2M+ job seekers</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-black text-white mb-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/40 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A18, transparent)',
        }}
      />
    </section>
  );
}
