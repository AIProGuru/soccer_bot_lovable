import { supabase } from "../supabase";

export interface GamePlan {
  id: string;
  created_at: string;
  user_id: string;
  match_details: {
    date: string;
    opponentTeam: string;
    venue: string;
    competitionType: string;
    saveReport?: boolean;
  };
  team_analysis: {
    formation: string;
    playStyle: string;
    teamMentality: string;
    focusArea?: string;
    aiSuggestions?: string;
    recommendedFormation?: string;
    recommendedPlayStyle?: string;
    keyTacticalPrinciples?: string;
    playerRoles?: string;
    mentalityInstructions?: string;
    inGameAdjustments?: string;
    trainingFocus?: string;
    inspiredBy?: string;
  };
  opponent_plan: {
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
  ai_generated_plan?: string;
}

export const loadGamePlans = async (): Promise<GamePlan[]> => {
  const { data, error } = await supabase
    .from('game_plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading game plans:', error);
    return [];
  }

  return data as GamePlan[];
};

export const saveGamePlan = async (gamePlan: Omit<GamePlan, 'id' | 'created_at' | 'user_id'>): Promise<GamePlan | null> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData?.user) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('game_plans')
    .insert({
      user_id: userData.user.id,
      match_details: gamePlan.match_details,
      team_analysis: gamePlan.team_analysis,
      opponent_plan: gamePlan.opponent_plan,
      tactics: gamePlan.tactics,
      ai_generated_plan: gamePlan.ai_generated_plan
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving game plan:', error);
    return null;
  }

  return data as GamePlan;
};
