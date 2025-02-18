
import { supabase } from "@/integrations/supabase/client";
import { TestResult } from "@/lib/types";

export const saveLabResult = async (
  labResultId: string,
  patientName: string,
  patientId: string,
  userId: string,
  tests: TestResult[]
) => {
  const { error: labResultError } = await supabase
    .from("lab_results")
    .insert({
      id: labResultId,
      patient_name: patientName,
      patient_id: patientId,
      created_by: userId,
    });

  if (labResultError) throw labResultError;

  const testResults = tests.map(test => ({
    lab_result_id: labResultId,
    test_name: test.testName,
    value: typeof test.value === 'number' ? test.value : parseFloat(test.value.toString()),
    unit: test.unit,
    status: test.status,
    reference_range_min: test.referenceRange.min,
    reference_range_max: test.referenceRange.max,
  }));

  const { error: testResultsError } = await supabase
    .from("test_results")
    .insert(testResults);

  if (testResultsError) throw testResultsError;
};

export const updateUsageCount = async (userId: string, currentUsage: number) => {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      monthly_reports_used: currentUsage + 1,
    })
    .eq("id", userId);

  if (updateError) throw updateError;
};
