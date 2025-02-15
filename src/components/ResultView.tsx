
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LabResult, TestResult } from "@/lib/types";
import { format } from "date-fns";
import { Download, Printer } from "lucide-react";

const ResultValue = ({ test }: { test: TestResult }) => {
  switch (test.resultType) {
    case "binary":
      return (
        <span className={`font-medium ${
          test.value === "Positive" ? "text-status-abnormal" : "text-status-normal"
        }`}>
          {test.value}
        </span>
      );
    case "categorical":
      return (
        <span className={`font-medium ${
          test.value === "High" || test.value === "Moderate" 
            ? "text-status-abnormal" 
            : "text-status-normal"
        }`}>
          {test.value}
        </span>
      );
    default:
      return (
        <div className="flex items-center gap-2">
          <span className="text-lg">{test.value}</span>
          <span className="text-sm text-muted-foreground">
            {test.unit}
          </span>
        </div>
      );
  }
};

const ReferenceRange = ({ test }: { test: TestResult }) => {
  if (test.referenceRange.options?.length) {
    return (
      <p className="text-sm text-muted-foreground mt-2">
        Expected: {test.referenceRange.options.join(" or ")}
      </p>
    );
  }

  if (test.referenceRange.min !== undefined || test.referenceRange.max !== undefined) {
    return (
      <p className="text-sm text-muted-foreground mt-2">
        Reference Range: {test.referenceRange.min} - {test.referenceRange.max} {test.unit}
      </p>
    );
  }

  return null;
};

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

  // Group tests by category
  const groupedResults = result.results.reduce((acc, test) => {
    const category = test.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(test);
    return acc;
  }, {} as Record<string, TestResult[]>);

  return (
    <div className="space-y-6 animate-slideIn print:animate-none">
      <Card className="p-6 space-y-6">
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

        <div className="space-y-6">
          {Object.entries(groupedResults).map(([category, tests]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">{category}</h3>
              <div className="grid gap-4">
                {tests.map((test) => (
                  <Card
                    key={test.id}
                    className="p-4 animate-fadeIn print:animate-none"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{test.testName}</h4>
                        <ResultValue test={test} />
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
                    <ReferenceRange test={test} />
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button
        onClick={onBack}
        variant="outline"
        className="w-full print:hidden transition-all duration-200 hover:bg-accent"
      >
        Back to Form
      </Button>
    </div>
  );
};

export default ResultView;
