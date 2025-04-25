import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionTier = 'starter' | 'pro' | 'elite';

export interface TrialStatus {
  isInTrial: boolean;
  daysLeft: number;
  hasActiveSubscription: boolean;
  subscriptionTier?: SubscriptionTier;
}

interface FeatureAccess {
  [key: string]: {
    starter: boolean;
    pro: boolean;
    elite: boolean;
  };
}

const FEATURE_ACCESS: FeatureAccess = {
  trainingPlanner: { starter: true, pro: true, elite: true },
  gamePlanCreator: { starter: true, pro: true, elite: true },
  opponentAnalysis: { starter: false, pro: true, elite: true },
  eliteCoach: { starter: false, pro: true, elite: true },
  videoAnalysis: { starter: false, pro: true, elite: true },
  advancedStats: { starter: false, pro: false, elite: true },
  teamManagement: { starter: false, pro: false, elite: true },
  customTrainingPlans: { starter: false, pro: false, elite: true },
  apiAccess: { starter: false, pro: false, elite: true }
};

export const useTrialStatus = () => {
  const [status, setStatus] = useState<TrialStatus>({
    isInTrial: false,
    daysLeft: 0,
    hasActiveSubscription: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkTrialStatus();
  }, []);

  const checkTrialStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data: subscriber, error: subscriptionError } = await supabase
      .from('subscribers')
      .select('subscription_tier, subscription_end, trial_start, trial_end')
      .eq('user_id', session.user.id)
      .single();

    if (subscriptionError) {
      const trialStart = new Date();
      const trialEnd = new Date();
      trialEnd.setDate(trialStart.getDate() + 7);

      const { error: createError } = await supabase
        .from('subscribers')
        .insert({
          user_id: session.user.id,
          subscription_tier: 'starter',
          trial_start: trialStart.toISOString(),
          trial_end: trialEnd.toISOString()
        });

      if (!createError) {
        setStatus({
          isInTrial: true,
          daysLeft: 7,
          hasActiveSubscription: false,
          subscriptionTier: 'starter'
        });
      }
      return;
    }

    if (subscriber) {
      if (subscriber.subscription_tier && subscriber.subscription_tier !== 'starter') {
        setStatus({
          isInTrial: false,
          daysLeft: 0,
          hasActiveSubscription: true,
          subscriptionTier: subscriber.subscription_tier as SubscriptionTier
        });
        return;
      }

      const now = new Date();
      const trialEnd = subscriber.trial_end ? new Date(subscriber.trial_end) : null;
      
      if (trialEnd && now <= trialEnd) {
        const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        setStatus({
          isInTrial: true,
          daysLeft: Math.max(0, daysLeft),
          hasActiveSubscription: false,
          subscriptionTier: 'starter'
        });
      } else {
        setStatus({
          isInTrial: false,
          daysLeft: 0,
          hasActiveSubscription: false,
          subscriptionTier: 'starter'
        });
      }
    }
  };

  const hasFeatureAccess = (feature: keyof typeof FEATURE_ACCESS) => {
    const currentTier = status.subscriptionTier || 'starter';
    
    if (status.isInTrial) return true;
    
    return FEATURE_ACCESS[feature][currentTier];
  };

  const checkFeatureAccess = (feature: keyof typeof FEATURE_ACCESS) => {
    console.log("here to check feature access", hasFeatureAccess(feature))
    if (!hasFeatureAccess(feature)) {
      const message = status.isInTrial ? 
        "Your trial has expired. Please subscribe to continue using this feature." :
        "This feature requires a higher subscription tier. Please upgrade your plan to access it.";
      
      toast({
        title: "Subscription Required",
        description: message,
        variant: "destructive",
      });
      navigate("/subscription");
      return false;
    }
    return true;
  };

  return { ...status, checkFeatureAccess, hasFeatureAccess };
};