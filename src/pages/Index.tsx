
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChartBar, Star, Users, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChartBar,
      title: "AI-Powered Analytics",
      description: "Generate accurate lab reports instantly with our advanced AI system",
    },
    {
      icon: Star,
      title: "Easy to Use",
      description: "Intuitive interface designed for healthcare professionals",
    },
    {
      icon: Users,
      title: "Secure & Private",
      description: "HIPAA-compliant platform ensuring data protection",
    },
    {
      icon: CreditCard,
      title: "Flexible Plans",
      description: "Choose the perfect plan for your practice size",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 lg:px-16 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/71de1835-8c95-4ad3-aa36-1bb5070e49af.png" 
            alt="RapidReprt Logo" 
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center space-x-6">
          <Link to="#features" className="text-gray-600 hover:text-gray-900 hidden sm:block">Features</Link>
          <Link to="#about" className="text-gray-600 hover:text-gray-900 hidden sm:block">About</Link>
          <Link to="#pricing" className="text-gray-600 hover:text-gray-900 hidden sm:block">Pricing</Link>
          <Button
            variant="default"
            className="bg-[#222] hover:bg-[#333] text-white rounded-md"
            onClick={() => navigate("/auth")}
          >
            Sign in
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D3E4FD] to-[#F1F9FF] -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBzdG9wLW9wYWNpdHk9Ii4yNSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiNGRkYiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTAgMGgxNDQwdjc2MEgweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuMiIvPjwvc3ZnPg==')]" 
          style={{ backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay', opacity: 0.7 }}
        ></div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span className="text-[#0FA0CE]">Free</span> lab report generating software
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
              Generate accurate, professional lab reports in minutes with AI
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/lab-results")}
                className="bg-[#0FA0CE] hover:bg-[#0D8EB9] text-white font-medium px-8 py-3 rounded-md"
              >
                Generate Result
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-[#222] hover:bg-[#333] text-white border-0 font-medium px-8 py-3 rounded-md"
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for lab reporting
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Streamline your lab reporting process with our comprehensive solution
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative flex flex-col gap-6 rounded-2xl bg-card p-8 shadow-lg ring-1 ring-muted transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-7">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="about" className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to streamline your lab reporting?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join thousands of healthcare professionals who trust RapidReprt
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-[#0FA0CE] hover:bg-[#0D8EB9] text-white"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer id="pricing" className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-gray-500 text-sm">
          <p>© 2023 RapidReprt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
