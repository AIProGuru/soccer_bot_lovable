
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface DrillNameSuggestionsProps {
  suggestedDrillNames: string[];
  onSuggestionClick: (name: string) => void;
}

export const DrillNameSuggestions = ({ 
  suggestedDrillNames, 
  onSuggestionClick 
}: DrillNameSuggestionsProps) => {
  if (suggestedDrillNames.length === 0) return null;
  
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-1 text-coaching-300 text-xs">
        <Sparkles className="h-3 w-3" />
        <span>Suggested drill names based on your training focus:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestedDrillNames.map((name, index) => (
          <Badge 
            key={index}
            variant="outline"
            className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70"
            onClick={() => onSuggestionClick(name)}
          >
            {name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
