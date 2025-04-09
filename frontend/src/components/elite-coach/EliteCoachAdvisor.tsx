
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function EliteCoachAdvisor() {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getAdvice = async () => {
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter a question to get coaching advice.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setAdvice(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('elite-coach-advisor', {
        body: { question: question.trim() }
      });
      
      if (error) throw error;
      
      setAdvice(data.advice);
    } catch (error) {
      console.error("Error fetching AI-generated advice:", error);
      toast({
        title: "Failed to get advice",
        description: "There was an error connecting to the coaching advisor. Please try again later.",
        variant: "destructive",
      });
      setAdvice("⚠️ Failed to get advice. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">⚽ Elite AI Football Advisor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask for expert coaching advice"
          className="w-full"
          onKeyDown={(e) => e.key === 'Enter' && getAdvice()}
        />
        
        <Button 
          onClick={getAdvice} 
          disabled={loading} 
          className="w-full" 
          variant="coaching"
        >
          {loading ? "Thinking..." : "Get Elite Coaching Advice"}
        </Button>

        {advice && (
          <div className="mt-4 p-4 border rounded bg-coaching-800 border-coaching-700 text-coaching-50">
            <h3 className="text-lg font-bold mb-2">Elite Coach's Advice:</h3>
            <p className="whitespace-pre-wrap">{advice}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
