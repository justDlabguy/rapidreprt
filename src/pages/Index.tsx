
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChartBar, Star, Users, CreditCard } from "lucide-react";

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
      {/* Hero Section */}
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary-foreground opacity-30" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Welcome to RapidReprt
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-lg text-muted-foreground sm:text-xl">
              Fast, accurate, and efficient lab reporting system. Transform your lab results into clear, professional reports in seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-muted/50">
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
      <div className="relative isolate">
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
                className="animate-pulse"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
