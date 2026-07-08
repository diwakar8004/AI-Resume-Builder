'use client';

import { useState } from 'react';
import {
  Sparkles,
  Save,
  Download,
  ChevronLeft,
  Loader2,
  Palette,
  History,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';
import { exportResumeToPDF } from '@/lib/pdf-export';
import { toast } from 'sonner';
import { Autosave } from '@/components/editor/autosave';
import { StyleModal } from '@/components/editor/style-modal';


interface EditorShellProps {
  documentId?: string;
  createNew?: boolean;
  LeftPanel: React.ReactNode;
  CenterPanel: React.ReactNode;
  RightPanel: React.ReactNode;
}

export function EditorShell({ documentId, createNew = false, LeftPanel, CenterPanel, RightPanel }: EditorShellProps) {
  const { isDirty, documentTitle, setDocumentTitle, isAIPanelOpen, toggleAIPanel, markClean } = useResumeStore();
  const [isSaving, setIsSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    markClean();
    setIsSaving(false);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const filename = documentTitle || 'resume';
      await exportResumeToPDF({ 
        filename: `${filename}.pdf`,
        margin: 5,
        scale: 3,
      });
      toast.success('Resume exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export resume. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: '#0A0A18' }}
    >
      {/* Autosave component handles initial load and autosave wiring
          render it once per editor instance */}
      <Autosave documentId={documentId} createNew={createNew} />
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <header
        className="h-12 sm:h-14 flex items-center px-2 sm:px-4 gap-2 sm:gap-3 flex-shrink-0 border-b border-white/5 overflow-x-auto"
        style={{ background: 'rgba(13,13,32,0.95)', backdropFilter: 'blur(20px)' }}
      >
        {/* Back */}
        <Link
          href="/dashboard"
          className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/40 hover:text-white transition-colors group flex-shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        <div className="hidden sm:block w-px h-4 sm:h-5 bg-white/10" />

        {/* Document title */}
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          className="flex-1 max-w-xs text-xs sm:text-sm font-semibold text-white bg-transparent border-none outline-none placeholder-white/30 focus:bg-white/5 px-2 py-1 rounded-lg transition-all"
          placeholder="Resume"
        />

        {/* Status - hide on very small screens */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs ml-auto flex-shrink-0">
          {isSaving ? (
            <><Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 animate-spin" /><span className="hidden md:inline text-white/40">Saving…</span></>
          ) : savedOk ? (
            <><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /><span className="hidden md:inline text-white/40">Saved</span></>
          ) : isDirty ? (
            <><AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" /><span className="hidden md:inline text-white/40">Unsaved</span></>
          ) : (
            <><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20" /><span className="hidden md:inline text-white/25">Up to date</span></>
          )}
        </div>

        {/* Actions - responsive buttons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* AI Toggle */}
          <button
            onClick={toggleAIPanel}
            className={cn(
              'hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
              isAIPanelOpen
                ? 'text-white'
                : 'text-white/50 hover:text-white hover:bg-white/8 border border-white/10'
            )}
            style={isAIPanelOpen ? { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' } : {}}
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden md:inline">AI</span>
          </button>

          {/* Customize */}
          <button 
            onClick={() => setIsStyleModalOpen(true)}
            className="hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white border border-white/10 hover:bg-white/8 transition-all duration-200">
            <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden md:inline">Style</span>
          </button>

          {/* History */}
          <button className="p-1 sm:p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 border border-white/10 transition-all duration-200">
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className={cn(
              'hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all duration-200',
              isDirty && !isSaving
                ? 'text-white hover:-translate-y-0.5'
                : 'text-white/30 cursor-not-allowed opacity-50'
            )}
            style={isDirty && !isSaving ? { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' } : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {isSaving ? <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" /> : <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            <span className="hidden md:inline">Save</span>
          </button>

          {/* Export - mobile friendly */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={cn(
              'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all duration-200',
              isExporting 
                ? 'text-white/50 cursor-not-allowed opacity-50'
                : 'text-white border border-white/10 bg-white/5 hover:bg-white/10'
            )}
          >
            {isExporting ? (
              <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
            ) : (
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
            <span className="hidden md:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
          </button>

          <button className="hidden sm:block p-1 sm:p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </header>

      {/* ── Three Panels (responsive layout) ────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* LEFT — Form panel (hidden on mobile, shown on desktop) */}
        <aside
          className="hidden md:flex w-full md:w-80 flex-shrink-0 flex-col overflow-hidden border-r border-white/5"
          style={{ background: '#0D0D20' }}
        >
          {LeftPanel}
        </aside>

        {/* CENTER — Live preview */}
        <main className="flex-1 overflow-auto flex items-start justify-center py-4 sm:py-6 md:py-8 px-2 sm:px-4" style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0C0C1E 100%)' }}>
          {CenterPanel}
        </main>

        {/* RIGHT — AI panel (hidden on mobile, conditionally shown on desktop) */}
        {isAIPanelOpen && (
          <aside
            className="hidden md:flex w-full md:w-80 flex-shrink-0 border-l border-white/5 flex-col overflow-hidden"
            style={{ background: '#0D0D20' }}
          >
            {RightPanel}
          </aside>
        )}
      </div>

      {/* Style Modal */}
      <StyleModal isOpen={isStyleModalOpen} onClose={() => setIsStyleModalOpen(false)} />
    </div>
  );
}
