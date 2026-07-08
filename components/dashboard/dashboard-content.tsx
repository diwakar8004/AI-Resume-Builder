'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  FileText,
  TrendingUp,
  Target,
  Star,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { DocumentCard, DocumentData } from '@/components/dashboard/document-card';

interface DashboardContentProps {
  documents: DocumentData[];
}

export default function DashboardContent({ documents }: DashboardContentProps) {
  const [search, setSearch] = useState('');

  const filtered = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const total = documents.length;
  const avgAts = total > 0 ? Math.round(documents.reduce((sum, doc) => sum + doc.atsScore, 0) / total) : 0;
  const completeCount = documents.filter((doc) => doc.status === 'complete').length;
  const starredCount = documents.filter((doc) => doc.starred).length;

  const stats = [
    { icon: FileText, label: 'Total Resumes', value: `${total}` },
    { icon: TrendingUp, label: 'Avg ATS Score', value: total > 0 ? `${avgAts}%` : '—' },
    { icon: Target, label: 'Completed', value: `${completeCount}` },
    { icon: Star, label: 'Starred', value: `${starredCount}` },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            My Documents
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Manage all your career documents in one place</p>
        </div>
        <Link
          href="/editor/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
        >
          <Plus className="w-4 h-4" />
          New Resume
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/5"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${i === 0 ? '#4F46E5' : i === 1 ? '#10B981' : i === 2 ? '#F59E0B' : '#7C3AED'}18`, border: `1px solid ${i === 0 ? '#4F46E5' : i === 1 ? '#10B981' : i === 2 ? '#F59E0B' : '#7C3AED'}25` }}>
                  <Icon className="w-4 h-4" style={{ color: i === 0 ? '#4F46E5' : i === 1 ? '#10B981' : i === 2 ? '#F59E0B' : '#7C3AED' }} />
                </div>
              </div>
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div
        className="mb-8 p-5 rounded-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.08))', border: '1px solid rgba(79,70,229,0.2)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">AI Resume Coach</p>
              <p className="text-xs text-white/50">Get personalized suggestions to improve your resume&apos;s ATS score</p>
            </div>
          </div>
          <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
            <Sparkles className="w-3.5 h-3.5" />
            Analyze My Resumes
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/40 transition-all duration-200"
          />
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white border border-white/8 bg-white/3 hover:bg-white/6 transition-all duration-200">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Link
            href="/editor/new"
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(79,70,229,0.2)' }}>
              <Plus className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-sm font-bold text-white/50 group-hover:text-white transition-colors">New Resume</p>
            <p className="text-xs text-white/25 mt-1">Start from template</p>
          </Link>

          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-12 h-12 text-white/15 mb-4" />
          <p className="text-white/50 font-medium">No documents found</p>
          <p className="text-white/25 text-sm mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
