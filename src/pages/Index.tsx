
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-fadeIn">
            Laboratory Results Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slideIn">
            Streamline your laboratory workflow with our intelligent report
            generation system
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="animate-fadeIn"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              size="lg"
              className="animate-fadeIn"
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <Card className="p-6 space-y-2 animate-slideIn">
            <h3 className="text-xl font-semibold">AI-Powered Generation</h3>
            <p className="text-muted-foreground">
              Intelligent report generation with automatic status detection and
              formatting
            </p>
          </Card>
          <Card className="p-6 space-y-2 animate-slideIn [animation-delay:200ms]">
            <h3 className="text-xl font-semibold">Secure Storage</h3>
            <p className="text-muted-foreground">
              Your data is encrypted and stored securely with industry-standard
              protocols
            </p>
          </Card>
          <Card className="p-6 space-y-2 animate-slideIn [animation-delay:400ms]">
            <h3 className="text-xl font-semibold">Easy Export</h3>
            <p className="text-muted-foreground">
              Download and print reports in multiple formats for seamless sharing
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
