
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to RapidReprt
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Fast, accurate, and efficient lab reporting system.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="w-full sm:w-auto"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/auth")}
            className="w-full sm:w-auto"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
