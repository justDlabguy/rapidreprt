
import { Card } from "@/components/ui/card";
import { TestResult } from "@/lib/types";
import { TestResultValue } from "./TestResultValue";
import { ReferenceRange } from "./ReferenceRange";

interface TestResultsProps {
  results: TestResult[];
}

export const TestResults = ({ results }: TestResultsProps) => {
  const groupedResults = results.reduce((acc, test) => {
    const category = test.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(test);
    return acc;
  }, {} as Record<string, TestResult[]>);

  return (
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
                    <TestResultValue test={test} />
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
  );
};
