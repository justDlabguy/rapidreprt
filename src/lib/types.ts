
export type ReferenceRange = {
  min?: number;
  max?: number;
  options?: string[];
  threshold?: number;
};

export type TestResultValue = 
  | number
  | "Positive"
  | "Negative"
  | "Trace"
  | "Low"
  | "Moderate"
  | "High"
  | string;

export type TestResultType = 
  | "numerical"
  | "binary"
  | "categorical"
  | "quantitative"
  | "custom";

export type TestResult = {
  id: string;
  testName: string;
  value: TestResultValue;
  unit: string;
  resultType: TestResultType;
  referenceRange: ReferenceRange;
  status: "normal" | "abnormal" | "pending";
  category?: string;
};

export type LabResult = {
  id: string;
  patientName: string;
  patientId: string;
  date: Date;
  results: TestResult[];
};

// New types for AI interpretation
export type ConcerningValue = {
  test_name: string;
  value: string;
  implication: string;
};

export type LabInterpretation = {
  summary: string;
  recommendations: string[];
  interpretation: {
    concerning_values: ConcerningValue[];
    normal_values: string[];
  };
};
