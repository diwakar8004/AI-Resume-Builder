'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const posts = [
  {
    tag: 'Resume Tips',
    tagColor: '#4F46E5',
    readTime: '5 min read',
    title: 'The 10 Resume Mistakes That Cost You Interviews in 2025',
    excerpt:
      'From generic objectives to missing keywords, we break down the most common resume errors ATS systems and recruiters hate — and how to fix them instantly.',
    author: { initials: 'AK', name: 'Ananya Kumar', role: 'Career Coach', bg: 'from-violet-400 to-indigo-500' },
  },
  {
    tag: 'AI Writing',
    tagColor: '#10B981',
    readTime: '7 min read',
    title: 'How to Use AI to Write Bullet Points That Actually Get Callbacks',
    excerpt:
      'Generic duties are out. Quantified AI-written achievements are in. Here\'s our proven framework for turning boring job descriptions into compelling accomplishments.',
    author: { initials: 'RM', name: 'Raj Mehta', role: 'Senior Recruiter @ Google', bg: 'from-emerald-400 to-teal-500' },
  },
  {
    tag: 'ATS Guide',
    tagColor: '#F59E0B',
    readTime: '6 min read',
    title: 'ATS Explained: How to Beat Applicant Tracking Systems in 2025',
    excerpt:
      'Over 98% of Fortune 500 companies use ATS to filter candidates. Learn exactly how these systems score your resume and what changes give you the biggest boost.',
    author: { initials: 'SP', name: 'Sakura Park', role: 'HR Director @ Amazon', bg: 'from-amber-400 to-orange-500' },
  },
];

export function BlogSection() {
  return (
    <section
      id="blog"
      className="py-24 lg:py-32 relative"
      style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-sky-300 border border-sky-500/30 bg-sky-500/10 mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>Career Resources</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Resume Tips &amp;{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #38BDF8, #818CF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Insights
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group flex-shrink-0"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={i}
              className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}
            >
              {/* Hover accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                style={{ background: `linear-gradient(to right, ${post.tagColor}, transparent)` }}
              />

              {/* Tag + read time */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: post.tagColor, background: `${post.tagColor}18`, border: `1px solid ${post.tagColor}30` }}
                >
                  {post.tag}
                </span>
                <div className="flex items-center gap-1 text-xs text-white/35">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-indigo-300 transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.author.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{post.author.name}</p>
                  <p className="text-xs text-white/35">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
