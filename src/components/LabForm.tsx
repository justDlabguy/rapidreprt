
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LabResult } from "@/lib/types";
import PatientInfoForm from "./lab/PatientInfoForm";
import TestList from "./lab/TestList";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useUsageData } from "@/hooks/use-usage-data";
import { useTestManagement } from "@/hooks/use-test-management";
import { saveLabResult, updateUsageCount } from "@/lib/lab-result-service";

const LabForm = ({ onSubmit }: { onSubmit: (result: LabResult) => void }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tests, addTest, updateTest, removeTest } = useTestManagement();
  const { data: usage, isError } = useUsageData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isError) {
        throw new Error("Unable to verify usage limits. Please try again.");
      }

      if (!usage) {
        throw new Error("Unable to verify usage limits. Please try again.");
      }

      if (usage.monthly_reports_used >= usage.monthly_reports_limit) {
        navigate("/billing");
        throw new Error("Please upgrade your plan to create more reports.");
      }

      if (!patientName || !patientId) {
        throw new Error("Please fill in patient details");
      }

      if (tests.length === 0) {
        throw new Error("Please add at least one test");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      const labResultId = crypto.randomUUID();
      
      await saveLabResult(labResultId, patientName, patientId, user.id, tests);
      await updateUsageCount(user.id, usage.monthly_reports_used);

      const result: LabResult = {
        id: labResultId,
        patientName,
        patientId,
        date: new Date(),
        results: tests,
      };

      onSubmit(result);
      toast({
        title: "Success",
        description: "Lab results have been saved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Generate Results"}
      </Button>
    </form>
  );
};

export default LabForm;
