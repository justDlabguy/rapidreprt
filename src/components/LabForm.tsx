
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TestResult, LabResult } from "@/lib/types";
import PatientInfoForm from "./lab/PatientInfoForm";
import TestList from "./lab/TestList";

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
      resultType: "numerical",
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
          if (
            typeof updatedTest.value === "number" &&
            updatedTest.referenceRange.min !== undefined &&
            updatedTest.referenceRange.max !== undefined
          ) {
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
        <PatientInfoForm
          patientName={patientName}
          patientId={patientId}
          onPatientNameChange={setPatientName}
          onPatientIdChange={setPatientId}
        />
        <TestList
          tests={tests}
          onAddTest={addTest}
          onUpdateTest={updateTest}
          onRemoveTest={removeTest}
        />
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
