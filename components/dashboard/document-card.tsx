'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MoreVertical,
  Copy,
  Trash2,
  Edit3,
  Download,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type DocumentData = {
  id: string;
  title: string;
  template: string;
  updatedAt: string;
  atsScore: number;
  status: 'complete' | 'draft';
  starred: boolean;
};

export function DocumentCard({ doc }: { doc: DocumentData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scoreColor = doc.atsScore >= 80 ? '#10B981' : doc.atsScore >= 65 ? '#F59E0B' : '#EF4444';

  return (
    <div
      className="group relative p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(circle at 30% 0%, rgba(79,70,229,0.08), transparent 60%)' }} />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Mini resume thumbnail */}
          <div className="w-10 h-12 rounded-lg flex-shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e1e38, #252545)' }}>
            <div className="absolute inset-0 p-1">
              <div className="h-2 bg-indigo-400/40 rounded mb-1" />
              <div className="space-y-0.5">
                {[100, 80, 90, 70].map((w, i) => (
                  <div key={i} className="h-0.5 rounded" style={{ width: `${w}%`, background: 'rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{doc.title}</h3>
            <p className="text-xs text-white/40 mt-0.5">{doc.template} Template</p>
          </div>
        </div>

        {/* Menu button */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-all opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-8 w-44 rounded-xl border border-white/10 z-50 overflow-hidden"
              style={{ background: '#1a1a30', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            >
              {[
                { icon: Edit3, label: 'Edit Resume', href: `/editor/${doc.id}` },
                { icon: Copy, label: 'Duplicate' },
                { icon: Download, label: 'Export PDF' },
                { icon: Trash2, label: 'Delete', danger: true },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setMenuOpen(false)}
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

      {/* ATS Score bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-white/40">ATS Score</span>
          <span className="text-xs font-bold" style={{ color: scoreColor }}>{doc.atsScore}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${doc.atsScore}%`, background: scoreColor }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-white/35">
          <Clock className="w-3 h-3" />
          {doc.updatedAt}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            doc.status === 'complete' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
          )}>
            {doc.status === 'complete' ? '✓ Complete' : 'Draft'}
          </span>
          <Link
            href={`/editor/${doc.id}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:bg-indigo-500/15 border border-white/8 hover:border-indigo-500/30 transition-all duration-200"
          >
            <Edit3 className="w-3 h-3" />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
