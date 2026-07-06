export interface PDFExportOptions {
  filename?: string;
  margin?: number;
  scale?: number;
}

async function getHtml2Pdf() {
  if (typeof window === 'undefined') {
    throw new Error('PDF export can only be used in the browser.');
  }

  const html2pdfModule = await import('html2pdf.js');
  return html2pdfModule.default || html2pdfModule;
}

/**
 * Remove unsupported CSS color functions that html2canvas can't parse
 * Replaces modern CSS functions like lab(), lch(), etc. with fallback colors
 * Also removes problematic stylesheets to prevent parsing errors
 */
function sanitizeUnsupportedCSSColors(element: HTMLElement): void {
  // Remove all style and link tags to prevent parsing of unsupported CSS
  const styleElements = element.querySelectorAll('style, link[rel="stylesheet"]');
  styleElements.forEach(el => el.remove());
  
  // Sanitize inline styles
  const allElements = element.querySelectorAll('*');
  
  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const style = htmlEl.getAttribute('style') || '';
    
    // Replace modern CSS color functions with hex fallbacks
    const sanitized = style
      // lab() function - replace with white as fallback
      .replace(/lab\([^)]*\)/g, '#FFFFFF')
      // lch() function
      .replace(/lch\([^)]*\)/g, '#FFFFFF')
      // hwb() function
      .replace(/hwb\([^)]*\)/g, '#FFFFFF')
      // color() function
      .replace(/color\([^)]*\)/g, '#FFFFFF')
      // oklch() function
      .replace(/oklch\([^)]*\)/g, '#FFFFFF')
      // oklab() function
      .replace(/oklab\([^)]*\)/g, '#FFFFFF')
      // rgba/hsla with modern functions
      .replace(/rgba\([^)]*\)/g, (match) => {
        // Keep valid rgba, but check for lab/lch inside
        if (match.includes('lab') || match.includes('lch')) {
          return 'rgba(0, 0, 0, 1)';
        }
        return match;
      });
    
    if (sanitized !== style) {
      htmlEl.setAttribute('style', sanitized);
    }
  });
}

/**
 * Export resume to PDF
 * Captures only the resume preview element and converts it to a high-quality PDF
 * Ensures proper A4 formatting, margins, and page breaks
 */
export async function exportResumeToPDF(options: PDFExportOptions = {}): Promise<void> {
  const {
    filename = 'resume.pdf',
    margin = 5,
    scale = 2,
  } = options;

  // Find the resume preview element
  const resumeElement = document.querySelector('.resume-preview');
  
  if (!resumeElement) {
    throw new Error('Resume preview element not found');
  }

  // Clone the element to avoid modifying the original
  const element = resumeElement.cloneNode(true) as HTMLElement;

  // Remove any unwanted elements that might have been cloned
  const unwantedSelectors = ['.no-print', '[style*="display: none"]'];
  unwantedSelectors.forEach(selector => {
    element.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Sanitize unsupported CSS color functions
  sanitizeUnsupportedCSSColors(element);

  // Ensure proper styling for PDF export
  element.style.margin = '0';
  element.style.padding = '14mm 16mm';
  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.backgroundColor = '#ffffff';
  element.style.color = '#111111';
  element.style.fontFamily = '"Inter", "Helvetica", "Arial", sans-serif';

  // Configure html2pdf options for A4 with proper settings
  const opt = {
    margin: margin,
    filename: filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: scale,
      useCORS: true,
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowHeight: 1200,
      windowWidth: 950,
      // Ignore errors from unsupported CSS features
      ignoreElements: (el: Element) => {
        // Skip style and link tags to prevent CSS parsing errors
        if (el.tagName === 'STYLE' || el.tagName === 'LINK') {
          return true;
        }
        return false;
      },
      onclone: (clonedDocument: Document) => {
        // Remove all stylesheets from cloned document to prevent parsing errors
        const stylesToRemove = clonedDocument.querySelectorAll('style, link[rel="stylesheet"]');
        stylesToRemove.forEach(el => el.remove());
        
        // Ensure critical styles for readability
        const allElements = clonedDocument.querySelectorAll('.resume-preview, .resume-preview *');
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            // Ensure text is readable
            if (!el.style.color) {
              el.style.color = '#111111';
            }
            if (!el.style.backgroundColor && el.tagName.match(/^(DIV|SECTION|HEADER)$/i)) {
              el.style.backgroundColor = 'transparent';
            }
          }
        });
      },
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
      compress: true,
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: ['.no-page-break'],
    },
  };

  try {
    const html2pdf = await getHtml2Pdf();
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF export failed:', error);
    // Provide more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    if (errorMessage.includes('color function')) {
      throw new Error('Failed to process resume styling. Please try refreshing the page and try again.');
    }
    throw new Error('Failed to export resume to PDF. Please ensure your resume content is valid.');
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

  const element = resumeElement.cloneNode(true) as HTMLElement;

  // Remove images for ATS compliance
  element.querySelectorAll('img').forEach(img => img.remove());
  
  // Remove decorative elements
  element.querySelectorAll('[style*="border-radius"]').forEach(el => {
    if (el instanceof HTMLElement && el.style.borderRadius === '120px') {
      el.remove();
    }
  });

  // Sanitize unsupported CSS color functions
  sanitizeUnsupportedCSSColors(element);

  // Apply ATS-friendly styling
  element.style.margin = '0';
  element.style.padding = '14mm 16mm';
  element.style.width = '210mm';
  element.style.backgroundColor = '#ffffff';
  element.style.color = '#111111';

  const opt = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg' as const, quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff',
      windowHeight: 1200,
      windowWidth: 950,
      ignoreElements: (el: Element) => {
        // Skip style and link tags
        if (el.tagName === 'STYLE' || el.tagName === 'LINK') {
          return true;
        }
        return false;
      },
      onclone: (clonedDocument: Document) => {
        // Remove all stylesheets from cloned document
        const stylesToRemove = clonedDocument.querySelectorAll('style, link[rel="stylesheet"]');
        stylesToRemove.forEach(el => el.remove());
        
        // Ensure critical styles
        const allElements = clonedDocument.querySelectorAll('.resume-preview, .resume-preview *');
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            if (!el.style.color) {
              el.style.color = '#111111';
            }
          }
        });
      },
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
      compress: true,
    },
  };

  try {
    const html2pdf = await getHtml2Pdf();
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('ATS PDF export failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    if (errorMessage.includes('color function')) {
      throw new Error('Failed to process resume styling. Please try refreshing the page and try again.');
    }
    throw new Error('Failed to export ATS-friendly PDF. Please ensure your resume content is valid.');
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
