
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="text-left space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#222222] animate-fadeIn">
              Laboratory Results Management
            </h1>
            <p className="text-xl text-[#555555] max-w-2xl animate-slideIn">
              Streamline your laboratory workflow with our intelligent report
              generation system
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="animate-fadeIn bg-[#33C3F0] text-white hover:bg-[#0FA0CE]"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                size="lg"
                className="animate-fadeIn border-[#403E43] text-[#403E43] hover:bg-[#403E43] hover:text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
          <div className="relative animate-slideIn [animation-delay:200ms] lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50 rounded-lg"></div>
            <Card className="overflow-hidden border-[#E5E7EB] bg-white shadow-lg">
              <img
                src="/lovable-uploads/3e68076e-e0cf-4a78-adbd-1e77289d1ca2.png"
                alt="Dashboard Preview"
                className="w-full h-auto rounded-lg"
              />
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <Card className="p-6 space-y-2 animate-slideIn bg-white shadow-md border-[#E5E7EB]">
            <h3 className="text-xl font-semibold text-[#222222]">AI-Powered Generation</h3>
            <p className="text-[#555555]">
              Intelligent report generation with automatic status detection and
              formatting
            </p>
          </Card>
          <Card className="p-6 space-y-2 animate-slideIn [animation-delay:200ms] bg-white shadow-md border-[#E5E7EB]">
            <h3 className="text-xl font-semibold text-[#222222]">Secure Storage</h3>
            <p className="text-[#555555]">
              Your data is encrypted and stored securely with industry-standard
              protocols
            </p>
          </Card>
          <Card className="p-6 space-y-2 animate-slideIn [animation-delay:400ms] bg-white shadow-md border-[#E5E7EB]">
            <h3 className="text-xl font-semibold text-[#222222]">Easy Export</h3>
            <p className="text-[#555555]">
              Download and print reports in multiple formats for seamless sharing
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
