
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TestResult } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface TestFormProps {
  test: TestResult;
  onUpdate: (id: string, updates: Partial<TestResult>) => void;
  onRemove: (id: string) => void;
}

const TestForm = ({ test, onUpdate, onRemove }: TestFormProps) => {
  return (
    <Card className="p-4 animate-fadeIn">
      <div className="grid grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>Test Name</Label>
          <Input
            value={test.testName}
            onChange={(e) => onUpdate(test.id, { testName: e.target.value })}
            placeholder="Test name"
          />
        </div>
        <div className="space-y-2">
          <Label>Value</Label>
          <Input
            type="number"
            value={test.value || ""}
            onChange={(e) =>
              onUpdate(test.id, { value: Number(e.target.value) })
            }
            placeholder="Value"
          />
        </div>
        <div className="space-y-2">
          <Label>Unit</Label>
          <Input
            value={test.unit}
            onChange={(e) => onUpdate(test.id, { unit: e.target.value })}
            placeholder="Unit"
          />
        </div>
        <div className="space-y-2">
          <Label>Reference Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={test.referenceRange.min || ""}
              onChange={(e) =>
                onUpdate(test.id, {
                  referenceRange: {
                    ...test.referenceRange,
                    min: Number(e.target.value),
                  },
                })
              }
              placeholder="Min"
            />
            <Input
              type="number"
              value={test.referenceRange.max || ""}
              onChange={(e) =>
                onUpdate(test.id, {
                  referenceRange: {
                    ...test.referenceRange,
                    max: Number(e.target.value),
                  },
                })
              }
              placeholder="Max"
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemove(test.id)}
            className="transition-all duration-200 hover:bg-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TestForm;
