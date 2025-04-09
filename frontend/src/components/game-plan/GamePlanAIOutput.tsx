
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Download, Clipboard, ExternalLink, X, KeyRound } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface GamePlanAIOutputProps {
  output: {
    aiSuggestions: string;
    recommendedFormation: string;
    recommendedPlayStyle: string;
    keyTacticalPrinciples?: string;
  };
  onClear?: () => void; // Added this optional prop
}

export const GamePlanAIOutput = ({ output, onClear }: GamePlanAIOutputProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output.aiSuggestions);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Professional analysis copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const formatSuggestions = (text: string) => {
    return text.split('\n').map((line, i) => (
      <p key={i} className={line.startsWith("-") ? "pl-4 my-1" : "my-2"}>
        {line}
      </p>
    ));
  };

  return (
    <Card className="bg-coaching-800/90 backdrop-blur-sm border-coaching-700 shadow-lg mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-coaching-50 flex items-center justify-between">
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-2 text-green-400" />
            Elite Professional Analysis
          </div>
          {onClear && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-coaching-400 hover:text-coaching-50"
              onClick={onClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {output.recommendedFormation && (
          <div className="bg-coaching-700/30 p-4 rounded-md">
            <h3 className="text-coaching-200 font-medium text-sm mb-2">Expert Formation Recommendation</h3>
            <p className="text-coaching-50 text-lg font-semibold">{output.recommendedFormation}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {output.recommendedPlayStyle && (
            <div className="bg-coaching-700/30 p-4 rounded-md">
              <h3 className="text-coaching-200 font-medium text-sm mb-2">Strategic Play Style</h3>
              <p className="text-coaching-50">{output.recommendedPlayStyle}</p>
            </div>
          )}
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
        
        {output.aiSuggestions && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-coaching-200 font-medium text-sm">Comprehensive Analysis</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-coaching-400 hover:text-coaching-50"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Clipboard className="h-4 w-4 mr-1" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="bg-coaching-700/30 p-4 rounded-md text-coaching-50 whitespace-pre-line text-sm max-h-[400px] overflow-y-auto">
              {formatSuggestions(output.aiSuggestions)}
            </div>
          </div>
        )}
        
        {/* <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-coaching-300 border-coaching-700 hover:bg-coaching-700 hover:text-coaching-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export as PDF
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="text-coaching-300 border-coaching-700 hover:bg-coaching-700 hover:text-coaching-50"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View in Browser
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};
