import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {
  ResumeData,
  WorkExperience,
  Education,
  SkillCategory,
  Project,
  Certification,
  Award,
  Publication,
  Research,
  Language,
  Interest,
  VolunteerExperience,
  Reference,
  CustomSection,
  SectionConfig,
  ResumeCustomization,
  PersonalInfo,
  VersionHistoryEntry,
} from '@/types/resume';
import { defaultResumeData } from '@/types/resume';
import { nanoid } from '@/lib/utils';

interface ResumeStore {
  // State
  documentId: string | null;
  documentTitle: string;
  resumeData: ResumeData;
  versionHistory: VersionHistoryEntry[];
  isDirty: boolean;
  lastSaved: Date | null;
  activeSection: string;
  previewScale: number;
  isAIPanelOpen: boolean;
  isCustomizationPanelOpen: boolean;
  isVersionHistoryOpen: boolean;

  // Actions — Document
  setDocumentId: (id: string) => void;
  setDocumentTitle: (title: string) => void;
  loadResumeData: (data: ResumeData) => void;
  resetResume: () => void;
  markClean: () => void;
  markDirty: () => void;

  // Actions — Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Actions — Summary
  updateSummary: (summary: string) => void;

  // Actions — Experience
  addExperience: (exp?: Partial<WorkExperience>) => void;
  updateExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (from: number, to: number) => void;

