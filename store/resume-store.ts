'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { ResumeData, ResumeVersion, SectionKey } from '@/types/resume';
import { DEFAULT_RESUME } from '@/types/resume';
import { generateId } from '@/lib/utils';

interface ResumeStore {
  // Current resume
  resume: ResumeData;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: string | null;

  // Version history
  versions: ResumeVersion[];

  // UI state
  activeSection: SectionKey | null;
  previewScale: number;
  showCustomization: boolean;
  showAIPanel: boolean;
  showVersionHistory: boolean;

  // Actions — Resume
  setResume: (resume: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;

  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, data: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<ResumeData['languages'][0]>) => void;
  removeLanguage: (id: string) => void;

  updateCustomization: (data: Partial<ResumeData['customization']>) => void;
  toggleSection: (key: SectionKey) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;

  // Actions — Version history
  saveVersion: (label?: string) => void;
  restoreVersion: (versionId: string) => void;

  // Actions — UI
  setActiveSection: (section: SectionKey | null) => void;
  setPreviewScale: (scale: number) => void;
  toggleCustomization: () => void;
  toggleAIPanel: () => void;
  toggleVersionHistory: () => void;
  setIsSaving: (saving: boolean) => void;
  setLastSaved: (time: string) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    subscribeWithSelector(
      immer((set, get) => ({
        resume: { ...DEFAULT_RESUME, id: generateId() },
        isDirty: false,
        isSaving: false,
        lastSaved: null,
        versions: [],
        activeSection: null,
        previewScale: 0.7,
        showCustomization: false,
        showAIPanel: false,
        showVersionHistory: false,

        setResume: (resume) =>
          set((state) => {
            state.resume = resume;
            state.isDirty = false;
          }),

        updatePersonalInfo: (info) =>
          set((state) => {
            Object.assign(state.resume.personalInfo, info);
            state.isDirty = true;
          }),

        updateSummary: (summary) =>
          set((state) => {
            state.resume.summary = summary;
            state.isDirty = true;
          }),

        addExperience: () =>
          set((state) => {
            state.resume.experience.push({
              id: generateId(),
              company: '',
              position: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
              highlights: [],
            });
            state.isDirty = true;
          }),

        updateExperience: (id, data) =>
          set((state) => {
            const idx = state.resume.experience.findIndex((e) => e.id === id);
            if (idx !== -1) Object.assign(state.resume.experience[idx], data);
            state.isDirty = true;
          }),

        removeExperience: (id) =>
          set((state) => {
            state.resume.experience = state.resume.experience.filter((e) => e.id !== id);
            state.isDirty = true;
          }),

        reorderExperience: (fromIndex, toIndex) =>
          set((state) => {
            const items = state.resume.experience.splice(fromIndex, 1);
            state.resume.experience.splice(toIndex, 0, ...items);
            state.isDirty = true;
          }),

        addEducation: () =>
          set((state) => {
            state.resume.education.push({
              id: generateId(),
              institution: '',
              degree: '',
              field: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              gpa: '',
              description: '',
            });
            state.isDirty = true;
          }),

        updateEducation: (id, data) =>
          set((state) => {
            const idx = state.resume.education.findIndex((e) => e.id === id);
            if (idx !== -1) Object.assign(state.resume.education[idx], data);
            state.isDirty = true;
          }),

        removeEducation: (id) =>
          set((state) => {
            state.resume.education = state.resume.education.filter((e) => e.id !== id);
            state.isDirty = true;
          }),

        addSkill: () =>
          set((state) => {
            state.resume.skills.push({ id: generateId(), name: '', level: 'intermediate', category: '' });
            state.isDirty = true;
          }),

        updateSkill: (id, data) =>
          set((state) => {
            const idx = state.resume.skills.findIndex((s) => s.id === id);
            if (idx !== -1) Object.assign(state.resume.skills[idx], data);
            state.isDirty = true;
          }),

        removeSkill: (id) =>
          set((state) => {
            state.resume.skills = state.resume.skills.filter((s) => s.id !== id);
            state.isDirty = true;
          }),

        addProject: () =>
          set((state) => {
            state.resume.projects.push({
              id: generateId(),
              name: '',
              description: '',
              url: '',
              github: '',
              technologies: [],
              startDate: '',
              endDate: '',
              current: false,
              highlights: [],
            });
            state.isDirty = true;
          }),

        updateProject: (id, data) =>
          set((state) => {
            const idx = state.resume.projects.findIndex((p) => p.id === id);
            if (idx !== -1) Object.assign(state.resume.projects[idx], data);
            state.isDirty = true;
          }),

        removeProject: (id) =>
          set((state) => {
            state.resume.projects = state.resume.projects.filter((p) => p.id !== id);
            state.isDirty = true;
          }),

        addCertification: () =>
          set((state) => {
            state.resume.certifications.push({
              id: generateId(),
              name: '',
              issuer: '',
              date: '',
              expiry: '',
              credentialId: '',
              url: '',
            });
            state.isDirty = true;
          }),

        updateCertification: (id, data) =>
          set((state) => {
            const idx = state.resume.certifications.findIndex((c) => c.id === id);
            if (idx !== -1) Object.assign(state.resume.certifications[idx], data);
            state.isDirty = true;
          }),

        removeCertification: (id) =>
          set((state) => {
            state.resume.certifications = state.resume.certifications.filter((c) => c.id !== id);
            state.isDirty = true;
          }),

        addLanguage: () =>
          set((state) => {
            state.resume.languages.push({ id: generateId(), name: '', level: 'professional' });
            state.isDirty = true;
          }),

        updateLanguage: (id, data) =>
          set((state) => {
            const idx = state.resume.languages.findIndex((l) => l.id === id);
            if (idx !== -1) Object.assign(state.resume.languages[idx], data);
            state.isDirty = true;
          }),

        removeLanguage: (id) =>
          set((state) => {
            state.resume.languages = state.resume.languages.filter((l) => l.id !== id);
            state.isDirty = true;
          }),

        updateCustomization: (data) =>
          set((state) => {
            Object.assign(state.resume.customization, data);
            state.isDirty = true;
          }),

        toggleSection: (key) =>
          set((state) => {
            const section = state.resume.sections.find((s) => s.key === key);
            if (section) section.visible = !section.visible;
            state.isDirty = true;
          }),

        reorderSections: (fromIndex, toIndex) =>
          set((state) => {
            const items = state.resume.sections.splice(fromIndex, 1);
            state.resume.sections.splice(toIndex, 0, ...items);
            state.resume.sections.forEach((s, i) => (s.order = i));
            state.isDirty = true;
          }),

        saveVersion: (label) =>
          set((state) => {
            const version: ResumeVersion = {
              id: generateId(),
              resumeId: state.resume.id,
              snapshot: JSON.parse(JSON.stringify(state.resume)),
              createdAt: new Date().toISOString(),
              label,
            };
            state.versions.unshift(version);
            if (state.versions.length > 20) state.versions.pop();
          }),

        restoreVersion: (versionId) =>
          set((state) => {
            const version = state.versions.find((v) => v.id === versionId);
            if (version) {
              state.resume = JSON.parse(JSON.stringify(version.snapshot));
              state.isDirty = true;
            }
          }),

        setActiveSection: (section) =>
          set((state) => {
            state.activeSection = section;
          }),

        setPreviewScale: (scale) =>
          set((state) => {
            state.previewScale = scale;
          }),

        toggleCustomization: () =>
          set((state) => {
            state.showCustomization = !state.showCustomization;
            if (state.showCustomization) {
              state.showAIPanel = false;
              state.showVersionHistory = false;
            }
          }),

        toggleAIPanel: () =>
          set((state) => {
            state.showAIPanel = !state.showAIPanel;
            if (state.showAIPanel) {
              state.showCustomization = false;
              state.showVersionHistory = false;
            }
          }),

        toggleVersionHistory: () =>
          set((state) => {
            state.showVersionHistory = !state.showVersionHistory;
            if (state.showVersionHistory) {
              state.showCustomization = false;
              state.showAIPanel = false;
            }
          }),

        setIsSaving: (saving) =>
          set((state) => {
            state.isSaving = saving;
          }),

        setLastSaved: (time) =>
          set((state) => {
            state.lastSaved = time;
            state.isDirty = false;
          }),
      }))
    ),
    {
      name: 'ai-resume-store',
      partialize: (state) => ({
        resume: state.resume,
        versions: state.versions,
      }),
    }
  )
);
