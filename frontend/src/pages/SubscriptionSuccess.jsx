import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SubscriptionSuccess = () => {
  const [plan, setPlan] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the plan from the URL query parameters
    const params = new URLSearchParams(location.search);
    const planParam = params.get("plan");

    if (planParam) {
      setPlan(planParam);

      // Store subscription info in localStorage
      localStorage.setItem("subscriptionPlan", planParam);

      toast({
        title: "Subscription successful!",
        description: `You now have access to our ${
          planParam === "monthly"
            ? "Basic"
            : planParam === "annual"
            ? "Pro"
            : "Elite"
        } plan.`,
      });
    }
  }, [location, toast]);

  return (
    <div className="min-h-screen bg-coaching-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-coaching-800 rounded-lg p-8 border border-coaching-700">
        <div className="mx-auto w-16 h-16 bg-coaching-700 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-coaching-500" />
        </div>

        <h1 className="text-2xl font-bold text-coaching-50 mb-4">
          Thank you for your subscription!
        </h1>

        <p className="text-coaching-200 mb-6">
          Your{" "}
          {plan === "monthly" ? "Basic" : plan === "annual" ? "Pro" : "Elite"}{" "}
          subscription is now active, and you have full access to all its
          features.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/")}
            variant="coaching"
            className="w-full"
          >
            Go to Dashboard
          </Button>

          <Button
            onClick={() => navigate("/game-plan")}
            variant="outline"
            className="w-full"
          >
            Create Game Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
