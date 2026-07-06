'use client';

import { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Copy,
  CheckCircle2,
  Loader2,
  Zap,
  FileText,
  Target,
} from 'lucide-react';
import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';

const quickActions = [
  { id: 'summary', icon: FileText, label: 'Rewrite Summary', desc: 'AI-powered professional summary', color: '#4F46E5' },
  { id: 'bullet', icon: Zap, label: 'Enhance Bullets', desc: 'Add metrics & action verbs', color: '#10B981' },
  { id: 'ats', icon: Target, label: 'ATS Optimizer', desc: 'Boost keyword density', color: '#F59E0B' },
  { id: 'tone', icon: Wand2, label: 'Adjust Tone', desc: 'Match industry standards', color: '#7C3AED' },
];

const toneOptions = ['Professional', 'Creative', 'Technical', 'Executive', 'Academic'];

export function AIPanel() {
  const { resumeData, updateSummary } = useResumeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [atsScore] = useState(72);

  const handleGenerate = async (actionId: string) => {
    setActiveAction(actionId);
    setIsLoading(true);
    setGeneratedText('');

    try {
      if (actionId === 'summary') {
        // Call generate-summary API
        const res = await fetch('/api/ai/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobTitle: resumeData.personalInfo.jobTitle,
            experience: resumeData.experience,
            skills: resumeData.skills,
            tone: selectedTone,
          }),
        });
        const data = await res.json();
        setGeneratedText(data.result || 'Could not generate summary.');
      } else if (actionId === 'bullet') {
        // Get all experience descriptions combined
        const bulletText = resumeData.experience
          .map((e) => e.description)
          .filter(Boolean)
          .join('\n');
        const res = await fetch('/api/ai/enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: bulletText || 'Developed features and collaborated with teams.', type: 'bullet', tone: selectedTone }),
        });
        const data = await res.json();
        setGeneratedText(data.result || 'Could not enhance bullets.');
      } else if (actionId === 'ats') {
        const res = await fetch('/api/ai/enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: jobDescription || resumeData.summary,
            type: 'ats',
            jobTitle: resumeData.personalInfo.jobTitle,
            tone: selectedTone,
          }),
        });
        const data = await res.json();
        setGeneratedText(data.result || 'Could not generate ATS suggestions.');
      } else if (actionId === 'tone') {
        setGeneratedText(
          `Tone adjusted to ${selectedTone} style. Consider these power verbs:\n\nProfessional: orchestrated, spearheaded, championed\nTechnical: architected, implemented, engineered\nExecutive: catalyzed, accelerated, directed\n\nApply these when editing your bullet points in the left panel.`
        );
      }
    } catch {
      setGeneratedText('Error connecting to AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApplySummary = () => {
    if (generatedText && activeAction === 'summary') {
      updateSummary(generatedText);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-bold text-white">AI Assistant</h2>
        </div>
        <p className="text-xs text-white/40">Powered by GPT-4 · Context-aware</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* ATS Score */}
        <div className="p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400">ATS Score</span>
            <span className="text-lg font-black text-emerald-400">{atsScore}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${atsScore}%`, background: 'linear-gradient(90deg, #10B981, #34D399)' }}
            />
          </div>
          <p className="text-xs text-white/40">Good! Add more keywords to reach 85%+</p>
        </div>

        {/* Job Description Paste */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Target Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Paste the job description here for AI to tailor your resume..."
            className="w-full px-3 py-2.5 rounded-lg text-xs text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 resize-none"
          />
        </div>

        {/* Tone selector */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                  selectedTone === tone
                    ? 'text-white'
                    : 'text-white/40 border border-white/8 hover:text-white/70 hover:bg-white/5'
                )}
                style={selectedTone === tone ? { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' } : {}}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Quick Actions</label>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleGenerate(action.id)}
                  disabled={isLoading}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 border border-white/5 hover:border-white/10"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${action.color}18`, border: `1px solid ${action.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: action.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white">{action.label}</p>
                    <p className="text-xs text-white/35">{action.desc}</p>
                  </div>
                  {isLoading && activeAction === action.id ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin flex-shrink-0" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-white/20 group-hover:text-indigo-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generated output */}
        {(isLoading || generatedText) && (
          <div className="rounded-xl overflow-hidden border border-indigo-500/20" style={{ background: 'rgba(79,70,229,0.06)' }}>
            <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-500/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-300">AI Output</span>
              </div>
              {!isLoading && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCopy(0, generatedText)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {copiedIndex === 0 ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedIndex === 0 ? 'Copied!' : 'Copy'}
                  </button>
                  {activeAction === 'summary' && (
                    <button
                      onClick={handleApplySummary}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-white transition-all"
                      style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
                    >
                      Apply
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="p-3">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs text-white/40">Generating…</span>
                </div>
              ) : (
                <p className="text-xs text-white/70 leading-relaxed whitespace-pre-wrap">{generatedText}</p>
              )}
            </div>
          </div>
        )}

        {/* Custom prompt */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Custom Prompt</label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Ask AI anything about your resume: 'Rewrite my experience at Google to emphasize leadership', 'Make my skills section more technical'..."
              className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 resize-none pr-12"
            />
            <button
              className="absolute bottom-2 right-2 p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
