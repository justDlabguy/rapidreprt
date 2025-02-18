
import { Card } from "@/components/ui/card";
import { LabInterpretation } from "@/lib/types";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface InterpretationViewProps {
  interpretation: LabInterpretation;
  isLoading?: boolean;
}

const InterpretationView = ({ interpretation, isLoading }: InterpretationViewProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 space-y-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="text-muted-foreground">{interpretation.summary}</p>
      </div>

      {interpretation.interpretation.concerning_values.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Concerning Values
          </h3>
          <div className="space-y-3">
            {interpretation.interpretation.concerning_values.map((value, index) => (
              <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-900">
                  {value.test_name}: {value.value}
                </div>
                <p className="text-sm text-yellow-700 mt-1">{value.implication}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {interpretation.interpretation.normal_values.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Normal Values
          </h3>
          <div className="p-3 bg-green-50 rounded-lg">
            <ul className="list-disc list-inside space-y-1">
              {interpretation.interpretation.normal_values.map((value, index) => (
                <li key={index} className="text-green-700">{value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {interpretation.recommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
          <ul className="list-disc list-inside space-y-2">
            {interpretation.recommendations.map((recommendation, index) => (
              <li key={index} className="text-muted-foreground">{recommendation}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default InterpretationView;
