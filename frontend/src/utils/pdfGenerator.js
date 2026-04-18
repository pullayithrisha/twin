import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePDFReport = async (reportElementId, reportData, options = { download: true, returnBase64: false }) => {
  try {
    const doc = new jsPDF("p", "pt", "a4");
    
    // Attempt to capture HTML if ID provided (useful for charts)
    if (reportElementId) {
      const element = document.getElementById(reportElementId);
      if (element) {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        if (options.download) {
          doc.save(`TwinHealth_Report_${new Date().getTime()}.pdf`);
        }
        
        if (options.returnBase64) {
          return doc.output('datauristring');
        }
        return;
      }
    }

    // Fallback or purely text-based generation based on reportData
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("TwinHealth AI - Health Simulation Report", 40, 50);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const dateStr = new Date().toLocaleString();
    doc.text(`Generated On: ${dateStr}`, 40, 80);

    doc.setFont("helvetica", "bold");
    doc.text("Health Overview", 40, 120);
    doc.setFont("helvetica", "normal");
    const healthScoreVal = reportData.healthScore || reportData.scores?.healthScore || 'N/A';
    const biologicalAgeVal = reportData.biologicalAge || reportData.scores?.biologicalAge || 'N/A';
    doc.text(`Health Score: ${healthScoreVal}/100`, 40, 140);
    doc.text(`Biological Age: ${biologicalAgeVal} yrs`, 40, 160);

    doc.setFont("helvetica", "bold");
    doc.text("Key Risks", 40, 200);
    doc.setFont("helvetica", "normal");
    let y = 220;
    if (reportData.risks) {
      Object.entries(reportData.risks).forEach(([key, val]) => {
        if (typeof val !== 'object') {
          doc.text(`- ${key}: ${val}%`, 40, y);
          y += 20;
        }
      });
    }

    y += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Personalized AI Suggestions", 40, y);
    doc.setFont("helvetica", "normal");
    y += 20;
    if (reportData.suggestions) {
      reportData.suggestions.forEach(s => {
        doc.text(`* ${s}`, 40, y);
        y += 20;
      });
    }

    if (options.download) {
      doc.save(`TwinHealth_Report_${new Date().getTime()}.pdf`);
    }
    
    if (options.returnBase64) {
      return doc.output('datauristring');
    }
    
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
