'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Plus,
  BookOpen,
  Sparkles,
  Search,
  Copy,
  Trash2,
  Download,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CoverLetter = {
  id: string;
  title: string;
  company: string;
  role: string;
  applicantName: string;
  jobDescription: string;
  tone: string;
  generatedText: string;
  createdAt: string;
  updatedAt: string;
};

const LOCAL_STORAGE_KEY = 'ai-resume-builder-cover-letters';
const TONES = ['Professional', 'Confident', 'Friendly', 'Concise'] as const;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export default function CoverLettersPage() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState('');
  const [letters, setLetters] = useState<CoverLetter[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    company: '',
    role: '',
    jobDescription: '',
    tone: 'Professional',
    applicantName: '',
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: CoverLetter[] = JSON.parse(stored);
        queueMicrotask(() => {
          setLetters(parsed);
          if (parsed.length > 0) {
            setSelectedId(parsed[0].id);
          }
        });
      } catch {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user?.name && !form.applicantName) {
      queueMicrotask(() => setForm((current) => ({ ...current, applicantName: session?.user?.name || '' })));
    }
  }, [session, form.applicantName]);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(letters));
  }, [letters]);

  const filteredLetters = useMemo(() => {
    return letters.filter((letter) => {
      const query = search.toLowerCase();
      return (
        letter.title.toLowerCase().includes(query) ||
        letter.company.toLowerCase().includes(query) ||
        letter.role.toLowerCase().includes(query)
      );
    });
  }, [letters, search]);

  const selectedLetter = useMemo(() => {
    return letters.find((letter) => letter.id === selectedId) || letters[0] || null;
  }, [letters, selectedId]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleGenerate = async () => {
    setErrorMessage('');
    if (!form.company || !form.role || !form.jobDescription || !form.applicantName) {
      setErrorMessage('Please complete all fields before generating your cover letter.');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok || !data.result) {
        throw new Error(data.error || 'Unable to generate a cover letter right now.');
      }

      const newLetter: CoverLetter = {
        id: `cl-${Date.now()}`,
        title: `${form.company} • ${form.role}`,
        company: form.company,
        role: form.role,
        applicantName: form.applicantName,
        jobDescription: form.jobDescription,
        tone: form.tone,
        generatedText: data.result,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setLetters((current) => [newLetter, ...current]);
      setSelectedId(newLetter.id);
      setForm((current) => ({
        ...current,
        company: '',
        role: '',
        jobDescription: '',
      }));
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'AI generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    setLetters((current) => current.filter((letter) => letter.id !== id));
    if (selectedId === id) {
      setSelectedId(() => {
        const remaining = letters.filter((letter) => letter.id !== id);
        return remaining[0]?.id || null;
      });
    }
  };

  const handleDuplicate = (letter: CoverLetter) => {
    const duplicate = {
      ...letter,
      id: `cl-${Date.now()}`,
      title: `${letter.company} • ${letter.role} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLetters((current) => [duplicate, ...current]);
    setSelectedId(duplicate.id);
  };

  const handleCopyText = async () => {
    if (!selectedLetter) return;
    await navigator.clipboard.writeText(selectedLetter.generatedText);
  };

  const handleDownload = () => {
    if (!selectedLetter) return;
    const blob = new Blob([selectedLetter.generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${selectedLetter.company}-${selectedLetter.role}-cover-letter.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const totalLetters = letters.length;

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">Cover letters</p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Create tailored applications faster</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              Generate AI-powered cover letters, keep all drafts in one place, and preview every letter before you send it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Start new letter
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold text-white">Total letters</p>
            <p className="mt-3 text-3xl font-black text-white">{totalLetters}</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold text-white">Last updated</p>
            <p className="mt-3 text-3xl font-black text-white">{selectedLetter ? formatDate(selectedLetter.updatedAt) : '—'}</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold text-white">AI letters</p>
            <p className="mt-3 text-3xl font-black text-white">{totalLetters}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Saved letters</p>
                <p className="text-xs text-white/50 mt-1">Search, open, duplicate, and export your latest drafts.</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search letters..."
                  className="w-full rounded-3xl border border-white/10 bg-black/20 px-10 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {filteredLetters.length > 0 ? (
                filteredLetters.map((letter) => (
                  <button
                    key={letter.id}
                    type="button"
                    onClick={() => setSelectedId(letter.id)}
                    className={cn(
                      'group flex w-full items-start justify-between rounded-3xl border px-4 py-4 text-left transition',
                      selectedLetter?.id === letter.id
                        ? 'border-indigo-400/50 bg-indigo-500/10'
                        : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5'
                    )}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{letter.title}</p>
                      <p className="mt-1 text-xs text-white/50">{letter.role} · {letter.company}</p>
                    </div>
                    <div className="text-right text-xs text-white/40">
                      <p>{formatDate(letter.updatedAt)}</p>
                      <p className="mt-2 rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">View</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="grid place-items-center rounded-3xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center text-white/50">
                  <BookOpen className="mb-4 h-10 w-10 text-white/20" />
                  <p className="font-semibold text-white">No letters yet</p>
                  <p className="mt-2 text-sm">Create your first AI-tailored cover letter in seconds.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Create a new letter</p>
                  <p className="mt-1 text-sm text-white/50">Tell the AI about the job and your background.</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> AI assistant
                </span>
              </div>

              <div ref={formRef} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold text-white/70">Company</span>
                    <input
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder="Google"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-white/70">Job title</span>
                    <input
                      value={form.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      placeholder="Senior Frontend Engineer"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold text-white/70">Your name</span>
                  <input
                    value={form.applicantName}
                    onChange={(e) => handleChange('applicantName', e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-white/70">Job description</span>
                  <textarea
                    value={form.jobDescription}
                    onChange={(e) => handleChange('jobDescription', e.target.value)}
                    placeholder="Paste the full job description here..."
                    rows={5}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold text-white/70">Tone</span>
                    <select
                      value={form.tone}
                      onChange={(e) => handleChange('tone', e.target.value)}
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                    >
                      {TONES.map((tone) => (
                        <option key={tone} value={tone}>{tone}</option>
                      ))}
                    </select>
                  </label>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isGenerating ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Generating
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Sparkles className="h-4 w-4" /> Generate letter
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-black/20 p-6 text-white/70 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <p className="text-sm font-semibold text-white">Best practices</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>• Customize the job description for each application.</li>
                <li>• Use an applicant name for a more personal letter.</li>
                <li>• Export or copy the AI letter once it feels polished.</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Preview</p>
              <p className="mt-1 text-sm text-white/50">Review the selected cover letter before copying or exporting.</p>
            </div>
            {selectedLetter ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white transition hover:bg-white/5"
                >
                  <Copy className="h-4 w-4" /> Copy text
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-3xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" /> Export
                </button>
              </div>
            ) : null}
          </div>

          {selectedLetter ? (
            <div className="mt-6 grid gap-6 xl:grid-cols-[0.7fr_0.35fr]">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/80">
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">{selectedLetter.company} · {selectedLetter.role}</p>
                <p className="mt-4 text-lg font-semibold text-white">{selectedLetter.title}</p>
                <p className="mt-3 text-sm text-white/50">Generated on {formatDate(selectedLetter.createdAt)} · Tone: {selectedLetter.tone}</p>
                <div className="mt-6 whitespace-pre-line">{selectedLetter.generatedText}</div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Letter details</p>
                    <p className="text-xs text-white/50">Update, duplicate, or remove this draft.</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Company</p>
                    <p className="mt-2 text-sm text-white">{selectedLetter.company}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Role</p>
                    <p className="mt-2 text-sm text-white">{selectedLetter.role}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Applicant</p>
                    <p className="mt-2 text-sm text-white">{selectedLetter.applicantName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleDuplicate(selectedLetter)}
                    className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white transition hover:bg-white/5"
                  >
                    <Copy className="h-4 w-4" /> Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedLetter.id)}
                    className="inline-flex items-center gap-2 rounded-3xl bg-rose-500/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-black/20 p-12 text-center text-white/50">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-white/20" />
              <p className="text-lg font-semibold text-white">Select a letter to preview it here.</p>
              <p className="mt-2 text-sm">Your latest generated cover letter will appear in this panel.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
