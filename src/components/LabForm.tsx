
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TestResult, LabResult } from "@/lib/types";
import { PlusCircle, Trash2 } from "lucide-react";

const LabForm = ({ onSubmit }: { onSubmit: (result: LabResult) => void }) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [tests, setTests] = useState<TestResult[]>([]);

  const addTest = () => {
    const newTest: TestResult = {
      id: crypto.randomUUID(),
      testName: "",
      value: 0,
      unit: "",
      referenceRange: { min: 0, max: 0 },
      status: "pending",
    };
    setTests([...tests, newTest]);
  };

  const updateTest = (id: string, updates: Partial<TestResult>) => {
    setTests(
      tests.map((test) => {
        if (test.id === id) {
          const updatedTest = { ...test, ...updates };
          // Calculate status
          if (updatedTest.value && updatedTest.referenceRange.min && updatedTest.referenceRange.max) {
            updatedTest.status =
              updatedTest.value >= updatedTest.referenceRange.min &&
              updatedTest.value <= updatedTest.referenceRange.max
                ? "normal"
                : "abnormal";
          }
          return updatedTest;
        }
        return test;
      })
    );
  };

  const removeTest = (id: string) => {
    setTests(tests.filter((test) => test.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientId) {
      toast({
        title: "Missing Information",
        description: "Please fill in patient details",
        variant: "destructive",
      });
      return;
    }
    if (tests.length === 0) {
      toast({
        title: "No Tests Added",
        description: "Please add at least one test",
        variant: "destructive",
      });
      return;
    }

    const result: LabResult = {
      id: crypto.randomUUID(),
      patientName,
      patientId,
      date: new Date(),
      results: tests,
    };

    onSubmit(result);
    toast({
      title: "Success",
      description: "Lab results have been generated",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slideIn">
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="transition-all duration-200 hover:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className="transition-all duration-200 hover:border-primary/50"
            />
          </div>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <Card key={test.id} className="p-4 animate-fadeIn">
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Test Name</Label>
                  <Input
                    value={test.testName}
                    onChange={(e) =>
                      updateTest(test.id, { testName: e.target.value })
                    }
                    placeholder="Test name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    type="number"
                    value={test.value || ""}
                    onChange={(e) =>
                      updateTest(test.id, { value: Number(e.target.value) })
                    }
                    placeholder="Value"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input
                    value={test.unit}
                    onChange={(e) => updateTest(test.id, { unit: e.target.value })}
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
                        updateTest(test.id, {
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
                        updateTest(test.id, {
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
                    onClick={() => removeTest(test.id)}
                    className="transition-all duration-200 hover:bg-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addTest}
          className="w-full transition-all duration-200 hover:bg-accent"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Test
        </Button>
      </Card>

      <Button
        type="submit"
        className="w-full transition-all duration-200 hover:bg-primary/90"
      >
        Generate Results
      </Button>
    </form>
  );
};

export default LabForm;
