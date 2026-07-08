export interface PDFExportOptions {
  filename?: string;
  margin?: number;
  scale?: number;
}

type CanvasOptions = Record<string, unknown>;

async function getHtml2Pdf() {
  if (typeof window === 'undefined') {
    throw new Error('PDF export can only be used in the browser.');
  }

  const html2pdfModule = await import('html2pdf.js');
  return html2pdfModule.default || html2pdfModule;
}

async function getHtml2Canvas() {
  if (typeof window === 'undefined') {
    throw new Error('html2canvas can only be used in the browser.');
  }

  const html2canvasModule = await import('html2canvas');
  return html2canvasModule.default || html2canvasModule;
}

/**
 * Wait for all fonts to load before rendering
 */
function waitForFontsToLoad(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  const doc = document as Document & { fonts?: { ready?: Promise<void> } };
  return doc.fonts?.ready ?? Promise.resolve();
}

/**
 * Wait for all images in an element to load
 */
async function waitForImagesToLoad(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even if image fails to load
        }
      })
  );

  await Promise.all(promises);
}

/**
 * Wait for background images to load
 */
async function waitForBackgroundImagesToLoad(element: HTMLElement): Promise<void> {
  const elements = element.querySelectorAll('[style*="background-image"]');
  const promises = Array.from(elements).map(
    (el) =>
      new Promise<void>((resolve) => {
        const bgImage = window.getComputedStyle(el).backgroundImage;
        if (!bgImage || bgImage === 'none') {
          resolve();
          return;
        }

        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = bgImage.replace(/url\(["']?([^"']*)["']?\)/g, '$1');
      })
  );

  await Promise.all(promises);
}

/**
 * Remove unsupported CSS properties for html2canvas
 */
function sanitizeExportElement(element: HTMLElement): void {
  // Remove problematic CSS that html2canvas can't render
  element.style.outline = 'none';
  element.style.transform = 'none';
  element.style.filter = 'none';

  // Remove transform and scale from all children
  element.querySelectorAll('*').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.outline = 'none';
    }
  });
}

/**
 * Export resume to PDF - PIXEL-PERFECT version
 * Captures the resume at exact A4 dimensions with proper font/image loading
 */
export async function exportResumeToPDF(options: PDFExportOptions = {}): Promise<void> {
  const {
    filename = 'resume.pdf',
    margin = 5,
    scale = 3, // Increased for sharp rendering
  } = options;

  // Find the resume preview element
  const resumeElement = document.querySelector('.resume-preview');
  
  if (!resumeElement) {
    throw new Error('Resume preview element not found');
  }

  // Wait for fonts to load
  await waitForFontsToLoad();

  // Clone the element to avoid modifying the original
  const element = resumeElement.cloneNode(true) as HTMLElement;

  // Remove unwanted elements
  const unwantedSelectors = ['.no-print', '[style*="display: none"]'];
  unwantedSelectors.forEach(selector => {
    element.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Wait for images to load in the clone
  await waitForImagesToLoad(element);
  await waitForBackgroundImagesToLoad(element);

  // Sanitize for export
  sanitizeExportElement(element);

  // Ensure proper styling for PDF export - PRESERVE EXACT DIMENSIONS
  element.style.margin = '0';
  element.style.padding = '14mm 16mm';
  element.style.width = '210mm'; // Exact A4 width
  element.style.minHeight = '297mm'; // A4 height
  element.style.maxWidth = '210mm';
  element.style.height = 'auto';
  element.style.backgroundColor = '#ffffff';
  element.style.color = '#111111';
  element.style.fontFamily = '"Inter", "Helvetica", "Arial", sans-serif';
  element.style.fontSize = '10px';
  element.style.lineHeight = '1.5';
  element.style.overflow = 'visible';
  element.style.overflowWrap = 'break-word';
  element.style.wordWrap = 'break-word';
  element.style.whiteSpace = 'normal';

  // Disable CSS animations during export
  const style = document.createElement('style');
  style.textContent = `
    * { animation: none !important; transition: none !important; }
  `;
  element.appendChild(style);

  // Ensure all text elements preserve spacing
  element.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.whiteSpace = 'normal';
      el.style.wordWrap = 'break-word';
      el.style.overflowWrap = 'break-word';
      el.style.wordBreak = 'break-word';
    }
  });

  // Temporarily add element to DOM so it can be rendered
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm';
  container.style.height = 'auto';
  container.appendChild(element);
  document.body.appendChild(container);

  try {
    const html2canvas = await getHtml2Canvas();
    
    // Capture canvas with high scale
    type CanvasOptions = Record<string, unknown>;

    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowHeight: element.scrollHeight || 1400,
      windowWidth: 800, // 210mm in pixels at normal DPI
      imageTimeout: 0,
      removeContainer: false,
    } as CanvasOptions);

    // Calculate dimensions for jsPDF
    const pdfWidth = 210; // mm
    const pdfHeight = (canvas.height / canvas.width) * pdfWidth; // Maintain aspect ratio

    // Get jsPDF
    const html2pdf = await getHtml2Pdf();
    
    // Create PDF with exact dimensions
    await html2pdf()
      .set({
        margin: margin,
        filename: filename,
        image: { type: 'png', quality: 1 }, // Use PNG for quality
        html2canvas: {
          scale: scale,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          imageTimeout: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: [pdfWidth, pdfHeight],
          orientation: 'portrait',
        },
      })
      .from(element)
      .save();
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}

