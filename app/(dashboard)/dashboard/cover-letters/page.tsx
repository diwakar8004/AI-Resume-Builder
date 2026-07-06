'use client';

import { useState } from 'react';
import {
  Plus,
  BookOpen,
  Sparkles,
  Search,
  Clock,
  MoreVertical,
  Edit3,
  Copy,
  Trash2,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mockCoverLetters = [
  {
    id: 'cl-1',
    title: 'Cover Letter — Google Frontend Role',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    updatedAt: '3 hours ago',
    matchScore: 94,
  },
  {
    id: 'cl-2',
    title: 'Cover Letter — Netflix Product Manager',
    company: 'Netflix',
    role: 'Product Manager',
    updatedAt: '2 days ago',
    matchScore: 88,
  },
];

export default function CoverLettersPage() {
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filtered = mockCoverLetters.filter((cl) =>
    cl.title.toLowerCase().includes(search.toLowerCase()) ||
    cl.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Cover Letters
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Generate and manage custom AI cover letters for your applications</p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
        >
          <Plus className="w-4 h-4" />
          Write Cover Letter
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Letters', value: '2', color: '#4F46E5' },
          { label: 'Avg AI Match', value: '91%', color: '#10B981' },
          { label: 'Targeted Companies', value: '2', color: '#F59E0B' },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-white/5"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))' }}
          >
            <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search cover letters by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/40 transition-all duration-200"
        />
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((cl) => (
            <div
              key={cl.id}
              className="group relative p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {cl.title}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5">{cl.role} at {cl.company}</p>
                  </div>
                </div>

                {/* Options Menu */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === cl.id ? null : cl.id)}
                    className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-all"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {activeMenu === cl.id && (
                    <div
                      className="absolute right-0 top-8 w-44 rounded-xl border border-white/10 z-50 overflow-hidden"
                      style={{ background: '#1a1a30', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                    >
                      {[
                        { icon: Edit3, label: 'Edit' },
                        { icon: Copy, label: 'Duplicate' },
                        { icon: Download, label: 'Export Text' },
                        { icon: Trash2, label: 'Delete', danger: true },
                      ].map((item, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveMenu(null)}
                          className={cn(
                            'flex items-center gap-2.5 w-full px-3 py-2.5 text-xs font-medium transition-colors',
                            item.danger ? 'text-rose-400 hover:bg-rose-500/10' : 'text-white/60 hover:text-white hover:bg-white/5'
                          )}
                        >
                          <item.icon className="w-3.5 h-3.5" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Match Score */}
              <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white/70">AI JD Match Score</span>
                </div>
                <span className="text-sm font-black text-emerald-400">{cl.matchScore}%</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-white/30">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {cl.updatedAt}
                </div>
                <button className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                  Open Letter →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="w-12 h-12 text-white/15 mb-4" />
          <p className="text-white/50 font-medium">No cover letters found</p>
          <p className="text-white/25 text-xs mt-1">Write your first custom cover letter to begin</p>
        </div>
      )}
    </div>
  );
}
