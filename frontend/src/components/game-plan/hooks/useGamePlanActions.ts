import { useQueryClient } from "@tanstack/react-query";
import { useGamePlanState } from "./useGamePlanState";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useGamePlanActions = (
  state: ReturnType<typeof useGamePlanState>
) => {
  const {
    matchDetails,
    tactics,
    setLoading,
    setShowConfirmDialog,
    setAiOutput,
    setSavedPlanId,
    setShowFollowUpChat,
    toast,
  } = state;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    setShowConfirmDialog(true);
  };

  const generateGamePlan = async () => {
    setLoading(true);
    setShowConfirmDialog(false);

    try {
      console.log("Starting game plan generation with:", {
        matchDetails,
        tactics,
      });

      // First check if we have the required tactical information
      if (
        !tactics.formation ||
        !tactics.playStyle ||
        !tactics.defensiveStrategy
      ) {
        toast({
          title: "Missing Information",
          description:
            "Please select a formation, play style, and team mentality before generating a game plan.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Generate a unique ID for this plan
      const planId = uuidv4();
      setSavedPlanId(planId);

      // Call the Supabase Edge Function to generate the AI plan
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to create a training session");
      }
      const { data: profile, error: profileError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const response = await fetch(
        `${BACKEND_SERVER_URL}/v1/assistant/generate-game-plan-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchDetails,
            tactics,
            keyTacticalPrinciples: tactics.keyTacticalPrinciples,
            threadId: profile.thread_id,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.json(); // You can use response.json() if the backend returns JSON
        throw new Error(`Failed to generate plan: ${errorText}`);
      }

      const responseData = await response.json() 
      console.log(responseData)

      const aiResponseData = JSON.parse(responseData["aiResponseData"]);
      
      console.log(aiResponseData)

      // const responseData = await response.json();

      // const { data, error } = await supabase.functions.invoke(
      //   "generate-game-plan-ai",
      //   {
      //     body: {
      //       matchDetails,
      //       tactics,
      //       keyTacticalPrinciples: tactics.keyTacticalPrinciples,
      //     },
      //   }
      // );

      // if (error) {
      //   throw error;
      // }

      // Set AI output from the response
      // const aiResponseData = {
      //   aiSuggestions:
      //     data?.data?.aiSuggestions ||
      //     generateFallbackSuggestions(matchDetails, tactics),
      //   recommendedFormation:
      //     data?.data?.recommendedFormation || tactics.formation,
      //   recommendedPlayStyle:
      //     data?.data?.recommendedPlayStyle ||
      //     formatPlayStyle(tactics.playStyle),
      //   keyTacticalPrinciples: tactics.keyTacticalPrinciples || "",
      // };

      // Set AI output in state
      setAiOutput(aiResponseData);

      // Enable follow-up chat after generating the plan
      setShowFollowUpChat(true);

      toast({
        title: "Elite Analysis Complete",
        description:
          "Your professional game plan has been generated successfully!",
      });

      // Store data in localStorage for persistence between routes
      localStorage.setItem("aiSuggestions", aiResponseData.aiSuggestions);
      localStorage.setItem(
        "recommendedFormation",
        aiResponseData.recommendedFormation
      );
      localStorage.setItem(
        "recommendedPlayStyle",
        aiResponseData.recommendedPlayStyle
      );
      localStorage.setItem(
        "keyTacticalPrinciples",
        aiResponseData.keyTacticalPrinciples
      );

    } catch (error) {
      console.error("Error in game plan generation:", error);
      toast({
        title: "Generation Error",
        description:
          "We couldn't generate your game plan. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPlayStyle = (playStyle: string): string => {
    switch (playStyle) {
      case "possession":
        return "Possession-based with patient build-up";
      case "counter":
        return "Counter-attacking with quick transitions";
      case "gegenpressing":
        return "High pressing with aggressive ball recovery";
      case "wing-play":
        return "Wing-focused play with crosses and width";
      case "tiki-taka":
        return "Tiki-taka with quick passing combinations";
      case "low-block":
        return "Low defensive block with disciplined positioning";
      case "catenaccio":
        return "Catenaccio with strong defensive focus";
      case "direct":
        return "Direct play with vertical passes";
      case "vertical":
        return "Vertical play with line-breaking passes";
      default:
        return "Balanced approach with tactical flexibility";
    }
  };

  const generateFallbackSuggestions = (
    matchDetails: any,
    tactics: any
  ): string => {
    // Fallback suggestions in case the API call fails
    let suggestions = `# Professional Match Analysis\n\n## Strategic Overview\nBased on the analysis of your opponent ${
      matchDetails.opponentTeam
    }, we recommend a structured ${
      tactics.formation
    } formation with a focus on ${
      tactics.playStyle || "balanced play"
    } that capitalizes on your squad's strengths.\n\n## Key Recommendations\n- Maintain positional discipline when out of possession\n- Focus on quick transitions through the midfield\n- Utilize width to stretch the opposition defense\n- Set up defensive blocks in a mid-block structure`;

    // Add player instructions section
    suggestions += `\n\n## Player Instructions\n- Full-backs: Provide width in attack but maintain defensive position\n- Central Midfielders: Control tempo and screen the back four\n- Forwards: Press opposition center-backs when they have possession`;

    // Add set piece section
    suggestions += `\n\n## Set Piece Strategy\nDefensive corners: Zonal marking with 2 players on posts\nAttacking corners: Near post and far post runners with a decoy run to the penalty spot`;

    // Add tactical adjustments based on opponent
    if (tactics.playerNotes) {
      suggestions += `\n\n## Opponent-Specific Adjustments\nBased on your notes about ${
        matchDetails.opponentTeam
      }:\n- ${
        tactics.playerNotes.split(".")[0] ||
        "Focus on exploiting spaces behind their defensive line"
      }`;
    }

    // Add key tactical principles
    if (tactics.keyTacticalPrinciples) {
      suggestions += `\n\n## Key Tactical Principles\n${tactics.keyTacticalPrinciples}`;
    }

    return suggestions;
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/game-plan/${state.savedPlanId}`
    );
    toast({
      title: "Copied!",
      description: "Game plan link copied to clipboard",
    });
  };

  const handleExport = () => {
    if (matchDetails.saveReport) {
      toast({
        title: "Report Saved",
        description: "Your match report has been saved for future reference.",
      });
    } else {
      toast({
        title: "Coming Soon",
        description: "PDF export feature will be available soon.",
      });
    }
  };

  const handleClearAIOutput = () => {
    setAiOutput(null);
    setShowFollowUpChat(false);
  };

  const goToNextStep = () => {
    if (state.activeTab === "match-details") {
      state.setActiveTab("tactics");
      toast({
        title: "Step 2: Tactics",
        description: "Set up your team's tactical approach",
      });
    }
  };

  const goToPreviousStep = () => {
    if (state.activeTab === "tactics") {
      state.setActiveTab("match-details");
      toast({
        title: "Step 1: Match Details",
        description: "Enter basic match information",
      });
    }
  };

  return {
    handleGenerateClick,
    generateGamePlan,
    handleShare,
    handleExport,
    handleClearAIOutput,
    goToNextStep,
    goToPreviousStep,
  };
};
