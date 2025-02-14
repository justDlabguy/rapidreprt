
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LabResult } from "@/lib/types";
import { format } from "date-fns";
import { Download, Printer, TestTubes, Flask, Microscope, FlaskConical } from "lucide-react";

const ResultView = ({
  result,
  onBack,
}: {
  result: LabResult;
  onBack: () => void;
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
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
  };

  return (
    <div className="space-y-6 animate-slideIn print:animate-none relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] print:opacity-[0.015]">
        <div className="absolute inset-0 grid grid-cols-6 gap-8 p-8">
          {Array.from({ length: 24 }).map((_, index) => {
            const Icon = [TestTubes, Flask, Microscope, FlaskConical][index % 4];
            return (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center transform rotate-12"
              >
                <Icon className="w-12 h-12 text-[#9b87f5]" />
              </div>
            );
          })}
        </div>
      </div>

      <Card className="p-6 space-y-6 bg-white/95 backdrop-blur-sm print:bg-white relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">Laboratory Results</h2>
            <p className="text-muted-foreground">
              {format(result.date, "MMMM d, yyyy")}
            </p>
          </div>
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
              onClick={handleDownload}
              className="transition-all duration-200 hover:bg-accent"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Patient Name</p>
            <p className="font-medium">{result.patientName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Patient ID</p>
            <p className="font-medium">{result.patientId}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Test Results</h3>
          <div className="grid gap-4">
            {result.results.map((test) => (
              <Card
                key={test.id}
                className="p-4 animate-fadeIn print:animate-none bg-white/95 backdrop-blur-sm print:bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{test.testName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg">{test.value}</span>
                      <span className="text-sm text-muted-foreground">
                        {test.unit}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      test.status === "normal"
                        ? "bg-status-normal/10 text-status-normal"
                        : test.status === "abnormal"
                        ? "bg-status-abnormal/10 text-status-abnormal"
                        : "bg-status-pending/10 text-status-pending"
                    }`}
                  >
                    {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Reference Range: {test.referenceRange.min} - {test.referenceRange.max} {test.unit}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      <Button
        onClick={onBack}
        variant="outline"
        className="w-full print:hidden transition-all duration-200 hover:bg-accent relative z-10"
      >
        Back to Form
      </Button>
    </div>
  );
};

export default ResultView;
