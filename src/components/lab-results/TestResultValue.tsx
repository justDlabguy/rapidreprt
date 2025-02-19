
import { TestResult } from "@/lib/types";

export const TestResultValue = ({ test }: { test: TestResult }) => {
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
