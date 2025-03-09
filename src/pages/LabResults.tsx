
import { useState, useEffect } from "react";
import LabForm from "@/components/LabForm";
import ResultView from "@/components/ResultView";
import { LabResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const LabResults = () => {
  const [result, setResult] = useState<LabResult | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have lab results in the location state when navigating from another page
    if (location.state && location.state.labResult) {
      try {
        setResult(location.state.labResult);
      } catch (error) {
        console.error("Error setting lab result from location state:", error);
        toast({
          title: "Error",
          description: "Failed to load saved lab results",
          variant: "destructive",
        });
      }
    }
  }, [location.state]);

  const handleSubmit = (labResult: LabResult) => {
    setResult(labResult);
    // Update location state to preserve result during navigation
    navigate("", { state: { labResult } });
  };

  const handleBack = () => {
    setResult(null);
    navigate("", { state: {} });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 text-center animate-fadeIn">
          {result ? "Laboratory Results" : "Laboratory Test Input"}
        </h1>
        {result ? (
          <ResultView result={result} onBack={handleBack} />
        ) : (
          <LabForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default LabResults;
