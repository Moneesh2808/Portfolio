import { jsPDF } from 'jspdf';

export const downloadResumePDF = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  try {
    const [img1, img2] = await Promise.all([
      loadImage('/images/resume_page1.jpg'),
      loadImage('/images/resume_page2.jpg'),
    ]);

    // Page 1
    pdf.addImage(img1, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Page 2
    pdf.addPage();
    pdf.addImage(img2, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('P_Moneesh_Raj_Resume.pdf');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback: direct download links if canvas fails
    const link = document.createElement('a');
    link.href = '/images/resume_page1.jpg';
    link.download = 'P_Moneesh_Raj_Resume_Page1.jpg';
    link.click();
    return false;
  }
};
