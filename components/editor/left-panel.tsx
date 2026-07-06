'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

// ─── Section nav items ───────────────────────────────────────────────────────
const sectionItems = [
  { id: 'personalInfo', label: 'Personal Info', emoji: '👤' },
  { id: 'summary', label: 'Summary', emoji: '📝' },
  { id: 'experience', label: 'Experience', emoji: '💼' },
  { id: 'education', label: 'Education', emoji: '🎓' },
  { id: 'skills', label: 'Skills', emoji: '⚡' },
  { id: 'projects', label: 'Projects', emoji: '🚀' },
  { id: 'certifications', label: 'Certifications', emoji: '🏅' },
  { id: 'languages', label: 'Languages', emoji: '🌐' },
  { id: 'awards', label: 'Awards', emoji: '🏆' },
  { id: 'volunteer', label: 'Volunteer', emoji: '🤝' },
  { id: 'references', label: 'References', emoji: '💬' },
];

// ─── Section forms ────────────────────────────────────────────────────────────

function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const pi = resumeData.personalInfo;
  const field = (label: string, key: keyof typeof pi, type = 'text', placeholder = '') => (
    <div key={key}>
      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={(pi[key] ?? '') as string}
        onChange={(e) => updatePersonalInfo({ [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {field('First Name', 'firstName', 'text', 'Jane')}
        {field('Last Name', 'lastName', 'text', 'Smith')}
      </div>
      {field('Job Title', 'jobTitle', 'text', 'Software Engineer')}
      {field('Email', 'email', 'email', 'jane@example.com')}
      {field('Phone', 'phone', 'tel', '+1 (555) 000-0000')}
      {field('Location', 'location', 'text', 'San Francisco, CA')}
      {field('LinkedIn', 'linkedin', 'url', 'linkedin.com/in/janesmith')}
      {field('GitHub', 'github', 'url', 'github.com/janesmith')}
      {field('Website', 'website', 'url', 'janesmith.com')}
    </div>
  );
}

function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider">Professional Summary</label>
      <textarea
        value={resumeData.summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={6}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all duration-200 resize-none"
      />
      <p className="text-xs text-white/30">{resumeData.summary.length} characters · Aim for 2-4 sentences</p>
    </div>
  );
}

function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(resumeData.experience[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="rounded-xl border border-white/8 overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-white">{exp.position || 'New Position'}</p>
              <p className="text-xs text-white/40">{exp.company || 'Company'}</p>
            </div>
            <ChevronRight className={cn('w-4 h-4 text-white/30 transition-transform', expandedId === exp.id && 'rotate-90')} />
          </button>
          {expandedId === exp.id && (
            <div className="px-3 pb-3 space-y-3 border-t border-white/5">
              {[
                { label: 'Position', key: 'position' as const, placeholder: 'Software Engineer' },
                { label: 'Company', key: 'company' as const, placeholder: 'Google' },
                { label: 'Location', key: 'location' as const, placeholder: 'Mountain View, CA' },
                { label: 'Start Date', key: 'startDate' as const, placeholder: 'Jan 2022' },
                { label: 'End Date', key: 'endDate' as const, placeholder: 'Present' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-white/40 mb-1">{label}</label>
                  <input
                    type="text"
                    value={(exp[key] ?? '') as string}
                    onChange={(e) => updateExperience(exp.id, { [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-white/40 mb-1">Description / Highlights</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  rows={4}
                  placeholder="• Led development of core payment infrastructure serving 10M+ users&#10;• Reduced API latency by 40% through query optimization"
                  className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                />
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors"
              >
                Remove entry
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => addExperience()}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-indigo-400 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-all duration-200"
      >
        + Add Experience
      </button>
    </div>
  );
}

function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(resumeData.education[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="rounded-xl border border-white/8 overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-white">{edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}</p>
              <p className="text-xs text-white/40">{edu.institution || 'Institution'}</p>
            </div>
            <ChevronRight className={cn('w-4 h-4 text-white/30 transition-transform', expandedId === edu.id && 'rotate-90')} />
          </button>
          {expandedId === edu.id && (
            <div className="px-3 pb-3 space-y-3 border-t border-white/5">
              {[
                { label: 'Institution', key: 'institution' as const, placeholder: 'Stanford University' },
                { label: 'Degree', key: 'degree' as const, placeholder: 'B.S.' },
                { label: 'Field of Study', key: 'field' as const, placeholder: 'Computer Science' },
                { label: 'Start Date', key: 'startDate' as const, placeholder: 'Sep 2018' },
                { label: 'End Date', key: 'endDate' as const, placeholder: 'May 2022' },
                { label: 'GPA', key: 'gpa' as const, placeholder: '3.9/4.0' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-white/40 mb-1">{label}</label>
                  <input
                    type="text"
                    value={(edu[key] ?? '') as string}
                    onChange={(e) => updateEducation(edu.id, { [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              ))}
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-xs text-rose-400/70 hover:text-rose-400 transition-colors"
              >
                Remove entry
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => addEducation()}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-indigo-400 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-all duration-200"
      >
        + Add Education
      </button>
    </div>
  );
}

function SkillsForm() {
  const { resumeData, addSkillCategory, updateSkillCategory, removeSkillCategory } = useResumeStore();

  return (
    <div className="space-y-3">
      {resumeData.skills.map((cat) => (
        <div key={cat.id} className="p-3 rounded-xl border border-white/8 space-y-2">
          <input
            type="text"
            value={cat.name}
            onChange={(e) => updateSkillCategory(cat.id, { name: e.target.value })}
            placeholder="Category (e.g. Frontend)"
            className="w-full px-3 py-2 rounded-lg text-sm font-semibold text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
          <input
            type="text"
            value={cat.skills.join(', ')}
            onChange={(e) => updateSkillCategory(cat.id, { skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            placeholder="React, TypeScript, Node.js, GraphQL"
            className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
          <p className="text-xs text-white/25">Separate skills with commas</p>
          <button onClick={() => removeSkillCategory(cat.id)} className="text-xs text-rose-400/60 hover:text-rose-400 transition-colors">Remove category</button>
        </div>
      ))}
      <button
        onClick={() => addSkillCategory()}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-indigo-400 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-all duration-200"
      >
        + Add Skill Category
      </button>
    </div>
  );
}

function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(resumeData.projects[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {resumeData.projects.map((proj) => (
        <div key={proj.id} className="rounded-xl border border-white/8 overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
            className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors"
          >
            <p className="text-sm font-semibold text-white">{proj.name || 'New Project'}</p>
            <ChevronRight className={cn('w-4 h-4 text-white/30 transition-transform', expandedId === proj.id && 'rotate-90')} />
          </button>
          {expandedId === proj.id && (
            <div className="px-3 pb-3 space-y-3 border-t border-white/5">
              {[
                { label: 'Project Name', key: 'name' as const, placeholder: 'ResumeAI' },
                { label: 'URL', key: 'url' as const, placeholder: 'https://resumeai.app' },
                { label: 'GitHub', key: 'github' as const, placeholder: 'github.com/you/project' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-white/40 mb-1">{label}</label>
                  <input
                    type="text"
                    value={(proj[key] ?? '') as string}
                    onChange={(e) => updateProject(proj.id, { [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-white/40 mb-1">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  rows={3}
                  placeholder="Built a full-stack AI resume builder with Next.js and OpenAI API..."
                  className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={proj.technologies.join(', ')}
                  onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  placeholder="Next.js, TypeScript, PostgreSQL"
                  className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <button onClick={() => removeProject(proj.id)} className="text-xs text-rose-400/60 hover:text-rose-400 transition-colors">Remove project</button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => addProject()}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-indigo-400 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-all duration-200"
      >
        + Add Project
      </button>
    </div>
  );
}

function GenericPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-white/30 text-sm">{label} section coming soon</p>
    </div>
  );
}

// ─── Left Panel ───────────────────────────────────────────────────────────────
export function EditorLeftPanel() {
  const { activeSection, setActiveSection } = useResumeStore();

  const renderForm = () => {
    switch (activeSection) {
      case 'personalInfo': return <PersonalInfoForm />;
      case 'summary': return <SummaryForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      case 'projects': return <ProjectsForm />;
      default: return <GenericPlaceholder label={sectionItems.find((s) => s.id === activeSection)?.label ?? activeSection} />;
    }
  };

  return (
    <>
      {/* Section tabs */}
      <div className="flex-shrink-0 border-b border-white/5 overflow-x-auto">
        <div className="flex gap-0.5 p-2 min-w-max">
          {sectionItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap',
                activeSection === item.id
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              )}
              style={activeSection === item.id ? { background: 'rgba(79,70,229,0.2)', border: '1px solid rgba(79,70,229,0.3)' } : {}}
            >
              <span>{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderForm()}
      </div>
    </>
  );
}
