
import { TestResult } from "@/lib/types";

export const ReferenceRange = ({ test }: { test: TestResult }) => {
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
