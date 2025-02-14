
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LabResult } from "@/lib/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentResults] = useState<LabResult[]>([]); // In a real app, this would fetch from an API

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8 animate-fadeIn">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <Button onClick={() => navigate("/lab-results")}>New Lab Result</Button>
        </div>

        <div className="grid gap-6">
          <Card className="p-6 animate-slideIn">
            <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
            {recentResults.length > 0 ? (
              <div className="grid gap-4">
                {recentResults.map((result) => (
                  <Card key={result.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{result.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {result.patientId}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/lab-results/${result.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent results</p>
            )}
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 animate-slideIn [animation-delay:200ms]">
              <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
              <p className="text-3xl font-bold">{recentResults.length}</p>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </Card>
            <Card className="p-6 animate-slideIn [animation-delay:400ms]">
              <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
              <p className="text-muted-foreground mb-4">
                Check our documentation for detailed guides and tutorials.
              </p>
              <Button variant="outline" className="w-full">
                View Documentation
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
