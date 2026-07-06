import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Nano ID ──────────────────────────────────────────────────────────────────
export function nanoid(size = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ─── Date Formatting ──────────────────────────────────────────────────────────
export function formatDate(dateStr: string, format: 'short' | 'medium' | 'year' = 'medium'): string {
  if (!dateStr) return '';
  if (dateStr === 'Present') return 'Present';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    if (format === 'year') return date.getFullYear().toString();
    if (format === 'short') {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// ─── String Utils ─────────────────────────────────────────────────────────────
export function truncate(str: string, length = 100): string {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '…';
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Array Utils ──────────────────────────────────────────────────────────────
export function move<T>(array: T[], from: number, to: number): T[] {
  const result = [...array];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

// ─── File Utils ───────────────────────────────────────────────────────────────
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Color Utils ──────────────────────────────────────────────────────────────
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function hexToRgbString(hex: string, alpha = 1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function lightenHex(hex: string, amount = 0.2): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ─── Object Utils ─────────────────────────────────────────────────────────────
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// ─── Resume Name Utils ────────────────────────────────────────────────────────
export function getFullName(firstName?: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(' ') || 'Your Name';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

// ─── ATS Score Helper ─────────────────────────────────────────────────────────
export function calculateSimpleATSScore(resumeText: string): number {
  let score = 0;
  const text = resumeText.toLowerCase();
  
  // Length check (ideal: 400-800 words)
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words >= 300 && words <= 1000) score += 20;
  else if (words >= 200) score += 10;
  
  // Key sections present
  const sections = ['experience', 'education', 'skills', 'summary'];
  sections.forEach(s => { if (text.includes(s)) score += 10; });
  
  // Action verbs
  const actionVerbs = ['developed', 'led', 'managed', 'created', 'designed', 'implemented', 'increased', 'reduced', 'achieved'];
  const verbCount = actionVerbs.filter(v => text.includes(v)).length;
  score += Math.min(verbCount * 3, 15);
  
  // Email and phone present
  if (/\w+@\w+\.\w+/.test(text)) score += 5;
  
  return Math.min(score, 100);
}
