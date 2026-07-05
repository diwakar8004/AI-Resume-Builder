// ─────────────────────────────────────────────
// Core Resume Types
// ─────────────────────────────────────────────

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  honors?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  github?: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  current?: boolean;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  url?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  authors?: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'elementary' | 'limited' | 'professional' | 'full' | 'native';
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets: string[];
}

// ─────────────────────────────────────────────
// Template & Customization Types
// ─────────────────────────────────────────────

export type TemplateId =
  | 'modern'
  | 'minimal'
  | 'professional'
  | 'ats-friendly'
  | 'executive'
  | 'corporate'
  | 'creative'
  | 'designer'
  | 'software-engineer'
  | 'data-scientist'
  | 'product-manager'
  | 'student'
  | 'fresher'
  | 'academic-cv'
  | 'research-cv'
  | 'medical'
  | 'finance'
  | 'marketing'
  | 'legal'
  | 'elegant'
  | 'timeline'
  | 'two-column'
  | 'single-column'
  | 'european'
  | 'startup'
  | 'premium-dark'
  | 'minimal-bw';

export type FontFamily =
  | 'Inter'
  | 'Outfit'
  | 'Roboto'
  | 'Playfair Display'
  | 'Merriweather'
  | 'Source Sans Pro'
  | 'Open Sans'
  | 'Lato'
  | 'Poppins'
  | 'Georgia';

export interface ResumeCustomization {
  template: TemplateId;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: FontFamily;
  fontSize: 'sm' | 'md' | 'lg';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  margins: 'narrow' | 'normal' | 'wide';
  showPhoto: boolean;
  showIcons: boolean;
}

// ─────────────────────────────────────────────
// Section Visibility & Order
// ─────────────────────────────────────────────

export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'publications'
  | 'languages'
  | 'volunteer'
  | 'references'
  | 'interests'
  | 'social'
  | 'custom';

export interface SectionConfig {
  key: SectionKey;
  label: string;
  visible: boolean;
  order: number;
}

// ─────────────────────────────────────────────
// Main Resume Data Type
// ─────────────────────────────────────────────

export interface ResumeData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  languages: Language[];
  volunteer: VolunteerExperience[];
  references: Reference[];
  interests: string[];
  socialLinks: SocialLink[];
  customSections: CustomSection[];
  customization: ResumeCustomization;
  sections: SectionConfig[];
}

// ─────────────────────────────────────────────
// Version History
// ─────────────────────────────────────────────

export interface ResumeVersion {
  id: string;
  resumeId: string;
  snapshot: ResumeData;
  createdAt: string;
  label?: string;
}

// ─────────────────────────────────────────────
// ATS Score
// ─────────────────────────────────────────────

export interface ATSScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    completeness: number;
    readability: number;
  };
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
}

// ─────────────────────────────────────────────
// Cover Letter Types
// ─────────────────────────────────────────────

