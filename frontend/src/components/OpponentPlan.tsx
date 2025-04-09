
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GamePlanList } from "./game-plan/GamePlanList";
import { GamePlanActions } from "./game-plan/GamePlanActions";
import { GamePlanConfirmationDialog } from "./game-plan/GamePlanConfirmationDialog";
import { GamePlanAIOutput } from "./game-plan/GamePlanAIOutput";
import { GamePlanTabs } from "./game-plan/GamePlanTabs";
import { KeyTacticalPrinciplesSection } from "./game-plan/components/KeyTacticalPrinciplesSection";
import { useGamePlanState } from "./game-plan/hooks/useGamePlanState";
import { saveGamePlan } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const OpponentPlan = () => {
  const {
    matchDetails,
    tactics,
    activeTab,
    loading,
    savedPlanId,
    showConfirmDialog,
    aiOutput,
    setActiveTab,
    setLoading,
    setSavedPlanId,
    setShowConfirmDialog,
    setAiOutput,
    handleMatchDetailsChange,
    handleTacticsChange,
    handleLoadGamePlan,
    toast
  } = useGamePlanState();

  const queryClient = useQueryClient();

  const handleGenerateClick = () => {
    setShowConfirmDialog(true);
  };

  const generateGamePlan = async () => {
    setLoading(true);
    setShowConfirmDialog(false);
    try {
      const gamePlanData = {
        match_details: {
          date: matchDetails.date,
          opponentTeam: matchDetails.opponentTeam,
          venue: matchDetails.venue,
          competitionType: matchDetails.competition
        },
        team_analysis: {
          formation: tactics.formation,
          playStyle: tactics.playStyle,
          teamMentality: "Determined",
          focusArea: tactics.focusArea,
          keyTacticalPrinciples: tactics.keyTacticalPrinciples
        },
        opponent_plan: {
          formation: "",
          playStyle: "",
          strengths: [],
          weaknesses: [],
          keyPlayers: [],
          notes: ""
        },
        tactics: {
          offensiveApproach: tactics.offensiveStrategy,
          defensiveApproach: tactics.defensiveStrategy,
          setPlays: "",
          transitionStrategy: "",
          substitutionStrategy: ""
        }
      };
      
      const data = await saveGamePlan(gamePlanData);

      console.log("@@@@@@@@@@@@@@@@", data)
      
      if (data) {
        setSavedPlanId(String(data.id));
        
        if (data.team_analysis && data.team_analysis.aiSuggestions) {
          setAiOutput({
            aiSuggestions: data.team_analysis.aiSuggestions,
            recommendedFormation: data.team_analysis.recommendedFormation || "",
            recommendedPlayStyle: data.team_analysis.recommendedPlayStyle || "",
            keyTacticalPrinciples: data.team_analysis.keyTacticalPrinciples || ""
          });
        }
        
        await queryClient.invalidateQueries({ queryKey: ['game-plans'] });
        
        toast({
          title: "Success",
          description: "Game plan saved successfully!",
        });
      }
    } catch (error) {
      console.error('Error in game plan generation:', error);
      toast({
        title: "Error",
        description: "Failed to generate game plan. Please check your input and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/game-plan/${savedPlanId}`);
    toast({
      title: "Copied!",
      description: "Game plan link copied to clipboard",
    });
  };

  const handleExport = () => {
    toast({
      title: "Coming Soon",
      description: "PDF export feature will be available soon.",
    });
  };

  const handleClearAIOutput = () => {
    setAiOutput(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <Card className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-coaching-50">
            Create Game Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <GamePlanList onSelect={handleLoadGamePlan} />
          </div>

          <GamePlanTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            matchDetails={matchDetails}
            onMatchDetailsChange={handleMatchDetailsChange}
            tactics={tactics}
            onTacticsChange={handleTacticsChange}
          />

          {activeTab === "tactics" && (
            <KeyTacticalPrinciplesSection 
              value={tactics.keyTacticalPrinciples}
              onChange={(value) => handleTacticsChange('keyTacticalPrinciples', value)}
            />
          )}

          <div className="mt-6">
            <GamePlanActions 
              loading={loading}
              savedPlanId={savedPlanId}
              onGenerateClick={handleGenerateClick}
              onShareClick={handleShare}
              onExportClick={handleExport}
            />
          </div>

          {aiOutput && (
            <GamePlanAIOutput 
              output={aiOutput} 
              onClear={handleClearAIOutput}
            />
          )}

          <GamePlanConfirmationDialog 
            open={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={generateGamePlan}
            matchDetails={matchDetails}
            tactics={tactics}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OpponentPlan;
