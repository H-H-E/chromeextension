import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportWorksheetPDF(content) {
  try {
    const element = document.getElementById('yt_worksheet_text');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('worksheet.pdf');
  } catch (error) {
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}