
import { supabase } from "@/lib/supabase";

// Types for our football strategy database
export interface StrategyData {
  id: string;
  name: string;
  description: string;
  category: "formation" | "tactic" | "analysis";
  data: any;
  source: string;
  professional: boolean;
}

// This simulates fetching from an external API but actually uses Supabase
// Later, this can be replaced with actual API calls to an external service
export const fetchFootballStrategies = async (category: string, apiKey?: string): Promise<StrategyData[]> => {
  console.log("Fetching football strategies with API key:", apiKey ? "API Key provided" : "No API Key");
  
  try {
    // In a real implementation, this would be a fetch to an external API
    // For now, we'll get the data from our own database
    const { data, error } = await supabase
      .from('football_strategies')
      .select('*')
      .eq('category', category);
    
    if (error) throw error;
    
    return data as StrategyData[] || [];
  } catch (error) {
    console.error("Error fetching football strategies:", error);
    // Simulate response with mock data when the real API fails or table doesn't exist
    return generateMockStrategies(category);
  }
};

// Helper to generate mock strategy data when the table doesn't exist yet
function generateMockStrategies(category: string): StrategyData[] {
  switch (category) {
    case "formation":
      return [
        {
          id: "f1",
          name: "Modern 4-3-3",
          description: "A balanced formation used by elite teams like Liverpool and Barcelona",
          category: "formation",
          data: {
            positions: ["GK", "RB", "CB", "CB", "LB", "CDM", "CM", "CM", "RW", "ST", "LW"],
            strengths: ["Width in attack", "Midfield control", "Pressing options"],
            weaknesses: ["Can be vulnerable to counter-attacks"]
          },
          source: "Elite Coaches Database",
          professional: true
        },
        {
          id: "f2",
          name: "Compact 3-5-2",
          description: "A solid defensive formation with wing-backs for width",
          category: "formation",
          data: {
            positions: ["GK", "CB", "CB", "CB", "RWB", "CM", "CDM", "CM", "LWB", "ST", "ST"],
            strengths: ["Defensive solidity", "Numerical advantage in midfield", "Two strikers partnership"],
            weaknesses: ["Can be exposed in wide areas if wing-backs push too high"]
          },
          source: "Professional Analysis Group",
          professional: true
        }
      ];
    case "tactic":
      return [
        {
          id: "t1",
          name: "High Pressing System",
          description: "Aggressive press to win the ball back quickly in opposition half",
          category: "tactic",
          data: {
            principles: ["Press triggers on back passes", "Compact shape", "Quick transitions"],
            requiredAttributes: ["Stamina", "Work rate", "Tactical discipline"],
            implementationSteps: [
              "Set pressing traps with forward players",
              "Train recovery runs when press is broken",
              "Practice quick forward passing after ball recovery"
            ]
          },
          source: "Klopp Tactical Database",
          professional: true
        },
        {
          id: "t2",
          name: "Positional Play",
          description: "Control possession through structured positioning and passing",
          category: "tactic",
          data: {
            principles: ["Create numerical superiority", "Find the free man", "Control tempo"],
            requiredAttributes: ["Technical ability", "Game intelligence", "Positional awareness"],
            implementationSteps: [
              "Divide pitch into zones for positioning",
              "Train rondos for quick ball circulation",
              "Develop patient build-up patterns"
            ]
          },
          source: "Guardiola Method",
          professional: true
        }
      ];
    case "analysis":
      return [
        {
          id: "a1",
          name: "Defensive Transition Analysis",
          description: "Professional assessment of defensive transitions and counter-pressing",
          category: "analysis",
          data: {
            keyInsights: [
              "Elite teams counter-press immediately upon losing possession",
              "Defenders should step forward rather than backward when possible",
              "Rest defense structure is critical to preventing counter-attacks"
            ],
            implementationAdvice: "Focus on quick reaction time and pre-planned pressing triggers",
            professionalQuote: "The first 5 seconds after losing the ball determine if your team is elite or average."
          },
          source: "UEFA Pro License Materials",
          professional: true
        },
        {
          id: "a2",
          name: "Set-Piece Strategy",
          description: "Comprehensive analysis of set-piece effectiveness at elite level",
          category: "analysis",
          data: {
            keyInsights: [
              "30% of goals at professional level come from set-pieces",
              "Near-post blockers create space for attackers",
              "Defensive zonal-marking is most effective when combined with specific man-marking"
            ],
            implementationAdvice: "Dedicate at least 20% of training to set-piece scenarios",
            professionalQuote: "Set-pieces are the most undervalued scoring opportunity in football."
          },
          source: "Professional Set-Piece Specialists",
          professional: true
        }
      ];
    default:
      return [];
  }
}

// Function to check if the API key is valid (simulated)
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  // In a real implementation, this would validate with the external API
  // For now, any non-empty string that starts with "ELITE_" is considered valid
  return apiKey && apiKey.startsWith("ELITE_");
};

// Function to save an API key to user settings
export const saveApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Check if we're authenticated first
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("User not authenticated, cannot save API key");
      return false;
    }
    
    const { error } = await supabase
      .from('user_settings')
      .upsert({ 
        user_id: user.id,
        football_api_key: apiKey
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error saving API key:", error);
    // Fallback to localStorage if the table doesn't exist yet
    localStorage.setItem('football_api_key', apiKey);
    return true;
  }
};

// Function to get the saved API key
export const getSavedApiKey = async (): Promise<string | null> => {
  try {
    // Check if we're authenticated first
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("User not authenticated, cannot get API key");
      // Fallback to localStorage
      return localStorage.getItem('football_api_key');
    }
    
    const { data, error } = await supabase
      .from('user_settings')
      .select('football_api_key')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    return data?.football_api_key || localStorage.getItem('football_api_key');
  } catch (error) {
    console.error("Error getting API key:", error);
    // Fallback to localStorage
    return localStorage.getItem('football_api_key');
  }
};
