
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true to prevent flash
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscriptionChecked, setIsSubscriptionChecked] = useState(false);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access this page",
          });
          navigate("/auth");
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);

        // Check subscription status
        // In a real app, this would be an API call to check trial status
        // For now, we'll simulate a trial check with localStorage
        try {
          const trialStartStr = localStorage.getItem("trialStart");
          let redirectToSubscription = false;

          if (!trialStartStr) {
            // First time user - start trial
            const now = new Date().toISOString();
            localStorage.setItem("trialStart", now);
          } else {
            // Check if trial has expired
            const trialStart = new Date(trialStartStr);
            const now = new Date();
            
            // 7 day trial period
            const trialEnd = new Date(trialStart);
            trialEnd.setDate(trialStart.getDate() + 7);
            
            if (now > trialEnd) {
              // Trial expired, check if subscribed
              const isSubscribed = localStorage.getItem("subscriptionPlan");
              if (!isSubscribed) {
                redirectToSubscription = true;
              }
            }
          }

          setIsSubscriptionChecked(true);

          if (redirectToSubscription && window.location.pathname !== "/subscription") {
            navigate("/subscription");
          }
        } catch (error) {
          console.error("Subscription check error:", error);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/auth");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        checkSession(); // Re-check session and subscription when auth state changes
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate, toast]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-coaching-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
