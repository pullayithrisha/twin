import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePDFReport = async (reportElementId, reportData) => {
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
        doc.save(`TwinHealth_Report_${new Date().getTime()}.pdf`);
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
    doc.text(`Health Score: ${reportData.scores.healthScore}/100`, 40, 140);
    doc.text(`Biological Age: ${reportData.scores.biologicalAge} yrs`, 40, 160);

    doc.setFont("helvetica", "bold");
    doc.text("Key Risks", 40, 200);
    doc.setFont("helvetica", "normal");
    let y = 220;
    Object.entries(reportData.risks).forEach(([key, val]) => {
      doc.text(`- ${key}: ${val}%`, 40, y);
      y += 20;
    });

    y += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Personalized AI Suggestions", 40, y);
    doc.setFont("helvetica", "normal");
    y += 20;
    reportData.suggestions.forEach(s => {
      doc.text(`* ${s}`, 40, y);
      y += 20;
    });

    doc.save(`TwinHealth_Report_${new Date().getTime()}.pdf`);
    
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
