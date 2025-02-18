
import { useState } from "react";
import { TestResult } from "@/lib/types";

export const useTestManagement = () => {
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

  return {
    tests,
    addTest,
    updateTest,
    removeTest,
  };
};
