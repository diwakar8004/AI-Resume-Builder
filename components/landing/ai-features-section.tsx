'use client';

import { useState } from 'react';
import { Sparkles, Target, RefreshCw, FileText, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';

const aiFeatures = [
  {
    id: 'summary',
    icon: Sparkles,
    title: 'AI Summary Generator',
    subtitle: 'Write a compelling professional summary in seconds',
    color: '#4F46E5',
    demo: {
      input: 'Software Engineer with 5 years experience in React and Node.js',
      output:
        'Results-driven Software Engineer with 5+ years of expertise in building scalable web applications using React.js and Node.js. Proven track record of reducing page load times by 40% and leading cross-functional teams to ship features 30% faster. Passionate about clean code, user experience, and mentoring junior developers.',
    },
  },
  {
    id: 'ats',
    icon: Target,
    title: 'ATS Score Analyzer',
    subtitle: 'See exactly why recruiters pass on your resume',
    color: '#10B981',
    demo: {
      score: 87,
      breakdown: [
        { label: 'Keywords', score: 92 },
        { label: 'Formatting', score: 88 },
        { label: 'Completeness', score: 85 },
        { label: 'Readability', score: 83 },
      ],
      tips: ['Add "TypeScript" to skills', 'Quantify 2 more achievements', 'Add LinkedIn URL'],
    },
  },
  {
    id: 'rewrite',
    icon: RefreshCw,
    title: 'Bullet Point Rewriter',
    subtitle: 'Transform weak bullets into impact statements',
    color: '#7C3AED',
    demo: {
      before: 'Worked on the team to help improve website performance',
      after:
        'Led cross-functional optimization initiative reducing page load time by 47%, improving Core Web Vitals scores and increasing user engagement by 23%',
    },
  },
  {
    id: 'cover',
    icon: FileText,
    title: 'Cover Letter AI',
    subtitle: 'Generate personalized cover letters for any job',
    color: '#F59E0B',
    demo: {
      lines: [
        "Dear Hiring Manager,",
        "I'm excited to apply for the Senior Frontend Engineer role at Stripe...",
        "With 5+ years architecting React applications that serve millions of users, I've consistently...",
        "My experience reducing bundle size by 60% at my current role directly aligns with...",
        "I'd love to bring this expertise to Stripe's world-class engineering team.",
      ],
    },
  },
];

function SummaryDemo({ demo }: { demo: { input: string; output: string } }) {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-white/5 border border-white/8">
        <p className="text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">Your Input</p>
        <p className="text-sm text-white/60">{demo.input}</p>
      </div>
      <div className="flex justify-center">
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 rotate-90" />
        </div>
      </div>
      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
        <p className="text-xs text-indigo-400 mb-1.5 font-medium uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> AI Output
        </p>
        <p className="text-sm text-white/80 leading-relaxed">{demo.output}</p>
      </div>
    </div>
  );
}

function ATSDemo({ demo }: { demo: { score: number; breakdown: { label: string; score: number }[]; tips: string[] } }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-black text-white">{demo.score}<span className="text-lg text-white/40">/100</span></p>
          <p className="text-sm text-emerald-400 font-medium mt-0.5">ATS Score — Good</p>
        </div>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black text-white"
          style={{
            background: `conic-gradient(#10B981 ${demo.score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
          }}
        >
          <div className="w-12 h-12 rounded-full bg-[#12121f] flex items-center justify-center text-xs font-bold text-white">
            {demo.score}%
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {demo.breakdown.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs text-white/50 w-20">{item.label}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.score}%`, background: '#10B981' }}
              />
            </div>
            <span className="text-xs text-white/60 w-8 text-right">{item.score}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {demo.tips.map((tip) => (
          <div key={tip} className="flex items-start gap-2 text-xs text-white/60">
            <Lightbulb className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}

function RewriteDemo({ demo }: { demo: { before: string; after: string } }) {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
        <p className="text-xs text-red-400 mb-1.5 font-medium uppercase tracking-wider">❌ Before</p>
        <p className="text-sm text-white/60 line-through">{demo.before}</p>
      </div>
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <p className="text-xs text-emerald-400 mb-1.5 font-medium uppercase tracking-wider">✅ After</p>
        <p className="text-sm text-white/80 leading-relaxed">{demo.after}</p>
      </div>
    </div>
  );
}

function CoverLetterDemo({ demo }: { demo: { lines: string[] } }) {
  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
      {demo.lines.map((line, i) => (
        <p key={i} className={`text-sm leading-relaxed ${i === 0 ? 'text-white/80 font-semibold' : 'text-white/55'}`}>
          {line}
        </p>
      ))}
      <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: '70%' }} />
      </div>
      <p className="text-xs text-amber-400">Generating...</p>
    </div>
  );
}

export function AIFeaturesSection() {
  const [active, setActive] = useState('summary');
  const activeFeature = aiFeatures.find((f) => f.id === active)!;

  return (
    <section
      id="ai-tools"
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by GPT-4</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Your Personal AI{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #818CF8, #34D399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Career Coach
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Let AI do the heavy lifting. Generate, optimize, and perfect every word of your resume.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Feature tabs */}
          <div className="space-y-3">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              const isActive = active === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActive(feature.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'border-white/10 shadow-lg'
                      : 'border-white/5 hover:border-white/10 hover:bg-white/3'
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${feature.color}18, ${feature.color}08)`,
                          borderColor: `${feature.color}30`,
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive ? `${feature.color}20` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isActive ? feature.color + '30' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? feature.color : 'rgba(255,255,255,0.4)' }} />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/60'}`}>
                        {feature.title}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5">{feature.subtitle}</p>
                    </div>
                    {isActive && (
                      <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: feature.color }} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Demo panel */}
          <div
            className="rounded-2xl border p-6"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
              borderColor: `${activeFeature.color}25`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${activeFeature.color}20` }}
              >
                <activeFeature.icon className="w-4 h-4" style={{ color: activeFeature.color }} />
              </div>
              <h3 className="font-bold text-white text-sm">{activeFeature.title}</h3>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium text-white/50 bg-white/5">
                Live Demo
              </span>
            </div>

            {active === 'summary' && <SummaryDemo demo={(activeFeature as typeof aiFeatures[0]).demo as { input: string; output: string }} />}
            {active === 'ats' && <ATSDemo demo={(activeFeature as typeof aiFeatures[1]).demo as { score: number; breakdown: { label: string; score: number }[]; tips: string[] }} />}
            {active === 'rewrite' && <RewriteDemo demo={(activeFeature as typeof aiFeatures[2]).demo as { before: string; after: string }} />}
            {active === 'cover' && <CoverLetterDemo demo={(activeFeature as typeof aiFeatures[3]).demo as { lines: string[] }} />}
          </div>
        </div>
      </div>
    </section>
  );
}
