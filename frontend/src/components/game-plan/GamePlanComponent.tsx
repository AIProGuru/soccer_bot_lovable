import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GamePlanList } from "./GamePlanList";
import { GamePlanConfirmationDialog } from "./GamePlanConfirmationDialog";
import { GamePlanAIOutput } from "./GamePlanAIOutput";
import { GamePlanTabs } from "./GamePlanTabs";
import { GamePlanNavigation } from "./GamePlanNavigation";
import { TacticalFollowupChat } from "./TacticalFollowupChat";
import { useGamePlanState } from "./hooks/useGamePlanState";
import { useGamePlanActions } from "./hooks/useGamePlanActions";
import { GamePlanTemplateSelector } from "./components/GamePlanTemplateSelector";
import { GamePlanTemplate } from "./templates/types";

const GamePlanComponent = () => {
  const state = useGamePlanState();
  const actions = useGamePlanActions(state);

  const {
    matchDetails,
    tactics,
    activeTab,
    loading,
    savedPlanId,
    showConfirmDialog,
    aiOutput,
    showFollowUpChat,
    setActiveTab,
    handleMatchDetailsChange,
    handleTacticsChange,
    handleLoadGamePlan
  } = state;

  const handleApplyTemplate = (template: GamePlanTemplate) => {
    // Update match details
    Object.entries(template.matchDetails).forEach(([key, value]) => {
      handleMatchDetailsChange(key, value);
    });

    // Update team analysis
    Object.entries(template.teamAnalysis).forEach(([key, value]) => {
      if (key === 'formation' || key === 'playStyle' || key === 'focusArea') {
        handleTacticsChange(key, value);
      }
    });

    // Update tactics
    Object.entries(template.tactics).forEach(([key, value]) => {
      handleTacticsChange(key, value);
    });
    
    // Update the new detailed fields if they exist in the template
    if (template.keyTacticalPrinciples) {
      handleTacticsChange('keyTacticalPrinciples', template.keyTacticalPrinciples);
    }
    
    if (template.playerRoles) {
      handleTacticsChange('playerRoles', template.playerRoles);
    }
    
    if (template.mentalityInstructions) {
      handleTacticsChange('mentalityInstructions', template.mentalityInstructions);
    }
    
    if (template.inGameAdjustments) {
      handleTacticsChange('inGameAdjustments', template.inGameAdjustments);
    }
    
    if (template.trainingFocus) {
      handleTacticsChange('trainingFocus', template.trainingFocus);
    }
    
    if (template.playerInstructions) {
      handleTacticsChange('playerInstructions', template.playerInstructions);
    }
    
    if (template.inspiredBy) {
      handleTacticsChange('inspiredBy', template.inspiredBy);
    }

    // Switch to match details tab to show the applied template
    setActiveTab('match-details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <Card className="w-full max-w-4xl mx-auto bg-coaching-800 border-coaching-700 shadow-lg">
        <CardHeader className="border-b border-coaching-700">
          <CardTitle className="text-3xl font-bold text-coaching-50">
            Create Game Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <GamePlanList onSelect={handleLoadGamePlan} />
            <GamePlanTemplateSelector onApplyTemplate={handleApplyTemplate} />
          </div>

          <GamePlanTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            matchDetails={matchDetails}
            onMatchDetailsChange={handleMatchDetailsChange}
            tactics={tactics}
            onTacticsChange={handleTacticsChange}
          />

          <GamePlanNavigation
            activeTab={activeTab}
            loading={loading}
            savedPlanId={savedPlanId}
            onPreviousClick={actions.goToPreviousStep}
            onNextClick={actions.goToNextStep}
            onGenerateClick={actions.handleGenerateClick}
            onShareClick={actions.handleShare}
            onExportClick={actions.handleExport}
          />

          {aiOutput && (
            <GamePlanAIOutput 
              output={aiOutput} 
              onClear={actions.handleClearAIOutput}
            />
          )}

          {aiOutput && showFollowUpChat && (
            <TacticalFollowupChat
              tactics={tactics}
              aiSuggestions={aiOutput.aiSuggestions}
            />
          )}

          <GamePlanConfirmationDialog 
            open={showConfirmDialog}
            onClose={() => state.setShowConfirmDialog(false)}
            onConfirm={actions.generateGamePlan}
            matchDetails={matchDetails}
            tactics={tactics}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GamePlanComponent;
