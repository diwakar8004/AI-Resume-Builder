'use client';

import { useResumeStore } from '@/store/resume-store';
import { getFullName, formatDate } from '@/lib/utils';

export function MinimalTemplate() {
  const { resumeData } = useResumeStore();
  const pi = resumeData.personalInfo;
  const name = getFullName(pi.firstName, pi.lastName);

  return (
    <div className="resume-preview bg-white text-[#222] font-[Georgia,serif]" style={{ width: '210mm', minHeight: '297mm', padding: '18mm 20mm' }}>
      {/* Header — clean centered */}
      <header style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 400, color: '#111', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>{name}</h1>
        {pi.jobTitle && <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', letterSpacing: '0.06em' }}>{pi.jobTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '10px', fontSize: '10.5px', color: '#777' }}>
          {pi.email && <span>{pi.email}</span>}
          {pi.email && pi.phone && <span>|</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.phone && pi.location && <span>|</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.linkedin && <><span>|</span><span>{pi.linkedin}</span></>}
          {pi.github && <><span>|</span><span>{pi.github}</span></>}
          {pi.website && <><span>|</span><span>{pi.website}</span></>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.summary && (
        <section style={{ marginBottom: '18px' }}>
          <MinimalSectionTitle>Profile</MinimalSectionTitle>
          <p style={{ fontSize: '11.5px', color: '#444', lineHeight: 1.7, textAlign: 'justify' }}>{resumeData.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <MinimalSectionTitle>Experience</MinimalSectionTitle>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#222' }}>{exp.position}</p>
                <p style={{ fontSize: '10.5px', color: '#888', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                  {formatDate(exp.startDate, 'short')} – {exp.current ? 'Present' : formatDate(exp.endDate, 'short')}
                </p>
              </div>
              <p style={{ fontSize: '11.5px', color: '#555', fontStyle: 'italic' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              {exp.description && (
                <div style={{ marginTop: '5px' }}>
                  {exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} style={{ fontSize: '11px', color: '#444', lineHeight: 1.6, marginBottom: '1px' }}>
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
        <section style={{ marginBottom: '18px' }}>
          <MinimalSectionTitle>Education</MinimalSectionTitle>
          {resumeData.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#222' }}>{edu.institution}</p>
                  <p style={{ fontSize: '11.5px', color: '#555', fontStyle: 'italic' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                </div>
                <p style={{ fontSize: '10.5px', color: '#888', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                  {formatDate(edu.startDate, 'short')} – {edu.current ? 'Present' : formatDate(edu.endDate, 'short')}
                </p>
              </div>
              {edu.gpa && <p style={{ fontSize: '10.5px', color: '#777', marginTop: '2px' }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <MinimalSectionTitle>Skills</MinimalSectionTitle>
          {resumeData.skills.map((cat) => cat.skills.length > 0 && (
            <div key={cat.id} style={{ marginBottom: '4px', fontSize: '11.5px', color: '#444' }}>
              {cat.name && <span style={{ fontWeight: 700, color: '#222' }}>{cat.name}: </span>}
              <span>{cat.skills.join(', ')}</span>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <MinimalSectionTitle>Projects</MinimalSectionTitle>
          {resumeData.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#222' }}>{proj.name}</p>
                {proj.technologies.length > 0 && (
                  <span style={{ fontSize: '10px', color: '#777', fontStyle: 'italic' }}>
                    ({proj.technologies.slice(0, 4).join(', ')})
                  </span>
                )}
              </div>
              {proj.description && <p style={{ fontSize: '11px', color: '#444', lineHeight: 1.6, marginTop: '3px' }}>{proj.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function MinimalSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 400, color: '#222', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{children}</h2>
      <div style={{ height: '0.5px', background: '#ccc', marginTop: '4px' }} />
    </div>
  );
}
