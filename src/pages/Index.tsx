
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5] via-[#7E69AB] to-[#D6BCFA]">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white animate-fadeIn">
            Laboratory Results Management
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-slideIn">
            Streamline your laboratory workflow with our intelligent report
            generation system
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="animate-fadeIn bg-white text-primary hover:bg-white/90"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              size="lg"
              className="animate-fadeIn bg-transparent border-white text-white hover:bg-white/10"
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <Card className="p-6 space-y-2 animate-slideIn bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-semibold text-white">AI-Powered Generation</h3>
            <p className="text-white/80">
              Intelligent report generation with automatic status detection and
              formatting
            </p>
          </Card>
          <Card className="p-6 space-y-2 animate-slideIn [animation-delay:200ms] bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-semibold text-white">Secure Storage</h3>
            <p className="text-white/80">
              Your data is encrypted and stored securely with industry-standard
              protocols
            </p>
          </Card>
          <Card className="p-6 space-y-2 animate-slideIn [animation-delay:400ms] bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-semibold text-white">Easy Export</h3>
            <p className="text-white/80">
              Download and print reports in multiple formats for seamless sharing
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
