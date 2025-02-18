
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUsageData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      // First check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Auth error:", authError);
        throw new Error("Authentication error");
      }
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Then fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_status, monthly_reports_used, monthly_reports_limit")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        throw new Error("Unable to fetch usage data");
      }

      if (!profile) {
        console.error("No profile found for user:", user.id);
        throw new Error("Profile not found");
      }

      return {
        subscription_status: profile.subscription_status,
        monthly_reports_used: profile.monthly_reports_used || 0,
        monthly_reports_limit: profile.monthly_reports_limit || 10 // Default limit
      };
    },
    retry: 1, // Only retry once to avoid too many failed attempts
    meta: {
      onError: (error: Error) => {
        console.error("Usage data error:", error);
        toast({
          title: "Error fetching usage data",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  });
};
