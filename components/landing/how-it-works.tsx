'use client';

import { Upload, Sparkles, Download, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Import or Start Fresh',
    description:
      'Upload your existing resume PDF to auto-parse all your data, or start from scratch with a blank template.',
    color: '#4F46E5',
    detail: 'Supports PDF, DOCX, and LinkedIn profile imports',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Let AI Enhance Your Content',
    description:
      'Our AI rewrites your bullet points into powerful, quantified achievements and generates a compelling professional summary.',
    color: '#7C3AED',
    detail: 'Powered by GPT-4 with job-description matching',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Choose Your Template',
    description:
      'Pick from 30+ ATS-optimized templates designed for your industry. Customize colors, fonts, and layout instantly.',
    color: '#10B981',
    detail: 'All templates pass major ATS systems',
  },
  {
    number: '04',
    icon: Download,
    title: 'Export & Apply',
    description:
      'Download pixel-perfect PDF or DOCX. Your resume is ready to submit — and your ATS score is shown upfront.',
    color: '#F59E0B',
    detail: 'One-click export in under 3 seconds',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F46E5, #7C3AED)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 mb-6">
            <Rocket className="w-3.5 h-3.5" />
            <span>From Zero to Interview-Ready in Minutes</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            How It{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #34D399, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Works
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Four simple steps to a resume that gets you interviews.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-12 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px hidden lg:block"
            style={{
              background:
                'linear-gradient(to right, #4F46E5, #7C3AED, #10B981, #F59E0B)',
              opacity: 0.3,
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center group">
                  {/* Number circle */}
                  <div className="relative inline-flex mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto relative z-10 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                        border: `1px solid ${step.color}40`,
                        boxShadow: `0 8px 32px ${step.color}20`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    {/* Step number */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white z-20"
                      style={{ background: step.color }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      color: step.color,
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}25`,
                    }}
                  >
                    {step.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