export interface CoverLetterData {
  id: string;
  title: string;
  recipientName?: string;
  recipientTitle?: string;
  company: string;
  jobTitle: string;
  content: string;
  tone: 'formal' | 'friendly' | 'confident' | 'creative';
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Default Resume Data
// ─────────────────────────────────────────────

export const DEFAULT_RESUME: ResumeData = {
  id: '',
  title: 'My Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    photo: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  awards: [],
  publications: [],
  languages: [],
  volunteer: [],
  references: [],
  interests: [],
  socialLinks: [],
  customSections: [],
  customization: {
    template: 'modern',
    primaryColor: '#4F46E5',
    secondaryColor: '#7C3AED',
    accentColor: '#10B981',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 'md',
    lineHeight: 'normal',
    margins: 'normal',
    showPhoto: true,
    showIcons: true,
  },
  sections: [
    { key: 'summary', label: 'Professional Summary', visible: true, order: 0 },
    { key: 'experience', label: 'Work Experience', visible: true, order: 1 },
    { key: 'education', label: 'Education', visible: true, order: 2 },
    { key: 'skills', label: 'Skills', visible: true, order: 3 },
    { key: 'projects', label: 'Projects', visible: true, order: 4 },
    { key: 'certifications', label: 'Certifications', visible: true, order: 5 },
    { key: 'awards', label: 'Awards', visible: false, order: 6 },
    { key: 'publications', label: 'Publications', visible: false, order: 7 },
    { key: 'languages', label: 'Languages', visible: false, order: 8 },
    { key: 'volunteer', label: 'Volunteer', visible: false, order: 9 },
    { key: 'references', label: 'References', visible: false, order: 10 },
    { key: 'interests', label: 'Interests', visible: false, order: 11 },
    { key: 'custom', label: 'Custom Section', visible: false, order: 12 },
  ],
};

export const TEMPLATE_META: Record<TemplateId, { name: string; description: string; category: string; isPremium: boolean }> = {
  'modern': { name: 'Modern', description: 'Two-column layout with blue accent', category: 'Popular', isPremium: false },
  'minimal': { name: 'Minimal', description: 'Clean single-column with lots of whitespace', category: 'Popular', isPremium: false },
  'professional': { name: 'Professional', description: 'Classic single-column serif heading', category: 'Popular', isPremium: false },
  'ats-friendly': { name: 'ATS Friendly', description: 'Optimized for applicant tracking systems', category: 'Practical', isPremium: false },
  'executive': { name: 'Executive', description: 'Bold header with full bleed color block', category: 'Premium', isPremium: true },
  'corporate': { name: 'Corporate', description: 'Navy & grey structured grid layout', category: 'Business', isPremium: false },
  'creative': { name: 'Creative', description: 'Diagonal elements with bold typography', category: 'Creative', isPremium: true },
  'designer': { name: 'Designer', description: 'Grid-based portfolio style', category: 'Creative', isPremium: true },
  'software-engineer': { name: 'Software Engineer', description: 'Code-inspired with monospace accents', category: 'Tech', isPremium: false },
  'data-scientist': { name: 'Data Scientist', description: 'Chart-like skill bars, technical feel', category: 'Tech', isPremium: false },
  'product-manager': { name: 'Product Manager', description: 'Metrics-focused timeline layout', category: 'Business', isPremium: false },
  'student': { name: 'Student', description: 'Fresh and bright, education-first', category: 'Entry Level', isPremium: false },
  'fresher': { name: 'Fresher', description: 'Entry-level friendly with skills emphasis', category: 'Entry Level', isPremium: false },
  'academic-cv': { name: 'Academic CV', description: 'Multi-page academic sections', category: 'Academic', isPremium: false },
  'research-cv': { name: 'Research CV', description: 'Citation-style, publication-heavy', category: 'Academic', isPremium: true },
  'medical': { name: 'Medical', description: 'Clean clinical style with serif', category: 'Specialized', isPremium: true },
  'finance': { name: 'Finance', description: 'Conservative Bloomberg-inspired', category: 'Business', isPremium: false },
  'marketing': { name: 'Marketing', description: 'Bold colors with portfolio blocks', category: 'Creative', isPremium: false },
  'legal': { name: 'Legal', description: 'Traditional serif formal layout', category: 'Specialized', isPremium: true },
  'elegant': { name: 'Elegant', description: 'Thin lines with gold/champagne accent', category: 'Premium', isPremium: true },
  'timeline': { name: 'Timeline', description: 'Vertical timeline for experience', category: 'Creative', isPremium: true },
  'two-column': { name: 'Two Column', description: 'Split personality left/right', category: 'Popular', isPremium: false },
  'single-column': { name: 'Single Column', description: 'Pure linear flow', category: 'Practical', isPremium: false },
  'european': { name: 'European', description: 'Europass-inspired layout', category: 'International', isPremium: false },
  'startup': { name: 'Startup', description: 'Bold equity-first startup culture', category: 'Tech', isPremium: false },
  'premium-dark': { name: 'Premium Dark', description: 'Dark background high contrast', category: 'Premium', isPremium: true },
  'minimal-bw': { name: 'Minimal B&W', description: 'Pure black & white ink-save', category: 'Practical', isPremium: false },
};
