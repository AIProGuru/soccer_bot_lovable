
// Session template types
export interface SessionTemplate {
  id: string;
  name: string;
  drillName: string;
  duration: string;
  ageGroup: string;
  trainingFocus: string;
  playerCount: string;
  physicalIntensity: string;
  notes: string;
  trainingStyle: string;
  tags: string[];
  description?: string;
  category?: string;
  focusArea?: string;
  intensity?: number;
  setup?: string;
  constraints?: string[];
  objectives?: string[];
  progression?: string[];
  coachingPoints?: string[];
  targetAgeGroups?: string[];
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
