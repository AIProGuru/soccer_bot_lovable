import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Clear any user-specific localStorage data if needed
      localStorage.removeItem("trialStart");
      localStorage.removeItem("subscriptionPlan");

      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });

      // Redirect to authentication page
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Sign Out Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="flex items-center gap-2 text-destructive hover:text-destructive/80"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
};
