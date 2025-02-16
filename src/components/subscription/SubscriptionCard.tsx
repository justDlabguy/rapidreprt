
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  name: string;
  price: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    name: "Free",
    price: "$0/month",
    features: [
      { text: "5 reports per month", included: true },
      { text: "Basic templates", included: true },
      { text: "Email support", included: true },
      { text: "Advanced analytics", included: false },
      { text: "Custom branding", included: false },
    ],
    buttonText: "Current Plan",
  },
  {
    name: "Premium",
    price: "$29/month",
    features: [
      { text: "50 reports per month", included: true },
      { text: "All templates", included: true },
      { text: "Priority support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: false },
    ],
    buttonText: "Upgrade to Premium",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99/month",
    features: [
      { text: "Unlimited reports", included: true },
      { text: "All templates", included: true },
      { text: "24/7 support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: true },
    ],
    buttonText: "Contact Sales",
  },
];

const SubscriptionCard = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`p-6 relative ${
            plan.popular
              ? "border-primary shadow-lg scale-105"
              : "border-border"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
          )}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold">{plan.price}</p>
          </div>
          <ul className="space-y-4 mb-6">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 ${
                  feature.included ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <CheckCircle2
                  className={`h-5 w-5 ${
                    feature.included ? "text-primary" : "text-muted-foreground/40"
                  }`}
                />
                {feature.text}
              </li>
            ))}
          </ul>
          <Button
            className="w-full"
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.buttonText}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionCard;
