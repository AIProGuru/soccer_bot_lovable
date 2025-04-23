import { supabase } from "../supabase";
const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export type TrainingSession = {
  id: number;
  created_at: string;
  drill_name: string;
  duration: string;
  age_group: string;
  training_focus: string;
  player_count: string;
  physical_intensity: string;
  notes: string;
  training_style: string;
  ai_generated_plan?: string;
  is_favorite?: boolean;
  tags?: string[];
};

export const generateTrainingSession = async (formData: {
  drillName: string;
  duration: string;
  ageGroup: string;
  trainingFocus: string;
  playerCount: string;
  physicalIntensity: string;
  notes: string;
  trainingStyle: string;
  drillDiagram: File | null;
  isFavorite?: boolean;
  tags?: string[];
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be logged in to create a training session");
    }

    // Generate AI training plan

    const { data: profile, error: profileError } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .single();

    console.log(profile);

    const response = await fetch(
      `${BACKEND_SERVER_URL}/v1/assistant/generate-training-plan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drillName: formData.drillName,
          duration: formData.duration,
          ageGroup: formData.ageGroup,
          trainingFocus: formData.trainingStyle, // trainingStyle is used as the training focus
          playerCount: formData.playerCount,
          physicalIntensity: formData.physicalIntensity,
          trainingStyle: formData.trainingStyle,
          notes: formData.notes || "",
          threadId: profile.thread_id,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.json(); // You can use response.json() if the backend returns JSON
      throw new Error(`Failed to generate plan: ${errorText}`);
    }

    const responseData = await response.json();

    const message = responseData["message"];

    console.log(message);

    // Save to database with AI-generated content
    const { data, error } = await supabase
      .from("training_sessions")
      .insert([
        {
          user_id: user.id,
          drill_name: formData.drillName,
          duration: formData.duration,
          age_group: formData.ageGroup,
          training_focus: formData.trainingFocus,
          player_count: formData.playerCount,
          physical_intensity: formData.physicalIntensity,
          training_style: formData.trainingStyle,
          notes: formData.notes,
          ai_generated_plan: message,
          is_favorite: formData.isFavorite || false,
          tags: formData.tags || [],
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Handle file upload if a diagram was provided
    if (formData.drillDiagram) {
      const fileExt = formData.drillDiagram.name.split(".").pop();
      const fileName = `${user.id}/${data.id}/${formData.drillName.replace(
        /\s+/g,
        "-"
      )}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("training-diagrams")
        .upload(fileName, formData.drillDiagram);

      if (uploadError) {
        console.error("Error uploading diagram:", uploadError);
        // Continue even if diagram upload fails
      }
    }

    return data;
    
  } catch (error) {
    console.error("Error generating training session:", error);
    throw error;
  }
};

export const toggleFavoriteSession = async (
  sessionId: number,
  isFavorite: boolean
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be logged in to update a training session");
    }

    const { data, error } = await supabase
      .from("training_sessions")
      .update({ is_favorite: isFavorite })
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

export const updateSessionTags = async (sessionId: number, tags: string[]) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be logged in to update a training session");
    }

    const { data, error } = await supabase
      .from("training_sessions")
      .update({ tags })
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error updating tags:", error);
    throw error;
  }
};
