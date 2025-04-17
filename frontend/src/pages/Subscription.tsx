import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const pricingPlans = [
  {
    id: "basic",
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
    id: "pro",
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
    id: "elite",
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
  const [subscribingPlan, setSubscribingPlan] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        // In a real app, this would be an API call to check the subscription status
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          navigate("/auth");
          return;
        }

        // This is a simplified mock implementation - in a real app,
        // you would fetch subscription data from your database
        const trialStartStr = localStorage.getItem("trialStart");
        let isInTrial = false;
        let daysLeft = 0;

        if (trialStartStr) {
          const trialStart = new Date(trialStartStr);
          const now = new Date();

          // 7 day trial period
          const trialEnd = new Date(trialStart);
          trialEnd.setDate(trialStart.getDate() + 7);

          if (now <= trialEnd) {
            isInTrial = true;
            daysLeft = Math.ceil(
              (trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            );
          }
        }

        // Check if user has an active subscription
        const subscriptionPlan = localStorage.getItem("subscriptionPlan");

        setStatus({
          isActive: !!subscriptionPlan,
          isInTrial: isInTrial,
          plan: subscriptionPlan || undefined,
          daysLeft: daysLeft,
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
      setSubscribingPlan(planId);

      toast({
        title: "Processing",
        description: `Setting up your ${planId} plan...`,
      });

      // Call the Express backend to create a Stripe checkout session
      const response = await fetch(
        `${BACKEND_SERVER_URL}/v1/subscription/create-checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: planId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process subscription",
        variant: "destructive",
      });
      setSubscribingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-coaching-900">
        <div className="text-white text-xl">
          Loading subscription details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coaching-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {status.isInTrial && (
          <div className="bg-coaching-700 text-coaching-50 p-4 rounded-lg mb-8 text-center">
            <h2 className="text-xl font-bold">
              You're currently in your 7-day free trial
            </h2>
            <p className="mt-2">
              {status.daysLeft && status.daysLeft > 0
                ? `${status.daysLeft} days remaining. Choose a plan to continue after your trial ends.`
                : "Your trial is ending today. Choose a plan to continue using our platform."}
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-coaching-50 sm:text-4xl">
            Choose Your Plan
          </h1>
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
                <CardTitle className="text-2xl font-bold text-coaching-50">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-coaching-200">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-coaching-50">
                    {plan.price}
                  </span>
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
                  disabled={
                    subscribingPlan === plan.id || status.plan === plan.id
                  }
                >
                  {subscribingPlan === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : status.plan === plan.id ? (
                    "Current Plan"
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-coaching-300">
          <p>
            Questions about our plans? Contact us at support@coachingapp.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
