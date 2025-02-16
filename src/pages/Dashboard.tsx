
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface LabResultWithStatus {
  id: string;
  patient_name: string;
  patient_id: string;
  date: string;
  status: 'pending' | 'complete';
}

interface DashboardStats {
  totalReports: number;
  completeReports: number;
  pendingReports: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const { data: labResults, error } = await supabase
        .from('lab_results')
        .select('id, test_results(status)');

      if (error) throw error;

      const totalReports = labResults.length;
      const completeReports = labResults.filter(lr => 
        lr.test_results.every(tr => tr.status !== 'pending')
      ).length;
      const pendingReports = totalReports - completeReports;

      return {
        totalReports,
        completeReports,
        pendingReports
      };
    }
  });

  // Fetch recent lab results
  const { data: recentResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['recent-results'],
    queryFn: async (): Promise<LabResultWithStatus[]> => {
      const { data, error } = await supabase
        .from('lab_results')
        .select(`
          id,
          patient_name,
          patient_id,
          date,
          test_results(status)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      return data.map(result => ({
        id: result.id,
        patient_name: result.patient_name,
        patient_id: result.patient_id,
        date: result.date,
        status: result.test_results.some(test => test.status === 'pending') 
          ? 'pending' 
          : 'complete'
      }));
    },
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error fetching results",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8 animate-fadeIn">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <Button onClick={() => navigate("/lab-results")}>New Lab Result</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 animate-slideIn">
            <h2 className="text-xl font-semibold mb-2">Total Reports</h2>
            <p className="text-3xl font-bold">
              {statsLoading ? "..." : stats?.totalReports || 0}
            </p>
          </Card>
          
          <Card className="p-6 animate-slideIn [animation-delay:200ms]">
            <h2 className="text-xl font-semibold mb-2">Complete Reports</h2>
            <p className="text-3xl font-bold text-green-600">
              {statsLoading ? "..." : stats?.completeReports || 0}
            </p>
          </Card>

          <Card className="p-6 animate-slideIn [animation-delay:400ms]">
            <h2 className="text-xl font-semibold mb-2">Pending Reports</h2>
            <p className="text-3xl font-bold text-yellow-600">
              {statsLoading ? "..." : stats?.pendingReports || 0}
            </p>
          </Card>
        </div>

        <Card className="p-6 animate-slideIn [animation-delay:600ms]">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          {resultsLoading ? (
            <p>Loading...</p>
          ) : recentResults && recentResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.patient_name}</TableCell>
                    <TableCell>{result.patient_id}</TableCell>
                    <TableCell>
                      {new Date(result.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.status === 'complete' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/lab-results/${result.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No recent reports</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
