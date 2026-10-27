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
 * Draws an image onto a canvas and returns a JPEG data-URL.
 * Ensures the image fills the full A4 canvas with white background.
 */
const imageToDataURL = (img: HTMLImageElement): string => {
  const A4_W = 2480; // px at 300 dpi
  const A4_H = 3508;
  const canvas = document.createElement('canvas');
  canvas.width = A4_W;
  canvas.height = A4_H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, A4_W, A4_H);
  ctx.drawImage(img, 0, 0, A4_W, A4_H);
  return canvas.toDataURL('image/jpeg', 0.95);
};

export const downloadResumePDF = async (): Promise<boolean> => {
  try {
    // Load both pages in parallel using fetch (no CORS issues)
    const [img1, img2] = await Promise.all([
      fetchImageElement('/images/resume_page1.jpg'),
      fetchImageElement('/images/resume_page2.jpg'),
    ]);

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = pdf.internal.pageSize.getWidth();   // 210 mm
    const H = pdf.internal.pageSize.getHeight();  // 297 mm

    // Page 1
    const data1 = imageToDataURL(img1);
    pdf.addImage(data1, 'JPEG', 0, 0, W, H, undefined, 'FAST');

    // Page 2
    pdf.addPage();
    const data2 = imageToDataURL(img2);
    pdf.addImage(data2, 'JPEG', 0, 0, W, H, undefined, 'FAST');

    pdf.save('Resume.pdf');
    return true;
  } catch (error) {
    console.error('PDF generation failed:', error);

    // Hard fallback — directly download page 1 image as PDF via link
    try {
      const res = await fetch('/images/resume_page1.jpg');
      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Resume.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      console.error('Fallback download also failed.');
    }
    return false;
  }
};