/**
 * Export resume with optimized formatting for ATS systems
 * Removes images and decorative elements, preserves text structure and formatting
 */
export async function exportATSFriendlyPDF(options: PDFExportOptions = {}): Promise<void> {
  const filename = options.filename || 'resume-ats.pdf';
  
  const resumeElement = document.querySelector('.resume-preview');
  
  if (!resumeElement) {
    throw new Error('Resume preview element not found');
  }

  // Wait for fonts to load
  await waitForFontsToLoad();

  const element = resumeElement.cloneNode(true) as HTMLElement;

  // Remove images for ATS compliance
  element.querySelectorAll('img').forEach(img => img.remove());
  
  // Remove decorative elements
  element.querySelectorAll('[style*="border-radius"]').forEach(el => {
    if (el instanceof HTMLElement && el.style.borderRadius === '120px') {
      el.remove();
    }
  });

  // Sanitize for export
  sanitizeExportElement(element);

  // Apply ATS-friendly styling
  element.style.margin = '0';
  element.style.padding = '14mm 16mm';
  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.backgroundColor = '#ffffff';
  element.style.color = '#111111';
  element.style.fontFamily = '"Arial", sans-serif';
  element.style.overflow = 'visible';
  element.style.overflowWrap = 'break-word';
  element.style.wordWrap = 'break-word';
  element.style.whiteSpace = 'normal';

  // Ensure text renders properly
  element.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.whiteSpace = 'normal';
      el.style.wordWrap = 'break-word';
      el.style.overflowWrap = 'break-word';
      el.style.wordBreak = 'break-word';
    }
  });

  // Temporarily add element to DOM
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm';
  container.style.height = 'auto';
  container.appendChild(element);
  document.body.appendChild(container);

  try {
    const html2canvas = await getHtml2Canvas();
    
    // Capture canvas for ATS
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowHeight: element.scrollHeight || 1400,
      windowWidth: 800,
      imageTimeout: 0,
      removeContainer: false,
    } as CanvasOptions);

    const pdfWidth = 210;
    const pdfHeight = (canvas.height / canvas.width) * pdfWidth;

    const html2pdf = await getHtml2Pdf();
    
    await html2pdf()
      .set({
        margin: 10,
        filename: filename,
        image: { type: 'png', quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          imageTimeout: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: [pdfWidth, pdfHeight],
          orientation: 'portrait',
        },
      })
      .from(element)
      .save();
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Validate that the resume preview is properly rendered
 * Returns true if the element exists and has content
 */
export function validateResumePreview(): boolean {
  const element = document.querySelector('.resume-preview');
  if (!element) return false;
  
  const text = element.textContent || '';
  return text.trim().length > 0;
}
