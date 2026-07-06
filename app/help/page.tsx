'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ChevronLeft,
  Search,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: 'How does the AI Resume Builder improve my ATS score?',
    a: 'Our AI scans your experience section and highlights missing keywords matching industry standard job roles. It rewrites bullet points to start with strong action verbs and structure outcomes with quantified metrics, making it easier for applicant tracking systems to parse and rank.',
  },
  {
    q: 'Can I export my resume directly to PDF?',
    a: "Yes! Click the 'Export' button inside the editor. It formats the page perfectly for A4 size and triggers your browser's PDF print system. Set the destination to 'Save as PDF' with headers/footers disabled.",
  },
  {
    q: 'Do you offer a free plan?',
    a: 'Absolutely! The free plan lets you build up to 3 resumes and includes standard templates. Upgrading to Pro unlocks unlimited AI enhancements, cover letter generation, and premium modern templates.',
  },
  {
    q: 'How can I change the styling, margins, or fonts?',
    a: "Inside the editor, click the 'Style' button on the header toolbar. You can select accent colors, standard professional fonts (Inter, Outfit, Playfair), margins (compact, normal, relaxed), and page sizes.",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen pb-20 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0F0F2D 50%, #0A0A18 100%)' }}
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b border-white/5 relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          How can we <span className="text-indigo-400">help you</span>?
        </h1>
        <p className="text-white/50 max-w-lg mx-auto mb-8 text-sm md:text-base">
          Find answers, read templates guides, or contact our support team.
        </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Search FAQs, guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder-white/20 border border-white/10 bg-white/4 focus:outline-none focus:border-indigo-500/40 focus:bg-white/6 transition-all duration-200"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Left 2 Columns: FAQ list */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/5 bg-white/3 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform duration-200', open && 'rotate-180 text-indigo-400')} />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 pt-1 text-xs text-white/60 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredFaqs.length === 0 && (
              <div className="p-8 text-center border border-dashed border-white/5 rounded-2xl">
                <p className="text-white/40 text-sm">No match found. Try another search term.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Cards & Contact form */}
        <div className="space-y-6">
          {/* Support Form */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/3">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Contact Support
            </h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-white/50 mb-1 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-xs text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-white/50 mb-1 uppercase tracking-wider">Message</label>
                <textarea
                  placeholder="Describe your issue in detail..."
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl text-xs text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
