
import { supabase } from "@/integrations/supabase/client";
import { TestResult } from "@/lib/types";

export const saveLabResult = async (
  labResultId: string,
  patientName: string,
  patientId: string,
  userId: string,
  tests: TestResult[]
) => {
  console.log(`Saving lab result ${labResultId} for user ${userId}`);
  
  const { error: labResultError } = await supabase
    .from("lab_results")
    .insert({
      id: labResultId,
      patient_name: patientName,
      patient_id: patientId,
      created_by: userId,
    });

  if (labResultError) {
    console.error("Error saving lab result:", labResultError);
    throw labResultError;
  }

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

  if (testResultsError) {
    console.error("Error saving test results:", testResultsError);
    throw testResultsError;
  }
  
  console.log("Successfully saved lab result and test results");
};

export const updateUsageCount = async (userId: string, currentUsage: number) => {
  console.log(`Updating usage count for user ${userId} from ${currentUsage} to ${currentUsage + 1}`);
  
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      monthly_reports_used: currentUsage + 1,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating usage count:", updateError);
    throw updateError;
  }
  
  console.log("Successfully updated usage count");
};

export const getLabResults = async (userId: string) => {
  console.log(`Fetching lab results for user ${userId}`);
  
  const { data, error } = await supabase
    .from("lab_results")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching lab results:", error);
    throw error;
  }
  
  console.log(`Found ${data?.length || 0} lab results`);
  return data;
};
