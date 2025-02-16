
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import SubscriptionCard from "@/components/subscription/SubscriptionCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Billing = () => {
  const { toast } = useToast();

  const { data: usage } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_status, monthly_reports_used, monthly_reports_limit")
        .single();

      if (profileError) throw profileError;

      return profile;
    },
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

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Billing & Usage</h1>

      {usage && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Usage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Reports Used</p>
              <p className="text-2xl font-semibold">
                {usage.monthly_reports_used} / {usage.monthly_reports_limit}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <p className="text-2xl font-semibold capitalize">
                {usage.subscription_status}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Renewal Date</p>
              <p className="text-2xl font-semibold">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <SubscriptionCard />
      </div>
    </div>
  );
};

export default Billing;
