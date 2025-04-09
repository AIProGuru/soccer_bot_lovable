
// Game Plan template types
export interface GamePlanTemplate {
  id: string;
  name: string;
  matchDetails: {
    opponentTeam: string;
    competitionType: string;
    venue: string;
  };
  teamAnalysis: {
    formation: string;
    playStyle: string;
    teamMentality: string;
    focusArea?: string;
  };
  opponentPlan: {
    formation: string;
    playStyle: string;
    strengths: string[];
    weaknesses: string[];
    keyPlayers: string[];
    notes: string;
  };
  tactics: {
    offensiveApproach: string;
    defensiveApproach: string;
    setPlays: string;
    transitionStrategy: string;
    substitutionStrategy: string;
  };
  playerRoles?: string;
  keyTacticalPrinciples?: string;
  mentalityInstructions?: string;
  inGameAdjustments?: string;
  trainingFocus?: string;
  playerInstructions?: string;
  inspiredBy?: string;
  tacticalSummary?: string;
  tags: string[];
}

// Helper function to get style display name
export function getStyleDisplayName(style: string): string {
  const styleNames: Record<string, string> = {
    defensive: "Defensive",
    offensive: "Offensive",
    possession: "Possession",
    counter: "Counter-Attack",
    pressing: "High Pressing",
    balanced: "Balanced",
    direct: "Direct Play",
    positional: "Positional Play",
    mixed: "Mixed Approach"
  };
  
  return styleNames[style] || style.charAt(0).toUpperCase() + style.slice(1);
}
