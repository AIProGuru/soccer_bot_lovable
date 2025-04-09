
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts = ({ onSelectPrompt }: SuggestedPromptsProps) => {
  const tacticalPrompts = [
    "How do I press a back 3?",
    "Breaking low block",
    "Defending transitions",
    "Build-up under pressure",
    "Attacking wide vs narrow blocks"
  ];

  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-2 text-coaching-300">
        <Search className="h-4 w-4" />
        <span className="text-sm font-medium">Popular Tactical Questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tacticalPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="bg-coaching-700/50 text-coaching-100 border-coaching-600 hover:bg-coaching-600 hover:text-white"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};
