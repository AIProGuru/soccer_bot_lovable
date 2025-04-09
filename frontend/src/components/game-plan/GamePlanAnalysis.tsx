
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileDown, Share2Icon, KeyRound } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface AIOutput {
  aiSuggestions: string;
  recommendedFormation: string;
  recommendedPlayStyle: string;
  keyTacticalPrinciples?: string;
}

export const GamePlanAnalysis = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<AIOutput | null>(null);

  useEffect(() => {
    // In a real implementation, you would fetch the analysis from Supabase
    // For now, we'll use stored data in state from the previous screen
    setOutput({
      aiSuggestions: localStorage.getItem('aiSuggestions') || "The AI analysis will appear here once generated.",
      recommendedFormation: localStorage.getItem('recommendedFormation') || "4-3-3",
      recommendedPlayStyle: localStorage.getItem('recommendedPlayStyle') || "Possession-based with high press",
      keyTacticalPrinciples: localStorage.getItem('keyTacticalPrinciples') || ""
    });
    setLoading(false);
  }, [planId]);

  const handleBackClick = () => {
    navigate('/game-plan');
  };

  const handleShareClick = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/game-plan-analysis/${planId}`);
    toast({
      title: "Copied!",
      description: "Game plan analysis link copied to clipboard",
    });
  };

  const handleExportClick = () => {
    toast({
      title: "Coming Soon",
      description: "PDF export feature will be available soon.",
    });
  };

  const formatSuggestions = (text: string) => {
    if (!text) return <p>No analysis available yet.</p>;
    
    return text.split('\n').map((line, i) => (
      <p key={i} className={line.startsWith("-") ? "pl-4 my-1" : "my-2"}>
        {line}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
        <Card className="w-full max-w-4xl mx-auto bg-coaching-800 border-coaching-700 shadow-lg">
          <CardContent className="p-6 flex justify-center items-center h-64">
            <div className="text-coaching-50">Loading analysis...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <Card className="w-full max-w-4xl mx-auto bg-coaching-800 border-coaching-700 shadow-lg">
        <CardHeader className="border-b border-coaching-700 flex flex-row items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handleBackClick}
            className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Game Plan
          </Button>
          <CardTitle className="text-3xl font-bold text-coaching-50">
            Elite Tactical Analysis
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleShareClick}
              variant="outline"
              className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600"
            >
              <Share2Icon className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleExportClick}
              variant="outline"
              className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {output ? (
            <div className="space-y-6">
              <div className="bg-coaching-700/30 p-6 rounded-md">
                <h3 className="text-coaching-200 font-medium text-sm mb-2">Expert Formation Recommendation</h3>
                <p className="text-coaching-50 text-2xl font-semibold">{output.recommendedFormation}</p>
              </div>
              
              <div className="bg-coaching-700/30 p-4 rounded-md">
                <h3 className="text-coaching-200 font-medium text-sm mb-2">Strategic Play Style</h3>
                <p className="text-coaching-50 text-lg">{output.recommendedPlayStyle}</p>
              </div>
              
              {output.keyTacticalPrinciples && (
                <div className="bg-coaching-700/30 p-4 rounded-md">
                  <h3 className="text-coaching-200 font-medium text-sm mb-2 flex items-center">
                    <KeyRound className="h-4 w-4 mr-2 text-coaching-300" />
                    Key Tactical Principles
                  </h3>
                  <p className="text-coaching-50 whitespace-pre-line">{output.keyTacticalPrinciples}</p>
                </div>
              )}
              
              <div className="mt-4">
                <h3 className="text-coaching-200 font-medium text-xl mb-4">Comprehensive Professional Analysis</h3>
                <div className="bg-coaching-700/30 p-6 rounded-md text-coaching-50 whitespace-pre-line text-md max-h-[500px] overflow-y-auto">
                  {formatSuggestions(output.aiSuggestions)}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6">
              <p className="text-coaching-50">No analysis data found. Please generate a game plan first.</p>
              <Button 
                onClick={handleBackClick} 
                className="mt-4 bg-coaching-700 hover:bg-coaching-600"
              >
                Create Game Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
