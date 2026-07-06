'use client';

import { useState } from 'react';
import {
  Plus,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

type Job = {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  status: 'Wishlist' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  updatedAt: string;
};

const initialJobs: Job[] = [
  {
    id: 'job-1',
    company: 'Stripe',
    role: 'Senior Product Engineer',
    location: 'Remote, US',
    salary: '$180K - $220K',
    status: 'Interviewing',
    updatedAt: '2 hours ago',
  },
  {
    id: 'job-2',
    company: 'Vercel',
    role: 'Developer Advocate',
    location: 'Remote',
    salary: '$140K - $160K',
    status: 'Applied',
    updatedAt: 'Yesterday',
  },
  {
    id: 'job-3',
    company: 'Linear',
    role: 'Product Designer',
    location: 'San Francisco, CA',
    salary: '$170K - $190K',
    status: 'Wishlist',
    updatedAt: '3 days ago',
  },
  {
    id: 'job-4',
    company: 'Figma',
    role: 'Frontend Engineer',
    location: 'Remote, CA',
    salary: '$160K - $185K',
    status: 'Offer',
    updatedAt: 'Just now',
  },
];

const columns: Job['status'][] = ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

const statusColors: Record<Job['status'], { text: string; bg: string; border: string }> = {
  Wishlist: { text: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10' },
  Applied: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  Interviewing: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  Offer: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Rejected: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Job Tracker
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Track and organize all your job applications in one board</p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
        >
          <Plus className="w-4 h-4" />
          Add Tracked Job
        </button>
      </div>

      {/* Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[calc(100vh-200px)]">
        {columns.map((col) => {
          const colJobs = jobs.filter((j) => j.status === col);
          return (
            <div
              key={col}
              className="w-72 flex-shrink-0 rounded-2xl border border-white/5 p-4 flex flex-col gap-3 min-h-[500px]"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col === 'Offer' ? 'bg-emerald-400' : col === 'Interviewing' ? 'bg-amber-400' : col === 'Applied' ? 'bg-indigo-400' : col === 'Rejected' ? 'bg-rose-400' : 'bg-white/30'}`} />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">{col}</h3>
                </div>
                <span className="text-[10px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                  {colJobs.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-1">
                {colJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border border-white/5 bg-white/4 hover:border-white/10 transition-all duration-200 cursor-pointer relative group overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(79,70,229,0.06), transparent 70%)' }} />

                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">{job.role}</h4>
                    
                    {/* Company */}
                    <div className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-white/35" />
                      <span>{job.company}</span>
                    </div>

                    {/* Meta Row */}
                    <div className="space-y-1.5 border-t border-white/5 pt-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/45">
                        <MapPin className="w-3 h-3 text-white/30" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/45">
                        <DollarSign className="w-3 h-3 text-white/30" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {/* Footer card */}
                    <div className="flex items-center justify-between mt-4 text-[10px] text-white/30 border-t border-white/5 pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{job.updatedAt}</span>
                      </div>
                      
                      {/* Dropdown status changer mock */}
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${statusColors[col].bg} ${statusColors[col].text} border ${statusColors[col].border}`}>
                        {col}
                      </span>
                    </div>
                  </div>
                ))}

                {colJobs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 border border-dashed border-white/5 rounded-xl text-center">
                    <Briefcase className="w-8 h-8 text-white/10 mb-2" />
                    <p className="text-[10px] text-white/20">Empty column</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
