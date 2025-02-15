
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

export const TEST_CATEGORIES = [
  "Hematology",
  "Chemistry",
  "Immunology",
  "Urinalysis",
  "Microbiology",
  "Other",
] as const;

export const RESULT_TYPE_CONFIG = {
  binary: {
    options: ["Positive", "Negative"],
    units: [],
  },
  categorical: {
    options: ["Trace", "Low", "Moderate", "High"],
    units: [],
  },
  numerical: {
    options: [],
    units: ["g/dL", "mg/dL", "mmol/L", "μL", "%"],
  },
  quantitative: {
    options: [],
    units: ["mg/dL", "g/L", "mmol/L", "U/L"],
  },
  custom: {
    options: [],
    units: ["", "mg/dL", "g/L", "mmol/L", "U/L"],
  },
} as const;

// Common test templates
export const TEST_TEMPLATES = [
  {
    testName: "AHG Test",
    resultType: "binary" as TestResultType,
    unit: "",
    referenceRange: {
      options: ["Negative"],
    },
  },
  {
    testName: "WBC Count",
    resultType: "numerical" as TestResultType,
    unit: "×10³/μL",
    referenceRange: {
      min: 4.5,
      max: 11.0,
    },
  },
  {
    testName: "Protein",
    resultType: "quantitative" as TestResultType,
    unit: "g/dL",
    referenceRange: {
      min: 6.0,
      max: 8.3,
    },
  },
  {
    testName: "Glucose",
    resultType: "categorical" as TestResultType,
    unit: "",
    referenceRange: {
      options: ["Negative", "Trace"],
    },
  },
  {
    testName: "ALT",
    resultType: "custom" as TestResultType,
    unit: "U/L",
    referenceRange: {
      min: 7,
      max: 56,
    },
  },
];
