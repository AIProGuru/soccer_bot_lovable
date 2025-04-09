
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { TrainingSessionForm } from "./TrainingSessionForm";
import { TrainingSessionList } from "./TrainingSessionList";
import { AIConfirmationDialog } from "./AIConfirmationDialog";
import { generateTrainingSession, toggleFavoriteSession, updateSessionTags } from "@/lib/api/trainingSessions";
import { useTrainingSessions } from "@/hooks/useTrainingSessions";
import { saveTrainingSession } from "./utils";

export const TrainingSessionContainer = () => {
  const { sessions, loading, setLoading, fetchTrainingSessions } = useTrainingSessions();
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerateConfirmation = (formData: {
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
  }) => {
    setPendingFormData(formData);
    setShowConfirmation(true);
  };

  const handleConfirmGeneration = async () => {
    if (pendingFormData) {
      try {
        setGeneratingPlan(true);
        await generateAITrainingPlan(pendingFormData);
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const generateAITrainingPlan = async (formData: {
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
  }) => {
    try {
      // Use the API function to generate the training plan and save it
      await generateTrainingSession(formData);
      
      toast({
        title: "Training Plan Generated",
        description: "AI has generated a training plan based on your inputs.",
      });
      
      // Refresh the list of sessions
      fetchTrainingSessions();
    } catch (error) {
      console.error('Error generating training plan:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI training plan.",
        variant: "destructive",
      });
    } finally {
      setGeneratingPlan(false);
    }
  };

  const handleSaveTrainingSession = async (formData: {
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
  }) => {
    setLoading(true);
    try {
      await saveTrainingSession(formData, toast);
      fetchTrainingSessions();
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (sessionId: number, isFavorite: boolean) => {
    try {
      await toggleFavoriteSession(sessionId, isFavorite);
      fetchTrainingSessions();
      toast({
        title: isFavorite ? "Added to Favorites" : "Removed from Favorites",
        description: isFavorite 
          ? "Training session has been added to your favorites." 
          : "Training session has been removed from your favorites.",
      });
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      toast({
        title: "Action Failed",
        description: "Failed to update favorite status.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTags = async (sessionId: number, tags: string[]) => {
    try {
      await updateSessionTags(sessionId, tags);
      fetchTrainingSessions();
      toast({
        title: "Tags Updated",
        description: "Training session tags have been updated.",
      });
    } catch (error) {
      console.error('Error updating tags:', error);
      toast({
        title: "Action Failed",
        description: "Failed to update tags.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto bg-coaching-800/90 backdrop-blur-sm border-coaching-700 shadow-lg">
        <CardHeader className="border-b border-coaching-700 pb-4">
          <CardTitle className="text-2xl font-bold text-coaching-50">
            Add Training Session
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TrainingSessionForm 
            onSubmit={handleSaveTrainingSession} 
            onGenerateAI={handleGenerateConfirmation}
            loading={loading} 
            generatingPlan={generatingPlan}
          />
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto bg-coaching-800/90 backdrop-blur-sm border-coaching-700 shadow-lg">
        <CardHeader className="border-b border-coaching-700 pb-4">
          <CardTitle className="text-2xl font-bold text-coaching-50">
            Previous Training Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TrainingSessionList 
            sessions={sessions} 
            onToggleFavorite={handleToggleFavorite}
            onUpdateTags={handleUpdateTags}
          />
        </CardContent>
      </Card>

      <AIConfirmationDialog 
        formData={pendingFormData}
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirmGeneration}
        loading={generatingPlan}
      />
    </div>
  );
};
