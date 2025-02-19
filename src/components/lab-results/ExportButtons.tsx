
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Printer } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";
import { LabResult } from "@/lib/types";

interface ExportButtonsProps {
  result: LabResult;
  isExporting: boolean;
  setIsExporting: (value: boolean) => void;
}

export const ExportButtons = ({ result, isExporting, setIsExporting }: ExportButtonsProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handlePdfExport = async () => {
    try {
      setIsExporting(true);
      const element = document.getElementById('report-content');
      if (!element) return;

      const opt = {
        margin: 1,
        filename: `lab-report-${result.patientId}-${format(result.date, "yyyy-MM-dd")}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      toast({
        title: "Success",
        description: "PDF report has been generated",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleJsonExport = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `lab-result-${result.patientId}-${format(
      result.date,
      "yyyy-MM-dd"
    )}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Success",
      description: "JSON file has been downloaded",
    });
  };

  const handleCsvExport = () => {
    const headers = ["Test Name", "Value", "Unit", "Status", "Reference Range"];
    const rows = result.results.map(test => [
      test.testName,
      test.value,
      test.unit,
      test.status,
      `${test.referenceRange.min || ''}-${test.referenceRange.max || ''}`
    ]);

    const csvContent = [
      `Patient Name: ${result.patientName}`,
      `Patient ID: ${result.patientId}`,
      `Date: ${format(result.date, "MMMM d, yyyy")}`,
      "",
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = `lab-result-${result.patientId}-${format(
      result.date,
      "yyyy-MM-dd"
    )}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Success",
      description: "CSV file has been downloaded",
    });
  };

  return (
    <div className="space-x-2 print:hidden">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrint}
        className="transition-all duration-200 hover:bg-accent"
      >
        <Printer className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handlePdfExport}
        disabled={isExporting}
        className="transition-all duration-200 hover:bg-accent"
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleJsonExport}
        className="transition-all duration-200 hover:bg-accent"
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCsvExport}
        className="transition-all duration-200 hover:bg-accent"
      >
        <FileSpreadsheet className="h-4 w-4" />
      </Button>
    </div>
  );
};
