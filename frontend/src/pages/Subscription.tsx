
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const pricingPlans = [
  {
    id: "monthly",
    name: "Basic",
    price: "$9.99",
    billing: "per month",
    description: "For individuals getting started",
    features: [
      "Full access to all training sessions",
      "Opponent analysis",
      "Game plan creation",
      "Elite coach consultations",
      "Email support",
    ],
  },
  {
    id: "annual",
    name: "Pro",
    price: "$19.99",
    billing: "per month",
    description: "For serious coaches",
    features: [
      "Everything in Basic",
      "Advanced tactical analysis",
      "Unlimited game plans",
      "Priority support",
      "Team management tools",
      "Video analysis integration",
    ],
    popular: true,
  },
  {
    id: "lifetime",
    name: "Elite",
    price: "$199.99",
    billing: "one-time payment",
    description: "For professional coaches",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "One-on-one coaching sessions",
      "Custom training plan creation",
      "Unlimited players",
      "White-glove onboarding",
      "API access",
    ],
  },
];

type SubscriptionStatus = {
  isActive: boolean;
  plan?: string;
  trialEnd?: Date;
  isInTrial: boolean;
  daysLeft?: number;
};

const Subscription = () => {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isActive: false,
    isInTrial: false,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        // In a real app, this would be an API call to check the subscription status
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        // This is a simplified mock implementation - in a real app, 
        // you would fetch subscription data from your database
        const mockTrialEndDate = new Date();
        mockTrialEndDate.setDate(mockTrialEndDate.getDate() + 7); // 7 days from now
        
        const today = new Date();
        const diffTime = mockTrialEndDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        setStatus({
          isActive: true,
          isInTrial: true,
          trialEnd: mockTrialEndDate,
          daysLeft: diffDays,
        });
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [navigate]);

  const handleSubscribe = async (planId: string) => {
    try {
      toast({
        title: "Subscription process",
        description: `Starting subscription process for ${planId} plan...`,
      });
      
      // In a real application, you would:
      // 1. Call an edge function that creates a Stripe Checkout session
      // 2. Redirect the user to the Stripe Checkout page
      // 3. Handle the redirect back and update the subscription status

      // Mock implementation for demonstration
      setTimeout(() => {
        toast({
          title: "Subscription successful",
          description: "You've been subscribed to our service successfully!",
        });
        
        setStatus({
          isActive: true,
          plan: planId,
          isInTrial: false,
        });
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process subscription",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-coaching-900">
        <div className="text-white text-xl">Loading subscription details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coaching-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {status.isInTrial && (
          <div className="bg-coaching-700 text-coaching-50 p-4 rounded-lg mb-8 text-center">
            <h2 className="text-xl font-bold">You're currently in your 7-day free trial</h2>
            <p className="mt-2">
              {status.daysLeft && status.daysLeft > 0
                ? `${status.daysLeft} days remaining. Choose a plan to continue after your trial ends.`
                : "Your trial is ending today. Choose a plan to continue using our platform."}
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-coaching-50 sm:text-4xl">Choose Your Plan</h1>
          <p className="mt-4 text-xl text-coaching-200">
            Get unlimited access to all our coaching tools and features
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`flex flex-col ${
                plan.popular 
                  ? "border-coaching-500 relative overflow-hidden" 
                  : "border-coaching-700 bg-coaching-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-coaching-500 text-coaching-50 text-xs uppercase font-bold py-1 px-4 rotate-45 translate-x-[40%] translate-y-[40%]">
                    Popular
                  </div>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl font-bold text-coaching-50">{plan.name}</CardTitle>
                <CardDescription className="text-coaching-200">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-coaching-50">{plan.price}</span>
                  <span className="text-coaching-300 ml-2">{plan.billing}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-coaching-200">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-coaching-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  variant={plan.popular ? "coaching" : "outline"}
                  className="w-full"
                >
                  {status.plan === plan.id ? "Current Plan" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center text-coaching-300">
          <p>Questions about our plans? Contact us at support@coachingapp.com</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
