
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

      {/* Hero Section - Reverting to previous design */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Generate lab reports</span>{" "}
                <span className="block text-[#0FA0CE] xl:inline">in seconds</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Our AI-powered platform analyzes your lab results and generates comprehensive, 
                professional reports instantly. Save time and improve accuracy.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button
                      className="w-full bg-[#0FA0CE] hover:bg-[#0D8EB9] px-8 py-3 text-base font-medium text-white"
                      onClick={() => navigate("/lab-results")}
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button
                      variant="outline"
                      className="w-full bg-[#222] hover:bg-[#333] text-white border-0 px-8 py-3"
                      onClick={() => navigate("/auth")}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    alt="Lab results"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