  // Actions — Education
  addEducation: (edu?: Partial<Education>) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Actions — Skills
  addSkillCategory: (cat?: Partial<SkillCategory>) => void;
  updateSkillCategory: (id: string, data: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;

  // Actions — Projects
  addProject: (proj?: Partial<Project>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Actions — Certifications
  addCertification: (cert?: Partial<Certification>) => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Actions — Awards
  addAward: (award?: Partial<Award>) => void;
  updateAward: (id: string, data: Partial<Award>) => void;
  removeAward: (id: string) => void;

  // Actions — Publications
  addPublication: (pub?: Partial<Publication>) => void;
  updatePublication: (id: string, data: Partial<Publication>) => void;
  removePublication: (id: string) => void;

  // Actions — Research
  addResearch: (res?: Partial<Research>) => void;
  updateResearch: (id: string, data: Partial<Research>) => void;
  removeResearch: (id: string) => void;

  // Actions — Languages
  addLanguage: (lang?: Partial<Language>) => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Actions — Interests
  addInterest: (interest?: Partial<Interest>) => void;
  updateInterest: (id: string, data: Partial<Interest>) => void;
  removeInterest: (id: string) => void;

  // Actions — Volunteer
  addVolunteer: (vol?: Partial<VolunteerExperience>) => void;
  updateVolunteer: (id: string, data: Partial<VolunteerExperience>) => void;
  removeVolunteer: (id: string) => void;

  // Actions — References
  addReference: (ref?: Partial<Reference>) => void;
  updateReference: (id: string, data: Partial<Reference>) => void;
  removeReference: (id: string) => void;

  // Actions — Custom Sections
  addCustomSection: () => void;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;

  // Actions — Section Order
  updateSectionOrder: (sections: SectionConfig[]) => void;
  toggleSection: (id: string) => void;

  // Actions — Customization
  updateCustomization: (data: Partial<ResumeCustomization>) => void;
  setTemplate: (templateId: string) => void;

  // Actions — UI
  setActiveSection: (section: string) => void;
  setPreviewScale: (scale: number) => void;
  toggleAIPanel: () => void;
  toggleCustomizationPanel: () => void;
  toggleVersionHistory: () => void;

  // Actions — Version History
  saveVersion: (label?: string) => void;
  restoreVersion: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>()(
  devtools(
    immer((set) => ({
        // Initial state
        documentId: null,
        documentTitle: 'Untitled Resume',
        resumeData: defaultResumeData,
        versionHistory: [],
        isDirty: false,
        lastSaved: null,
        activeSection: 'personalInfo',
        previewScale: 0.7,
        isAIPanelOpen: false,
        isCustomizationPanelOpen: false,
        isVersionHistoryOpen: false,

        // Document actions
        setDocumentId: (id) => set((s) => { s.documentId = id; }),
        setDocumentTitle: (title) => set((s) => { s.documentTitle = title; s.isDirty = true; }),
        loadResumeData: (data) => set((s) => { s.resumeData = data; s.isDirty = false; }),
        resetResume: () => set((s) => { s.resumeData = defaultResumeData; s.isDirty = false; }),
        markClean: () => set((s) => { s.isDirty = false; s.lastSaved = new Date(); }),
        markDirty: () => set((s) => { s.isDirty = true; }),

        // Personal info
        updatePersonalInfo: (info) => set((s) => {
          Object.assign(s.resumeData.personalInfo, info);
          s.isDirty = true;
        }),

        // Summary
        updateSummary: (summary) => set((s) => { s.resumeData.summary = summary; s.isDirty = true; }),

        // Experience
        addExperience: (exp) => set((s) => {
          s.resumeData.experience.push({
            id: nanoid(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            highlights: [],
            ...exp,
          });
          s.isDirty = true;
        }),
        updateExperience: (id, data) => set((s) => {
          const idx = s.resumeData.experience.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.experience[idx], data);
          s.isDirty = true;
        }),
        removeExperience: (id) => set((s) => {
          s.resumeData.experience = s.resumeData.experience.filter((e) => e.id !== id);
          s.isDirty = true;
        }),
        reorderExperience: (from, to) => set((s) => {
          const [item] = s.resumeData.experience.splice(from, 1);
          s.resumeData.experience.splice(to, 0, item);
          s.isDirty = true;
        }),

        // Education
        addEducation: (edu) => set((s) => {
          s.resumeData.education.push({ id: nanoid(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, ...edu });
          s.isDirty = true;
        }),
        updateEducation: (id, data) => set((s) => {
          const idx = s.resumeData.education.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.education[idx], data);
          s.isDirty = true;
        }),
        removeEducation: (id) => set((s) => {
          s.resumeData.education = s.resumeData.education.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Skills
        addSkillCategory: (cat) => set((s) => {
          s.resumeData.skills.push({ id: nanoid(), name: 'Skills', skills: [], ...cat });
          s.isDirty = true;
        }),
        updateSkillCategory: (id, data) => set((s) => {
          const idx = s.resumeData.skills.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.skills[idx], data);
          s.isDirty = true;
        }),
        removeSkillCategory: (id) => set((s) => {
          s.resumeData.skills = s.resumeData.skills.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Projects
        addProject: (proj) => set((s) => {
          s.resumeData.projects.push({ id: nanoid(), name: '', description: '', highlights: [], technologies: [], ...proj });
          s.isDirty = true;
        }),
        updateProject: (id, data) => set((s) => {
          const idx = s.resumeData.projects.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.projects[idx], data);
          s.isDirty = true;
        }),
        removeProject: (id) => set((s) => {
          s.resumeData.projects = s.resumeData.projects.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Certifications
        addCertification: (cert) => set((s) => {
          s.resumeData.certifications.push({ id: nanoid(), name: '', issuer: '', date: '', ...cert });
          s.isDirty = true;
        }),
        updateCertification: (id, data) => set((s) => {
          const idx = s.resumeData.certifications.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.certifications[idx], data);
          s.isDirty = true;
        }),
        removeCertification: (id) => set((s) => {
          s.resumeData.certifications = s.resumeData.certifications.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Awards
        addAward: (award) => set((s) => {
          s.resumeData.awards.push({ id: nanoid(), title: '', issuer: '', date: '', ...award });
          s.isDirty = true;
        }),
        updateAward: (id, data) => set((s) => {
          const idx = s.resumeData.awards.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.awards[idx], data);
          s.isDirty = true;
        }),
        removeAward: (id) => set((s) => {
          s.resumeData.awards = s.resumeData.awards.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Publications
        addPublication: (pub) => set((s) => {
          s.resumeData.publications.push({ id: nanoid(), title: '', ...pub });
          s.isDirty = true;
        }),
        updatePublication: (id, data) => set((s) => {
          const idx = s.resumeData.publications.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.publications[idx], data);
          s.isDirty = true;
        }),
        removePublication: (id) => set((s) => {
          s.resumeData.publications = s.resumeData.publications.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Research
        addResearch: (res) => set((s) => {
          s.resumeData.research.push({ id: nanoid(), title: '', description: '', ...res });
          s.isDirty = true;
        }),
        updateResearch: (id, data) => set((s) => {
          const idx = s.resumeData.research.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.research[idx], data);
          s.isDirty = true;
        }),
        removeResearch: (id) => set((s) => {
          s.resumeData.research = s.resumeData.research.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Languages
        addLanguage: (lang) => set((s) => {
          s.resumeData.languages.push({ id: nanoid(), name: '', proficiency: 'professional', ...lang });
          s.isDirty = true;
        }),
        updateLanguage: (id, data) => set((s) => {
          const idx = s.resumeData.languages.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.languages[idx], data);
          s.isDirty = true;
        }),
        removeLanguage: (id) => set((s) => {
          s.resumeData.languages = s.resumeData.languages.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Interests
        addInterest: (interest) => set((s) => {
          s.resumeData.interests.push({ id: nanoid(), name: '', ...interest });
          s.isDirty = true;
        }),
        updateInterest: (id, data) => set((s) => {
          const idx = s.resumeData.interests.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.interests[idx], data);
          s.isDirty = true;
        }),
        removeInterest: (id) => set((s) => {
          s.resumeData.interests = s.resumeData.interests.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Volunteer
        addVolunteer: (vol) => set((s) => {
          s.resumeData.volunteer.push({ id: nanoid(), organization: '', role: '', startDate: '', endDate: '', current: false, description: '', ...vol });
          s.isDirty = true;
        }),
        updateVolunteer: (id, data) => set((s) => {
          const idx = s.resumeData.volunteer.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.volunteer[idx], data);
          s.isDirty = true;
        }),
        removeVolunteer: (id) => set((s) => {
          s.resumeData.volunteer = s.resumeData.volunteer.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // References
        addReference: (ref) => set((s) => {
          s.resumeData.references.push({ id: nanoid(), name: '', title: '', company: '', ...ref });
          s.isDirty = true;
        }),
        updateReference: (id, data) => set((s) => {
          const idx = s.resumeData.references.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.references[idx], data);
          s.isDirty = true;
        }),
        removeReference: (id) => set((s) => {
          s.resumeData.references = s.resumeData.references.filter((e) => e.id !== id);
          s.isDirty = true;
        }),

        // Custom Sections
        addCustomSection: () => set((s) => {
          const id = nanoid();
          s.resumeData.customSections.push({ id, title: 'Custom Section', items: [] });
          s.resumeData.sectionOrder.push({ id: `custom-${id}`, label: 'Custom Section', enabled: true, order: s.resumeData.sectionOrder.length, customId: id });
          s.isDirty = true;
        }),
        updateCustomSection: (id, data) => set((s) => {
          const idx = s.resumeData.customSections.findIndex((e) => e.id === id);
          if (idx !== -1) Object.assign(s.resumeData.customSections[idx], data);
          s.isDirty = true;
        }),
        removeCustomSection: (id) => set((s) => {
          s.resumeData.customSections = s.resumeData.customSections.filter((e) => e.id !== id);
          s.resumeData.sectionOrder = s.resumeData.sectionOrder.filter((e) => e.customId !== id);
          s.isDirty = true;
        }),

        // Section Order
        updateSectionOrder: (sections) => set((s) => { s.resumeData.sectionOrder = sections; s.isDirty = true; }),
        toggleSection: (id) => set((s) => {
          const idx = s.resumeData.sectionOrder.findIndex((e) => e.id === id);
          if (idx !== -1) s.resumeData.sectionOrder[idx].enabled = !s.resumeData.sectionOrder[idx].enabled;
          s.isDirty = true;
        }),

        // Customization
        updateCustomization: (data) => set((s) => { Object.assign(s.resumeData.customization, data); s.isDirty = true; }),
        setTemplate: (templateId) => set((s) => { s.resumeData.customization.template = templateId; s.isDirty = true; }),

        // UI
        setActiveSection: (section) => set((s) => { s.activeSection = section; }),
        setPreviewScale: (scale) => set((s) => { s.previewScale = scale; }),
        toggleAIPanel: () => set((s) => { s.isAIPanelOpen = !s.isAIPanelOpen; }),
        toggleCustomizationPanel: () => set((s) => { s.isCustomizationPanelOpen = !s.isCustomizationPanelOpen; }),
        toggleVersionHistory: () => set((s) => { s.isVersionHistoryOpen = !s.isVersionHistoryOpen; }),

        // Version History
        saveVersion: (label) => set((s) => {
          s.versionHistory.unshift({
            id: nanoid(),
            documentId: s.documentId || '',
            snapshot: JSON.parse(JSON.stringify(s.resumeData)),
            createdAt: new Date(),
            label,
          });
          // Keep only last 20 versions
          if (s.versionHistory.length > 20) s.versionHistory = s.versionHistory.slice(0, 20);
        }),
        restoreVersion: (id) => set((s) => {
          const version = s.versionHistory.find((v) => v.id === id);
          if (version) {
            s.resumeData = JSON.parse(JSON.stringify(version.snapshot));
            s.isDirty = true;
          }
        }),
      })),
    { name: 'ResumeStore' }
  )
);
