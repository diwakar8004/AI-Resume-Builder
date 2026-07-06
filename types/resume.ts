// ─── Resume Data Types ────────────────────────────────────────────────────────

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  photo?: string;
  jobTitle?: string;
}

export interface Summary {
  content: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
  url?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
  courses?: string[];
  honors?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
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
  publisher?: string;
  authors?: string;
  date?: string;
  url?: string;
  doi?: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'elementary' | 'limited' | 'professional' | 'full' | 'native';
}

export interface Interest {
  id: string;
  name: string;
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
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

export interface Research {
  id: string;
  title: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  url?: string;
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
  bullets?: string[];
}

// ─── Section Keys ─────────────────────────────────────────────────────────────
export type SectionKey =
  | 'personalInfo'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'publications'
  | 'research'
  | 'languages'
  | 'interests'
  | 'volunteer'
  | 'references'
  | 'custom';

export interface SectionConfig {
  id: SectionKey | string;
  label: string;
  enabled: boolean;
  order: number;
  customId?: string; // for custom sections
}

// ─── Customization ────────────────────────────────────────────────────────────
export type FontFamily =
  | 'Inter'
  | 'Outfit'
  | 'Merriweather'
  | 'Playfair Display'
  | 'Roboto'
  | 'Open Sans'
  | 'Lato'
  | 'Georgia'
  | 'Times New Roman'
  | 'Arial';

export interface ResumeCustomization {
  template: string;
  font: FontFamily;
  fontSize: number; // base font size in pt
  lineSpacing: number; // line height multiplier
  margin: 'compact' | 'normal' | 'relaxed';
  accentColor: string; // hex color
  showIcons: boolean;
  showPhoto: boolean;
  colorTheme: 'default' | 'blue' | 'green' | 'red' | 'purple' | 'dark' | 'minimal';
  pageSize: 'A4' | 'Letter';
  twoColumn: boolean;
}

// ─── Full Resume Data ─────────────────────────────────────────────────────────
export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  research: Research[];
  languages: Language[];
  interests: Interest[];
  volunteer: VolunteerExperience[];
  references: Reference[];
  customSections: CustomSection[];
  sectionOrder: SectionConfig[];
  customization: ResumeCustomization;
}

// ─── Document Types ───────────────────────────────────────────────────────────
export type DocumentType = 'resume' | 'cv' | 'cover-letter' | 'portfolio';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  data: ResumeData;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  isFavorite: boolean;
  thumbnail?: string;
  shareId?: string;
  userId: string;
}

export interface VersionHistoryEntry {
  id: string;
  documentId: string;
  snapshot: ResumeData;
  createdAt: Date;
  label?: string;
}

// ─── Cover Letter ─────────────────────────────────────────────────────────────
export interface CoverLetterData {
  recipientName?: string;
  recipientTitle?: string;
  companyName?: string;
  companyAddress?: string;
  jobTitle?: string;
  content: string;
  personalInfo: PersonalInfo;
  customization: Omit<ResumeCustomization, 'template'> & { template: string };
}

// ─── ATS Score ────────────────────────────────────────────────────────────────
export interface ATSScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    sections: number;
    length: number;
    clarity: number;
  };
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
}

// ─── AI Types ─────────────────────────────────────────────────────────────────
export interface AIGenerationRequest {
  type: 'summary' | 'experience' | 'cover-letter' | 'skills' | 'bio';
  context: Partial<ResumeData>;
  jobDescription?: string;
  tone?: 'professional' | 'creative' | 'executive' | 'technical';
  length?: 'brief' | 'standard' | 'detailed';
}

export interface AIGenerationResponse {
  content: string;
  alternatives?: string[];
  keywords?: string[];
}

// ─── Default Data ─────────────────────────────────────────────────────────────
export const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  jobTitle: '',
  website: '',
  linkedin: '',
  github: '',
  portfolio: '',
  photo: '',
};

export const defaultCustomization: ResumeCustomization = {
  template: 'modern',
  font: 'Inter',
  fontSize: 10,
  lineSpacing: 1.4,
  margin: 'normal',
  accentColor: '#4F46E5',
  showIcons: true,
  showPhoto: false,
  colorTheme: 'default',
  pageSize: 'A4',
  twoColumn: false,
};

