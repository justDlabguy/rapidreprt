
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LabResult, LabInterpretation } from "@/lib/types";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import InterpretationView from "@/components/InterpretationView";
import { ExportButtons } from "./lab-results/ExportButtons";
import { TestResults } from "./lab-results/TestResults";

const ResultView = ({
  result,
  onBack,
}: {
  result: LabResult;
  onBack: () => void;
}) => {
  const { toast } = useToast();
  const [interpretation, setInterpretation] = useState<LabInterpretation | null>(null);
  const [isLoadingInterpretation, setIsLoadingInterpretation] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);

  // Define fetchInterpretation inside the component scope so it's available to all component code
  const fetchInterpretation = async () => {
    try {
      setIsLoadingInterpretation(true);
      setInterpretationError(null);
      
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error("Authentication error");
      }
      
      if (!sessionData.session) {
        console.error('No active session found');
        throw new Error("User not authenticated");
      }

      console.log('Checking for existing interpretation for lab result ID:', result.id);
      
      // First check if interpretation already exists
      const { data: existingInterpretation, error: fetchError } = await supabase
        .from('report_interpretations')
        .select('*')
        .eq('lab_result_id', result.id)
        .single();

      if (fetchError) {
        // Not found error is ok, we'll generate a new interpretation
        if (fetchError.code !== 'PGRST116') { 
          console.error('Error fetching existing interpretation:', fetchError);
          throw new Error("Failed to check existing interpretations");
        }
        console.log('No existing interpretation found, will generate new one');
      }

      if (existingInterpretation) {
        console.log('Found existing interpretation:', existingInterpretation);
        
        try {
          // Ensure the interpretation has the expected structure
          const parsedInterpretation: LabInterpretation = {
            summary: existingInterpretation.summary || "No summary available",
            recommendations: Array.isArray(existingInterpretation.recommendations) 
              ? existingInterpretation.recommendations 
              : [],
            interpretation: {
              concerning_values: Array.isArray(existingInterpretation.interpretation?.concerning_values)
                ? existingInterpretation.interpretation.concerning_values
                : [],
              normal_values: Array.isArray(existingInterpretation.interpretation?.normal_values)
                ? existingInterpretation.interpretation.normal_values
                : []
            }
          };
          
          setInterpretation(parsedInterpretation);
          setIsLoadingInterpretation(false);
          return;
        } catch (parseError) {
          console.error('Error parsing existing interpretation:', parseError);
          throw new Error("Invalid interpretation data format");
        }
      }

      // If no existing interpretation, call the edge function
      console.log('Calling analyze-lab-results function with data:', {
        ...result,
        created_by: sessionData.session.user.id
      });

      const response = await fetch('/functions/v1/analyze-lab-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify({
          labResult: {
            ...result,
            created_by: sessionData.session.user.id
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Edge function error response:', errorData);
        throw new Error(`Failed to analyze results: ${response.status} ${response.statusText}`);
      }

      const interpretationResult = await response.json();
      console.log('Received interpretation:', interpretationResult);
      setInterpretation(interpretationResult);
    } catch (error) {
      console.error('Error fetching interpretation:', error);
      setInterpretationError((error as Error).message);
      toast({
        title: "Error",
        description: `Failed to load results interpretation: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoadingInterpretation(false);
    }
  };

  useEffect(() => {
    if (result && result.id) {
      console.log('Fetching interpretation for result ID:', result.id);
      fetchInterpretation();
    }
  }, [result.id]);

  const handleRetryAnalysis = () => {
    setIsLoadingInterpretation(true);
    setInterpretationError(null);
    fetchInterpretation();
  };

  return (
    <div className="space-y-6 animate-slideIn print:animate-none">
      <Card className="p-6 space-y-6" id="report-content">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">Laboratory Results</h2>
            <p className="text-muted-foreground">
              {format(result.date, "MMMM d, yyyy")}
            </p>
          </div>
          <ExportButtons 
            result={result}
            isExporting={isExporting}
            setIsExporting={setIsExporting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Patient Name</p>
            <p className="font-medium">{result.patientName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Patient ID</p>
            <p className="font-medium">{result.patientId}</p>
          </div>
        </div>

        <TestResults results={result.results} />
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">AI Interpretation</h2>
        {interpretationError ? (
          <Card className="p-6 space-y-4 text-center">
            <p className="text-red-500">Error: {interpretationError}</p>
            <Button 
              onClick={handleRetryAnalysis}
              variant="outline"
            >
              Retry Analysis
            </Button>
          </Card>
        ) : (
          <InterpretationView 
            interpretation={interpretation!} 
            isLoading={isLoadingInterpretation} 
          />
        )}
      </div>

      <Button
        onClick={onBack}
        variant="outline"
        className="w-full print:hidden transition-all duration-200 hover:bg-accent"
      >
        Back to Form
      </Button>
    </div>
  );
};

export default ResultView;
