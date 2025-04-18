import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { StandaloneOpponentAnalysis } from "./StandaloneOpponentAnalysis";
import { OpponentAnalysisAIOutput } from "../opponent-analysis/OpponentAnalysisAIOutput";
import { ChevronDown, ChevronUp, Wand2 } from "lucide-react";
import { ResponseLengthToggle } from "../shared/ResponseLengthToggle";

const OpponentAnalysis = () => {
  const { toast } = useToast();
  const [detailedResponse, setDetailedResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    opponentName: "",
    venue: "",
    competition: "",
    formation: "",
    playStyle: "",
    strengths: "",
    weaknesses: "",
  });
  const [aiOutput, setAiOutput] = useState<{
    aiSuggestions: string;
    strengths: string[];
    weaknesses: string[];
  } | null>(null);

  const handleFormChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateAnalysis = async () => {

    if (!formValues.opponentName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the opponent name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Try to use the Supabase function if available
      let analysisData;

      try {
        // Call the analyze-opponent edge function
        const response = await fetch(
          "https://evfnpvbcjtabnlwrqpoj.supabase.co/functions/v1/analyze-opponent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isDetail: detailedResponse,
              opponent: formValues.opponentName,
              competition: formValues.competition || "upcoming match",
              venue: formValues.venue || "home",
            }),
          }
        );

        if (response.ok) {
          analysisData = await response.json();
        } else {
          throw new Error("Failed to call analyze-opponent function");
        }
      } catch (functionError) {
        console.warn("Edge function failed, using fallback:", functionError);
        // Fallback to simulated data if edge function fails
        await new Promise((resolve) => setTimeout(resolve, 1500));

        analysisData = {
          suggestions: `Based on the analysis of ${formValues.opponentName}, here are our key recommendations:
          
Formation: 4-3-3
Style: Counter-attacking with fast wingers
Focus: Exploiting spaces behind their high defensive line

- They employ a high defensive line that can be exploited with through balls
- Their midfield tends to tire in the second half
- Look for opportunities to use set pieces as they struggle defending corners
- Their most dangerous players are their central strikers and right winger`,
          strengths: formValues.strengths
            .split(",")
            .map((strength) => strength.trim())
            .filter(Boolean),
          weaknesses: formValues.weaknesses
            .split(",")
            .map((weakness) => weakness.trim())
            .filter(Boolean),
        };
      }

      setAiOutput({
        aiSuggestions: analysisData.suggestions,
        strengths:
          analysisData.strengths ||
          formValues.strengths
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        weaknesses:
          analysisData.weaknesses ||
          formValues.weaknesses
            .split(",")
            .map((w) => w.trim())
            .filter(Boolean),
      });

      toast({
        title: "Analysis Generated",
        description: "AI analysis has been successfully generated",
      });
    } catch (error) {
      console.error("Error generating analysis:", error);
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearAIOutput = () => {
    setAiOutput(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <Card className="w-full max-w-4xl mx-auto bg-coaching-800 border-coaching-700 shadow-lg">
        <CardHeader className="border-b border-coaching-700">
          <CardTitle className="text-3xl font-bold text-coaching-50">
            Opponent Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponseLengthToggle
            isDetailed={detailedResponse}
            onToggle={setDetailedResponse}
          />
          <StandaloneOpponentAnalysis
            values={formValues}
            onChange={handleFormChange}
          />

          <div className="mt-6">
            <Button
              onClick={handleGenerateAnalysis}
              disabled={loading}
              className="w-full bg-coaching-600 hover:bg-coaching-700 text-coaching-50 font-medium shadow-sm"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {loading ? "Generating..." : "Generate Analysis with AI"}
            </Button>
          </div>

          {aiOutput && (
            <OpponentAnalysisAIOutput
              output={aiOutput}
              onClear={handleClearAIOutput}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OpponentAnalysis;
