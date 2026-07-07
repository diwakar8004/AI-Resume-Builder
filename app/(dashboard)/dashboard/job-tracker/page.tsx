'use client';

import { FormEvent, useState } from 'react';
import { Sparkles, Clock3, ShieldCheck, ListChecks } from 'lucide-react';

export default function JobTrackerPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200">
                <Sparkles className="h-4 w-4" />
                Reimagined for launch
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">Job tracker</p>
                <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">A smarter job tracking experience is coming soon.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                  We’re rebuilding the tracker from the ground up with saved pipelines, automated follow-ups, timeline reminders, and AI-powered application summaries.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Application pipeline', description: 'Keep every role, status, and follow-up in one beautiful board.' },
                  { title: 'Smart reminders', description: 'Get notified when it’s time to follow up on interviews and offers.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-white/50">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <p className="text-sm font-semibold text-white">Notify me</p>
              <p className="mt-2 text-sm text-white/60">Enter your email and we’ll let you know the moment Job Tracker launches.</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block text-sm text-white/70">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60 focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  {submitted ? 'You’re on the list' : 'Notify me'}
                </button>
                {submitted && <p className="text-sm text-emerald-300">Thanks! We’ll email you when the feature is ready.</p>}
              </form>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock3, title: 'Timeline view', description: 'Visualize every application, interview, and offer in one timeline.' },
            { icon: ShieldCheck, title: 'Secure data', description: 'Your application history is stored safely and privately.' },
            { icon: ListChecks, title: 'Workflow automation', description: 'Auto-sort roles by status and reminders so nothing slips through.' },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-base font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
