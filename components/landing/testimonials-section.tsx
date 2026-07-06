'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    company: 'Google',
    avatar: 'PS',
    color: 'from-violet-500 to-indigo-600',
    rating: 5,
    text: "I landed my Google offer after using ResumeAI. The ATS scorer told me exactly which keywords I was missing, and the AI rewrote my bullet points to be 10x more impactful. Absolute game-changer.",
  },
  {
    name: 'Marcus Chen',
    role: 'Product Manager',
    company: 'Meta',
    avatar: 'MC',
    color: 'from-blue-500 to-cyan-600',
    rating: 5,
    text: "The templates are stunning. I went from zero callbacks to 3 interviews in one week after switching to the Executive template and having AI optimize my content. Worth every penny.",
  },
  {
    name: 'Aisha Johnson',
    role: 'Data Scientist',
    company: 'Netflix',
    avatar: 'AJ',
    color: 'from-pink-500 to-rose-600',
    rating: 5,
    text: "The AI cover letter generator is unreal. It pulled specific details from the job description and matched them to my experience perfectly. My recruiters actually commented on how personalized it felt.",
  },
  {
    name: 'Liam O\'Brien',
    role: 'UX Designer',
    company: 'Figma',
    avatar: 'LO',
    color: 'from-emerald-500 to-teal-600',
    rating: 5,
    text: "As a designer, I was skeptical — but the Designer template is genuinely beautiful and ATS-compatible. The PDF export is pixel-perfect. I\'ve recommended this to my entire network.",
  },
  {
    name: 'Sofia Ramirez',
    role: 'Finance Analyst',
    company: 'Goldman Sachs',
    avatar: 'SR',
    color: 'from-amber-500 to-orange-600',
    rating: 5,
    text: "The Finance template is exactly what Wall Street expects. Conservative, professional, impeccable formatting. I got 4 superday invitations using this tool. Couldn\'t be happier.",
  },
  {
    name: 'James Park',
    role: 'Backend Engineer',
    company: 'Stripe',
    avatar: 'JP',
    color: 'from-purple-500 to-violet-600',
    rating: 5,
    text: "The Software Engineer template with the code-inspired design actually got mentioned by my interviewer! It stood out in a stack of boring resumes. The AI bullet rewriter transformed my experience section.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 mb-6">
            <Star className="w-3.5 h-3.5 fill-emerald-300" />
            <span>2M+ Success Stories</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            People Who Got{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #34D399, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Hired
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Join millions of professionals who landed their dream jobs with ResumeAI.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
              }}
            >
              {/* Subtle background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top left, rgba(79,70,229,0.08), transparent 60%)',
                }}
              />

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-white/8 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-white/65 leading-relaxed mb-5 relative">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3 relative">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
