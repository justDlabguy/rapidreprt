
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TestResult, LabResult } from "@/lib/types";
import PatientInfoForm from "./lab/PatientInfoForm";
import TestList from "./lab/TestList";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LabForm = ({ onSubmit }: { onSubmit: (result: LabResult) => void }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [tests, setTests] = useState<TestResult[]>([]);

  const { data: usage, isError, error } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        throw new Error("User not authenticated");
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_status, monthly_reports_used, monthly_reports_limit")
        .eq("id", user.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        throw new Error("Unable to fetch usage data");
      }

      if (!profile) {
        throw new Error("Profile not found");
      }

      return profile;
    },
    retry: 2,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error fetching usage data",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isError) {
      toast({
        title: "Error",
        description: "Unable to verify usage limits. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!usage) {
      toast({
        title: "Error",
        description: "Unable to verify usage limits. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (usage.monthly_reports_used >= usage.monthly_reports_limit) {
      toast({
        title: "Usage Limit Reached",
        description: "Please upgrade your plan to create more reports.",
        variant: "destructive",
      });
      navigate("/billing");
      return;
    }

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

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      const result: LabResult = {
        id: crypto.randomUUID(),
        patientName,
        patientId,
        date: new Date(),
        results: tests,
      };

      // Update usage count
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          monthly_reports_used: usage.monthly_reports_used + 1,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      onSubmit(result);
      toast({
        title: "Success",
        description: "Lab results have been generated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
      >
        Generate Results
      </Button>
    </form>
  );
};

export default LabForm;
