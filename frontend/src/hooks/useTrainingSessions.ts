
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import type { TrainingSessionData } from "@/components/training-session/types";
import type { TrainingSession } from "@/lib/api/trainingSessions";

export function useTrainingSessions() {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTrainingSessions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First check if table exists
      const { error: tableCheckError } = await supabase
        .from('training_sessions')
        .select('count(*)', { count: 'exact', head: true });
      
      // If table doesn't exist, handle gracefully
      if (tableCheckError && tableCheckError.code === '42P01') {
        console.log('Training sessions table does not exist yet');
        setSessions([]);
        return;
      }
      
      const { data, error } = await supabase
        .from('training_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      setError(error.message);
      
      // Only show toast for errors that aren't related to missing tables
      if (!(error.code === '42P01')) {
        toast({
          title: "Failed to Load Sessions",
          description: "Could not load your training sessions.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingSessions();
  }, []);

  return {
    sessions,
    loading,
    error,
    setLoading,
    fetchTrainingSessions
  };
}
