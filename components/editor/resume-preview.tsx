'use client';

import { useResumeStore } from '@/store/resume-store';
import { getFullName, formatDate } from '@/lib/utils';
import { ModernTemplate } from './templates/modern-template';
import { MinimalTemplate } from './templates/minimal-template';
// ─── Classic Template ─────────────────────────────────────────────────────────
function ClassicTemplate() {
  const { resumeData } = useResumeStore();
  const pi = resumeData.personalInfo;
  const name = getFullName(pi.firstName, pi.lastName);

  return (
    <div className="resume-preview bg-white text-[#111] font-[Inter,sans-serif]" style={{ width: '210mm', minHeight: '297mm', padding: '14mm 16mm' }}>
      {/* Header */}
      <header className="border-b-2 border-[#4F46E5] pb-4 mb-5">
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>{name}</h1>
        {pi.jobTitle && <p style={{ fontSize: '14px', color: '#4F46E5', fontWeight: 600, marginTop: '4px' }}>{pi.jobTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px', wordBreak: 'break-word', overflowWrap: 'anywhere', whiteSpace: 'normal' }}>
          {pi.email && <span style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px', wordBreak: 'break-word' }}>✉ {pi.email}</span>}
          {pi.phone && <span style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>📞 {pi.phone}</span>}
          {pi.location && <span style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>📍 {pi.location}</span>}
          {pi.linkedin && <span style={{ fontSize: '11px', color: '#4F46E5', wordBreak: 'break-word', overflowWrap: 'anywhere', minWidth: 0 }}>{pi.linkedin}</span>}
          {pi.github && <span style={{ fontSize: '11px', color: '#4F46E5', wordBreak: 'break-word', overflowWrap: 'anywhere', minWidth: 0 }}>{pi.github}</span>}
          {pi.website && <span style={{ fontSize: '11px', color: '#4F46E5', wordBreak: 'break-word', overflowWrap: 'anywhere', minWidth: 0 }}>{pi.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.summary && (
        <section style={{ marginBottom: '16px' }}>
          <SectionTitle>Professional Summary</SectionTitle>
          <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.6 }}>{resumeData.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <SectionTitle>Experience</SectionTitle>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{exp.position}</p>
                  <p style={{ fontSize: '12px', color: '#4F46E5', fontWeight: 600 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                </div>
                <p style={{ fontSize: '11px', color: '#777', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {formatDate(exp.startDate, 'short')} – {exp.current ? 'Present' : formatDate(exp.endDate, 'short')}
                </p>
              </div>
              {exp.description && (
                <div style={{ marginTop: '6px' }}>
                  {exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} style={{ fontSize: '11.5px', color: '#444', lineHeight: 1.5, marginBottom: '2px' }}>
                      {line.startsWith('•') ? line : `• ${line}`}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{edu.institution}</p>
                <p style={{ fontSize: '12px', color: '#4F46E5', fontWeight: 600 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                {edu.gpa && <p style={{ fontSize: '11px', color: '#777' }}>GPA: {edu.gpa}</p>}
              </div>
              <p style={{ fontSize: '11px', color: '#777', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                {formatDate(edu.startDate, 'short')} – {edu.current ? 'Present' : formatDate(edu.endDate, 'short')}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <SectionTitle>Skills</SectionTitle>
          {resumeData.skills.map((cat) => cat.skills.length > 0 && (
            <div key={cat.id} style={{ marginBottom: '6px', display: 'flex', gap: '8px' }}>
              {cat.name && <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#111', minWidth: '80px' }}>{cat.name}:</span>}
              <span style={{ fontSize: '11.5px', color: '#444' }}>{cat.skills.join(' · ')}</span>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <SectionTitle>Projects</SectionTitle>
          {resumeData.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{proj.name}</p>
                {proj.technologies.length > 0 && (
                  <span style={{ fontSize: '10px', color: '#4F46E5', background: '#4F46E510', padding: '2px 6px', borderRadius: '4px' }}>
                    {proj.technologies.slice(0, 3).join(' · ')}
                  </span>
                )}
              </div>
              {proj.description && <p style={{ fontSize: '11.5px', color: '#444', lineHeight: 1.5, marginTop: '3px' }}>{proj.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</h2>
      <div style={{ height: '1px', background: '#4F46E522', marginTop: '3px' }} />
    </div>
  );
}

// ─── Template Renderer ────────────────────────────────────────────────────────
function ActiveTemplate({ templateId }: { templateId: string }) {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate />;
    case 'minimal':
      return <MinimalTemplate />;
    case 'classic':
    default:
      return <ClassicTemplate />;
  }
}

// ─── Resume Preview Component ─────────────────────────────────────────────────
export function ResumePreview() {
  const { resumeData, previewScale, setPreviewScale, setTemplate } = useResumeStore();
  const activeTemplateId = resumeData.customization.template || 'classic';

  const templates = [
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Template selector + scale controls */}
      <div className="flex items-center gap-4">
        {/* Template pills */}
        <div className="flex items-center gap-1 px-1 py-1 rounded-xl bg-white/5 border border-white/8">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTemplateId === t.id
                  ? 'text-white bg-indigo-500/30 border border-indigo-500/40'
                  : 'text-white/40 hover:text-white/70 border border-transparent'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Scale controls */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/8">
          <button
            onClick={() => setPreviewScale(Math.max(0.4, previewScale - 0.1))}
            className="text-white/50 hover:text-white text-sm font-bold transition-colors w-6 h-6 flex items-center justify-center rounded hover:bg-white/10"
          >
            −
          </button>
          <span className="text-xs font-medium text-white/50 min-w-[40px] text-center">
            {Math.round(previewScale * 100)}%
          </span>
          <button
            onClick={() => setPreviewScale(Math.min(1.2, previewScale + 0.1))}
            className="text-white/50 hover:text-white text-sm font-bold transition-colors w-6 h-6 flex items-center justify-center rounded hover:bg-white/10"
          >
            +
          </button>
        </div>
      </div>

      {/* Page shadow wrapper */}
      <div
        className="print-wrapper"
        style={{
          transform: `scale(${previewScale})`,
          transformOrigin: 'top center',
          marginBottom: `calc((${previewScale} - 1) * 297mm)`,
        }}
      >
        <ActiveTemplate templateId={activeTemplateId} />
      </div>
    </div>
  );
}
