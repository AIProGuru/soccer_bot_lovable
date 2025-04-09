
import { supabase } from "@/lib/supabase";

export const saveTrainingSession = async (
  formData: {
    drillName: string;
    duration: string;
    ageGroup: string;
    trainingFocus: string;
    playerCount: string;
    physicalIntensity: string;
    notes: string;
    drillDiagram: File | null;
    trainingStyle: string;
    isFavorite?: boolean;
    tags?: string[];
  },
  toast: any
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a training session",
        variant: "destructive",
      });
      throw new Error("You must be logged in to create a training session");
    }
    
    // Save to database
    const { data, error } = await supabase
      .from('training_sessions')
      .insert([
        {
          user_id: user.id,
          drill_name: formData.drillName,
          duration: formData.duration,
          age_group: formData.ageGroup,
          training_focus: formData.trainingFocus,
          player_count: formData.playerCount,
          physical_intensity: formData.physicalIntensity,
          notes: formData.notes,
          training_style: formData.trainingStyle,
          is_favorite: formData.isFavorite || false,
          tags: formData.tags || []
        },
      ])
      .select()
      .single();
      
    if (error) throw error;
    
    // Handle file upload if a diagram was provided
    if (formData.drillDiagram) {
      const fileExt = formData.drillDiagram.name.split('.').pop();
      const fileName = `${user.id}/${data.id}/${formData.drillName.replace(/\s+/g, '-')}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('training-diagrams')
        .upload(fileName, formData.drillDiagram);
        
      if (uploadError) {
        console.error('Error uploading diagram:', uploadError);
        toast({
          title: "Warning",
          description: "Training session saved, but diagram upload failed.",
          variant: "destructive",
        });
      }
    }
    
    toast({
      title: "Success",
      description: "Training session saved successfully",
    });
    
    return data;
  } catch (error: any) {
    console.error('Error saving session:', error);
    toast({
      title: "Error",
      description: error.message || "Failed to save training session",
      variant: "destructive",
    });
    throw error;
  }
};
