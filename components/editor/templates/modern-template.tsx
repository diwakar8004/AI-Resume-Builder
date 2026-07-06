'use client';

import { useResumeStore } from '@/store/resume-store';
import { getFullName, formatDate } from '@/lib/utils';

export function ModernTemplate() {
  const { resumeData } = useResumeStore();
  const pi = resumeData.personalInfo;
  const name = getFullName(pi.firstName, pi.lastName);
  const accent = resumeData.customization.accentColor || '#7C3AED';

  return (
    <div className="resume-preview bg-white text-[#1a1a2e] font-[Inter,sans-serif]" style={{ width: '210mm', minHeight: '297mm', padding: '0' }}>
      {/* Header with accent banner */}
      <header style={{ background: accent, padding: '28mm 20mm 20mm', color: '#fff', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'rgba(255,255,255,0.08)', borderRadius: '0 0 0 120px' }} />
        <h1 style={{ fontSize: '30px', fontWeight: 800, lineHeight: 1.1, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>{name}</h1>
        {pi.jobTitle && <p style={{ fontSize: '15px', fontWeight: 500, marginTop: '6px', opacity: 0.9 }}>{pi.jobTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '14px', fontSize: '11px', opacity: 0.85 }}>
          {pi.email && <span>✉ {pi.email}</span>}
          {pi.phone && <span>📞 {pi.phone}</span>}
          {pi.location && <span>📍 {pi.location}</span>}
          {pi.linkedin && <span>{pi.linkedin}</span>}
          {pi.github && <span>{pi.github}</span>}
          {pi.website && <span>{pi.website}</span>}
        </div>
      </header>

      <div style={{ padding: '20mm' }}>
        {/* Summary */}
        {resumeData.summary && (
          <section style={{ marginBottom: '20px' }}>
            <ModernSectionTitle accent={accent}>Professional Summary</ModernSectionTitle>
            <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.7 }}>{resumeData.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <ModernSectionTitle accent={accent}>Work Experience</ModernSectionTitle>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px', paddingLeft: '14px', borderLeft: `3px solid ${accent}22` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{exp.position}</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: accent }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px' }}>
                    {formatDate(exp.startDate, 'short')} – {exp.current ? 'Present' : formatDate(exp.endDate, 'short')}
                  </p>
                </div>
                {exp.description && (
                  <div style={{ marginTop: '6px' }}>
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} style={{ fontSize: '11.5px', color: '#555', lineHeight: 1.6, marginBottom: '2px' }}>
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
          <section style={{ marginBottom: '20px' }}>
            <ModernSectionTitle accent={accent}>Education</ModernSectionTitle>
            {resumeData.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', paddingLeft: '14px', borderLeft: `3px solid ${accent}22` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{edu.institution}</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: accent }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                    {edu.gpa && <p style={{ fontSize: '11px', color: '#888' }}>GPA: {edu.gpa}</p>}
                  </div>
                  <p style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {formatDate(edu.startDate, 'short')} – {edu.current ? 'Present' : formatDate(edu.endDate, 'short')}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <ModernSectionTitle accent={accent}>Skills</ModernSectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {resumeData.skills.flatMap((cat) =>
                cat.skills.map((skill, i) => (
                  <span key={`${cat.id}-${i}`} style={{ fontSize: '11px', color: accent, background: `${accent}10`, padding: '4px 10px', borderRadius: '6px', fontWeight: 600, border: `1px solid ${accent}25` }}>
                    {skill}
                  </span>
                ))
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <ModernSectionTitle accent={accent}>Projects</ModernSectionTitle>
            {resumeData.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px', paddingLeft: '14px', borderLeft: `3px solid ${accent}22` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{proj.name}</p>
                  {proj.technologies.length > 0 && (
                    <span style={{ fontSize: '10px', color: accent, background: `${accent}10`, padding: '2px 6px', borderRadius: '4px' }}>
                      {proj.technologies.slice(0, 3).join(' · ')}
                    </span>
                  )}
                </div>
                {proj.description && <p style={{ fontSize: '11.5px', color: '#555', lineHeight: 1.6, marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function ModernSectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</h2>
      <div style={{ flex: 1, height: '1px', background: `${accent}20` }} />
    </div>
  );
}
