
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

  useEffect(() => {
    const fetchInterpretation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data: existingInterpretation } = await supabase
          .from('report_interpretations')
          .select('*')
          .eq('lab_result_id', result.id)
          .single();

        if (existingInterpretation) {
          setInterpretation({
            summary: existingInterpretation.summary as string,
            recommendations: existingInterpretation.recommendations as string[],
            interpretation: existingInterpretation.interpretation as {
              concerning_values: Array<{
                test_name: string;
                value: string;
                implication: string;
              }>;
              normal_values: string[];
            }
          });
          setIsLoadingInterpretation(false);
          return;
        }

        const response = await fetch('/functions/v1/analyze-lab-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            labResult: {
              ...result,
              created_by: user.id
            }
          })
        });

        if (!response.ok) throw new Error('Failed to analyze results');

        const interpretation = await response.json();
        setInterpretation(interpretation);
      } catch (error) {
        console.error('Error fetching interpretation:', error);
        toast({
          title: "Error",
          description: "Failed to load results interpretation. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingInterpretation(false);
      }
    };

    fetchInterpretation();
  }, [result.id, toast]);

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

      {(isLoadingInterpretation || interpretation) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">AI Interpretation</h2>
          <InterpretationView 
            interpretation={interpretation!} 
            isLoading={isLoadingInterpretation} 
          />
        </div>
      )}

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
