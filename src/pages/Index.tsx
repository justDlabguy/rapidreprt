
import { useState } from "react";
import LabForm from "@/components/LabForm";
import ResultView from "@/components/ResultView";
import { LabResult } from "@/lib/types";

const Index = () => {
  const [result, setResult] = useState<LabResult | null>(null);

  const handleSubmit = (labResult: LabResult) => {
    setResult(labResult);
  };

  const handleBack = () => {
    setResult(null);
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

export default Index;
