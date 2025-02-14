
export type TestResult = {
  id: string;
  testName: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  status: "normal" | "abnormal" | "pending";
};

export type LabResult = {
  id: string;
  patientName: string;
  patientId: string;
  date: Date;
  results: TestResult[];
};
