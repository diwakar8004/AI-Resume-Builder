import Link from 'next/link';
import { HomeLink } from '@/components/shared/home-link';
import { Sparkles, ChevronLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'How to Pass the ATS Filter in 2026: The Ultimate Guide',
    excerpt: 'Discover the exact keyword optimization strategies and formatting rules required to get your resume past modern Applicant Tracking Systems.',
    date: 'July 4, 2026',
    readTime: '6 min read',
    category: 'ATS Strategy',
    author: {
      name: 'Sarah Jenkins',
      role: 'Career Coach',
      avatar: 'SJ',
    },
  },
  {
    id: '2',
    title: '15 High-Impact Action Verbs to Power Up Your Experience Bullets',
    excerpt: 'Stop using passive verbs like "assisted" or "responsible for". Learn the power verbs that immediately project leadership and outcomes.',
    date: 'June 28, 2026',
    readTime: '4 min read',
    category: 'Resume Writing',
    author: {
      name: 'David Chen',
      role: 'Recruiter @ Google',
      avatar: 'DC',
    },
  },
  {
    id: '3',
    title: 'Should You Include a Photo on Your Resume? (Country-by-Country Guide)',
    excerpt: 'Photos are standard in European CVs but a red flag in the US and UK. Read our breakdown before you upload a headshot.',
    date: 'June 15, 2026',
    readTime: '5 min read',
    category: 'Career Advice',
    author: {
      name: 'Elena Rostova',
      role: 'Global Talent Lead',
      avatar: 'ER',
    },
  },
];

export default function BlogPage() {
  return (
    <div
      className="min-h-screen pb-20 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0F0F2D 50%, #0A0A18 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b border-white/5 relative z-10">
        <HomeLink className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </HomeLink>
        <HomeLink className="flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </HomeLink>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          ResumeAI <span className="text-indigo-400">Insights</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-sm md:text-base">
          Latest career advice, ATS hacks, and expert resume writing guides to accelerate your job search.
        </p>
      </section>

      {/* Blog Grid */}
      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(circle at 30% 0%, rgba(79,70,229,0.08), transparent 60%)' }} />
              
              <div>
                {/* Category tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] text-white/35 mb-4 border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {post.author.avatar}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white">{post.author.name}</p>
                      <p className="text-[9px] text-white/40">{post.author.role}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors text-white/50">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
