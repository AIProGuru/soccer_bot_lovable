
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { GamePlan } from "@/lib/api";
import { supabase } from "@/lib/supabase";

export interface MatchDetails {
  opponentTeam: string;
  date: string;
  time: string;
  competition: string;
  venue: string;
  saveReport: boolean;
}

export interface Tactics {
  formation: string;
  playStyle: string;
  focusArea: string;
  defensiveStrategy: string;
  offensiveStrategy: string;
  playerNotes: string;
  keyTacticalPrinciples: string;
  playerRoles: string;
  mentalityInstructions: string;
  inGameAdjustments: string;
  trainingFocus: string;
  inspiredBy: string;
}

export interface AIOutput {
  aiSuggestions: string;
  recommendedFormation: string;
  recommendedPlayStyle: string;
  keyTacticalPrinciples?: string;
}

export const useGamePlanState = () => {
  const [matchDetails, setMatchDetails] = useState<MatchDetails>({
    opponentTeam: "",
    date: "",
    time: "",
    competition: "",
    venue: "",
    saveReport: true,
  });

  const [tactics, setTactics] = useState<Tactics>({
    formation: "",
    playStyle: "",
    focusArea: "",
    defensiveStrategy: "",
    offensiveStrategy: "",
    playerNotes: "",
    keyTacticalPrinciples: "",
    playerRoles: "",
    mentalityInstructions: "",
    inGameAdjustments: "",
    trainingFocus: "",
    inspiredBy: "",
  });

  const [activeTab, setActiveTab] = useState("match-details");
  const [loading, setLoading] = useState(false);
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [aiOutput, setAiOutput] = useState<AIOutput | null>(null);
  const [showFollowUpChat, setShowFollowUpChat] = useState(false);
  
  const { toast } = useToast();

  const handleMatchDetailsChange = (field: string, value: string | boolean) => {
    setMatchDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleTacticsChange = (field: string, value: string) => {
    setTactics(prev => ({ ...prev, [field]: value }));
  };

  const handleLoadGamePlan = (plan: GamePlan) => {
    setMatchDetails({
      opponentTeam: plan.match_details.opponentTeam,
      date: plan.match_details.date,
      time: "",
      competition: plan.match_details.competitionType || "",
      venue: plan.match_details.venue,
      saveReport: plan.match_details.saveReport || true,
    });
    
    setTactics({
      formation: plan.team_analysis.formation,
      playStyle: plan.team_analysis.playStyle,
      focusArea: plan.team_analysis.focusArea || "",
      defensiveStrategy: "",
      offensiveStrategy: "",
      playerNotes: "",
      keyTacticalPrinciples: plan.team_analysis.keyTacticalPrinciples || "",
      playerRoles: plan.team_analysis.playerRoles || "",
      mentalityInstructions: plan.team_analysis.mentalityInstructions || "",
      inGameAdjustments: plan.team_analysis.inGameAdjustments || "",
      trainingFocus: plan.team_analysis.trainingFocus || "",
      inspiredBy: plan.team_analysis.inspiredBy || "",
    });
    
    setSavedPlanId(String(plan.id));
    
    if (plan.team_analysis.aiSuggestions) {
      setAiOutput({
        aiSuggestions: plan.team_analysis.aiSuggestions,
        recommendedFormation: plan.team_analysis.recommendedFormation || "",
        recommendedPlayStyle: plan.team_analysis.recommendedPlayStyle || "",
        keyTacticalPrinciples: plan.team_analysis.keyTacticalPrinciples || ""
      });
    } else {
      setAiOutput(null);
    }
    
    toast({
      title: "Game Plan Loaded",
      description: `Loaded game plan for ${plan.match_details.opponentTeam}`,
    });
  };

  useEffect(() => {
    if (aiOutput) {
      localStorage.setItem('aiSuggestions', aiOutput.aiSuggestions);
      localStorage.setItem('recommendedFormation', aiOutput.recommendedFormation);
      localStorage.setItem('recommendedPlayStyle', aiOutput.recommendedPlayStyle);
      if (aiOutput.keyTacticalPrinciples) {
        localStorage.setItem('keyTacticalPrinciples', aiOutput.keyTacticalPrinciples);
      }
    }
  }, [aiOutput]);

  return {
    matchDetails,
    tactics,
    activeTab,
    loading,
    savedPlanId,
    showConfirmDialog,
    aiOutput,
    showFollowUpChat,
    setActiveTab,
    setLoading,
    setSavedPlanId,
    setShowConfirmDialog,
    setAiOutput,
    setShowFollowUpChat,
    handleMatchDetailsChange,
    handleTacticsChange,
    handleLoadGamePlan,
    toast
  };
};