export const defaultSectionOrder: SectionConfig[] = [
  { id: 'personalInfo', label: 'Personal Info', enabled: true, order: 0 },
  { id: 'summary', label: 'Professional Summary', enabled: true, order: 1 },
  { id: 'experience', label: 'Work Experience', enabled: true, order: 2 },
  { id: 'education', label: 'Education', enabled: true, order: 3 },
  { id: 'skills', label: 'Skills', enabled: true, order: 4 },
  { id: 'projects', label: 'Projects', enabled: true, order: 5 },
  { id: 'certifications', label: 'Certifications', enabled: true, order: 6 },
  { id: 'awards', label: 'Awards', enabled: false, order: 7 },
  { id: 'publications', label: 'Publications', enabled: false, order: 8 },
  { id: 'research', label: 'Research', enabled: false, order: 9 },
  { id: 'languages', label: 'Languages', enabled: true, order: 10 },
  { id: 'interests', label: 'Interests', enabled: false, order: 11 },
  { id: 'volunteer', label: 'Volunteer', enabled: false, order: 12 },
  { id: 'references', label: 'References', enabled: false, order: 13 },
];

export const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  awards: [],
  publications: [],
  research: [],
  languages: [],
  interests: [],
  volunteer: [],
  references: [],
  customSections: [],
  sectionOrder: defaultSectionOrder,
  customization: defaultCustomization,
};

// ─── Template Metadata ────────────────────────────────────────────────────────
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  isATS: boolean;
  thumbnail?: string;
  accentColors: string[];
}

