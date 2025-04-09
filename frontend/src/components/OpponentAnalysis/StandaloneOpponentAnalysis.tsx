
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { OpponentAnalysisForm } from "../game-plan/OpponentAnalysisForm";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, MapPin, TrophyIcon } from "lucide-react";

interface StandaloneOpponentAnalysisProps {
  values: {
    opponentName?: string;
    formation?: string;
    playStyle?: string;
    strengths?: string;
    weaknesses?: string;
    venue?: string;
    competition?: string;
  };
  onChange: (field: string, value: string) => void;
}

export const StandaloneOpponentAnalysis = ({ values, onChange }: StandaloneOpponentAnalysisProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save an analysis.",
          variant: "destructive",
        });
        return;
      }

      // First, check if the table exists
      const { error: tableCheckError } = await supabase
        .from('opponent_analyses')
        .select('count(*)', { count: 'exact', head: true });

      // If table doesn't exist, show error but don't crash
      if (tableCheckError && tableCheckError.code === '42P01') {
        console.error('Table does not exist:', tableCheckError);
        toast({
          title: "Database Setup Required",
          description: "The database tables have not been set up yet. Please contact an administrator.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('opponent_analyses')
        .insert([{ 
          ...values,
          user_id: user.id 
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Opponent analysis has been saved successfully.",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to save opponent analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-coaching-800 border-coaching-700">
        <CardContent className="p-5">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coaching-50">Opponent Information</h3>
            <Separator className="bg-coaching-700" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label htmlFor="opponentName" className="text-coaching-50 font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-coaching-300" />
                  Opponent Name
                </Label>
                <Input
                  id="opponentName"
                  placeholder="Enter opponent team name"
                  className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 placeholder:text-coaching-400/80 shadow-sm"
                  value={values.opponentName || ""}
                  onChange={(e) => onChange("opponentName", e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="venue" className="text-coaching-50 font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-coaching-300" />
                  Venue
                </Label>
                <Input
                  id="venue"
                  placeholder="Match location"
                  className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 placeholder:text-coaching-400/80 shadow-sm"
                  value={values.venue || ""}
                  onChange={(e) => onChange("venue", e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="competition" className="text-coaching-50 font-medium flex items-center gap-2">
                  <TrophyIcon className="h-4 w-4 text-coaching-300" />
                  Competition
                </Label>
                <Input
                  id="competition"
                  placeholder="League, cup, friendly, etc."
                  className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 placeholder:text-coaching-400/80 shadow-sm"
                  value={values.competition || ""}
                  onChange={(e) => onChange("competition", e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-coaching-800 border-coaching-700">
        <CardContent className="p-5">
          <OpponentAnalysisForm
            opponentAnalysis={{
              style: values.playStyle || "",
              strengths: values.strengths || "",
              weaknesses: values.weaknesses || "",
            }}
            onOpponentAnalysisChange={(field, value) => {
              // Map fields from OpponentAnalysisForm to our form values
              const fieldMap: Record<string, string> = {
                style: "playStyle",
                strengths: "strengths",
                weaknesses: "weaknesses",
              };
              onChange(fieldMap[field] || field, value);
            }}
          />
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Button
          onClick={handleSave}
          className="w-full bg-coaching-600 text-white py-2 rounded-md hover:bg-coaching-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Analysis"}
        </Button>
      </div>
    </div>
  );
};
