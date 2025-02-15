
import { Button } from "@/components/ui/button";
import { TestResult } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import TestForm from "./TestForm";

interface TestListProps {
  tests: TestResult[];
  onAddTest: () => void;
  onUpdateTest: (id: string, updates: Partial<TestResult>) => void;
  onRemoveTest: (id: string) => void;
}

const TestList = ({
  tests,
  onAddTest,
  onUpdateTest,
  onRemoveTest,
}: TestListProps) => {
  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <TestForm
          key={test.id}
          test={test}
          onUpdate={onUpdateTest}
          onRemove={onRemoveTest}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={onAddTest}
        className="w-full transition-all duration-200 hover:bg-accent"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Test
      </Button>
    </div>
  );
};

export default TestList;
