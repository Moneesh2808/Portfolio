import { jsPDF } from 'jspdf';

/**
 * Loads an image via fetch (avoids crossOrigin issues) and returns
 * an HTMLImageElement whose src is a local blob URL.
 */
const fetchImageElement = (url: string): Promise<HTMLImageElement> => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      return res.blob();
    })
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(objectURL); // free memory
          resolve(img);
        };
        img.onerror = reject;
        img.src = objectURL;
      });
    });
};

/**
 * Downloads the resume as a PDF file in the local system named Resume.pdf.
 * Prioritizes direct download of the pre-rendered high-definition A4 PDF file,
 * and falls back seamlessly to dynamic client-side jsPDF generation.
 */
export const downloadResumePDF = async (): Promise<boolean> => {
  // Primary Strategy: Direct download of pre-generated A4 PDF
  const pdfPaths = ['/Resume.pdf', '/P_Moneesh_Raj_Resume.pdf'];

  for (const pdfPath of pdfPaths) {
    try {
      const res = await fetch(pdfPath);
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
        return true;
      }
    } catch {
      // Continue to next strategy if fetch fails
    }
  }

  // Fallback Strategy: Dynamic jsPDF generation from the exact resume image
  try {
    const img = await fetchImageElement('/images/resume_page1.jpg');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210 mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297 mm

    // Compute proportional dimensions preserving exact aspect ratio
    const imgAspect = (img.naturalHeight || img.height) / (img.naturalWidth || img.width);
    let renderW = pageWidth;
    let renderH = pageWidth * imgAspect;
    if (renderH > pageHeight) {
      renderH = pageHeight;
      renderW = pageHeight / imgAspect;
    }
    const xOffset = (pageWidth - renderW) / 2;
    const yOffset = (pageHeight - renderH) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width || 1200;
    canvas.height = img.naturalHeight || img.height || 1700;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.98);

    pdf.addImage(dataUrl, 'JPEG', xOffset, yOffset, renderW, renderH, undefined, 'SLOW');
    pdf.save('Resume.pdf');
    return true;
  } catch (error) {
    console.error('Dynamic PDF generation failed:', error);

    // Hard fallback: trigger direct anchor link
    try {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (fallbackErr) {
      console.error('All resume download mechanisms failed:', fallbackErr);
      return false;
    }
  }
};