export const TEMPLATES: TemplateMetadata[] = [
  { id: 'modern', name: 'Modern', description: 'Clean two-column layout with blue accent', category: 'Professional', tags: ['popular', 'clean'], isPremium: false, isATS: true, accentColors: ['#4F46E5', '#0ea5e9', '#10B981'] },
  { id: 'minimal', name: 'Minimal', description: 'Ultra-clean single column with elegant spacing', category: 'Minimal', tags: ['simple', 'elegant'], isPremium: false, isATS: true, accentColors: ['#111827', '#374151', '#6B7280'] },
  { id: 'professional', name: 'Professional', description: 'Classic single column with serif headings', category: 'Classic', tags: ['traditional', 'serif'], isPremium: false, isATS: true, accentColors: ['#1E3A5F', '#2D5F8A', '#4A90D9'] },
  { id: 'ats-friendly', name: 'ATS Friendly', description: 'Maximum ATS compatibility, zero frills', category: 'ATS', tags: ['ats', 'simple', 'text-only'], isPremium: false, isATS: true, accentColors: ['#000000', '#333333'] },
  { id: 'executive', name: 'Executive', description: 'Bold header with full-bleed color block', category: 'Executive', tags: ['bold', 'senior', 'leadership'], isPremium: true, isATS: false, accentColors: ['#1E293B', '#0F172A', '#334155'] },
  { id: 'corporate', name: 'Corporate', description: 'Navy & grey structured grid layout', category: 'Corporate', tags: ['formal', 'structured'], isPremium: false, isATS: true, accentColors: ['#1a3a6e', '#2d5fa6', '#4472c4'] },
  { id: 'creative', name: 'Creative', description: 'Dynamic diagonal elements and bold typography', category: 'Creative', tags: ['creative', 'bold', 'colorful'], isPremium: true, isATS: false, accentColors: ['#FF5733', '#E91E63', '#9C27B0'] },
  { id: 'designer', name: 'Designer', description: 'Portfolio-style grid layout for visual creatives', category: 'Creative', tags: ['design', 'portfolio', 'visual'], isPremium: true, isATS: false, accentColors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
  { id: 'software-engineer', name: 'Software Engineer', description: 'Code-inspired layout with monospace accents', category: 'Tech', tags: ['developer', 'tech', 'coding'], isPremium: false, isATS: true, accentColors: ['#22C55E', '#16A34A', '#4F46E5'] },
  { id: 'data-scientist', name: 'Data Scientist', description: 'Metrics-focused with visual skill bars', category: 'Tech', tags: ['data', 'analytics', 'technical'], isPremium: false, isATS: true, accentColors: ['#0284C7', '#0369A1', '#075985'] },
  { id: 'product-manager', name: 'Product Manager', description: 'KPI-focused layout with impact metrics', category: 'Business', tags: ['product', 'pm', 'business'], isPremium: true, isATS: true, accentColors: ['#7C3AED', '#6D28D9', '#5B21B6'] },
  { id: 'student', name: 'Student', description: 'Fresh and bright, education-first layout', category: 'Entry Level', tags: ['student', 'academic', 'fresh'], isPremium: false, isATS: true, accentColors: ['#0EA5E9', '#38BDF8', '#7DD3FC'] },
  { id: 'fresher', name: 'Fresher', description: 'Skills-first layout for new graduates', category: 'Entry Level', tags: ['entry-level', 'graduate', 'fresher'], isPremium: false, isATS: true, accentColors: ['#10B981', '#34D399', '#6EE7B7'] },
  { id: 'academic-cv', name: 'Academic CV', description: 'Multi-page academic format with all scholarly sections', category: 'Academic', tags: ['academic', 'cv', 'research'], isPremium: false, isATS: true, accentColors: ['#1E3A5F', '#8B0000'] },
  { id: 'research-cv', name: 'Research CV', description: 'Citation-heavy, publication-focused layout', category: 'Academic', tags: ['research', 'publications', 'academic'], isPremium: false, isATS: true, accentColors: ['#374151', '#1F2937'] },
  { id: 'medical', name: 'Medical', description: 'Clean clinical layout with professional serif', category: 'Healthcare', tags: ['medical', 'healthcare', 'clinical'], isPremium: true, isATS: true, accentColors: ['#0369A1', '#0284C7'] },
  { id: 'finance', name: 'Finance', description: 'Conservative Bloomberg-inspired professional layout', category: 'Finance', tags: ['finance', 'banking', 'conservative'], isPremium: true, isATS: true, accentColors: ['#1E293B', '#B8960C'] },
  { id: 'marketing', name: 'Marketing', description: 'Bold colors with portfolio content blocks', category: 'Marketing', tags: ['marketing', 'creative', 'bold'], isPremium: false, isATS: false, accentColors: ['#F97316', '#EA580C', '#DC2626'] },
  { id: 'legal', name: 'Legal', description: 'Traditional serif formal layout for legal professionals', category: 'Legal', tags: ['legal', 'formal', 'traditional'], isPremium: true, isATS: true, accentColors: ['#1E293B', '#334155'] },
  { id: 'elegant', name: 'Elegant', description: 'Thin lines and gold/champagne accents', category: 'Premium', tags: ['elegant', 'luxury', 'sophisticated'], isPremium: true, isATS: false, accentColors: ['#B8960C', '#D4AF37', '#F5E6A3'] },
  { id: 'timeline', name: 'Timeline', description: 'Vertical timeline layout for experience-heavy resumes', category: 'Creative', tags: ['timeline', 'visual', 'creative'], isPremium: true, isATS: false, accentColors: ['#8B5CF6', '#7C3AED', '#6D28D9'] },
  { id: 'two-column', name: 'Two Column', description: 'Split personality left sidebar and main content', category: 'Layout', tags: ['two-column', 'sidebar', 'structured'], isPremium: false, isATS: false, accentColors: ['#4F46E5', '#0EA5E9', '#10B981'] },
  { id: 'single-column', name: 'Single Column', description: 'Pure linear flow, highly readable', category: 'Layout', tags: ['single-column', 'simple', 'linear'], isPremium: false, isATS: true, accentColors: ['#374151', '#4F46E5'] },
  { id: 'european', name: 'European', description: 'Europass-inspired layout with photo support', category: 'International', tags: ['european', 'europass', 'international'], isPremium: false, isATS: true, accentColors: ['#003399', '#0055A4'] },
  { id: 'canadian', name: 'Canadian', description: 'Canadian format, clean and bilingual-friendly', category: 'International', tags: ['canadian', 'north-american', 'bilingual'], isPremium: false, isATS: true, accentColors: ['#B22234', '#DC143C'] },
  { id: 'us-standard', name: 'US Standard', description: 'Traditional American chronological format', category: 'International', tags: ['us', 'american', 'standard'], isPremium: false, isATS: true, accentColors: ['#1E3A5F', '#2D5F8A'] },
  { id: 'uk-standard', name: 'UK Standard', description: 'UK-preferred format, no photo, skills section', category: 'International', tags: ['uk', 'british', 'standard'], isPremium: false, isATS: true, accentColors: ['#003087', '#CC0001'] },
  { id: 'startup', name: 'Startup', description: 'Bold startup culture, equity and metrics focused', category: 'Tech', tags: ['startup', 'tech', 'modern'], isPremium: true, isATS: false, accentColors: ['#FF5733', '#4F46E5', '#10B981'] },
  { id: 'premium-dark', name: 'Premium Dark', description: 'Dark background with high contrast and gold accents', category: 'Premium', tags: ['dark', 'premium', 'bold'], isPremium: true, isATS: false, accentColors: ['#D4AF37', '#F5E6A3', '#8B5CF6'] },
  { id: 'minimal-bw', name: 'Minimal B&W', description: 'Pure black & white, ink-save and high ATS score', category: 'Minimal', tags: ['minimal', 'black-white', 'ats', 'print'], isPremium: false, isATS: true, accentColors: ['#000000'] },
];

// ─── TEMPLATE_META record (used by TemplateGallery) ──────────────────────────
export type TemplateId = typeof TEMPLATES[number]['id'];

export const TEMPLATE_META: Record<TemplateId, TemplateMetadata> = Object.fromEntries(
  TEMPLATES.map((t) => [t.id, t])
) as Record<TemplateId, TemplateMetadata>;

