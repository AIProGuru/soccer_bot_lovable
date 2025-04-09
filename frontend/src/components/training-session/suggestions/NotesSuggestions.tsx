
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface NotesSuggestionsProps {
  suggestedNotes: string[];
  onSuggestionClick: (note: string) => void;
}

export const NotesSuggestions = ({ 
  suggestedNotes, 
  onSuggestionClick 
}: NotesSuggestionsProps) => {
  if (suggestedNotes.length === 0) return null;
  
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-1 text-coaching-300 text-xs">
        <Sparkles className="h-3 w-3" />
        <span>Suggested notes for this training focus:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestedNotes.map((note, index) => (
          <Badge 
            key={index}
            variant="outline"
            className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70"
            onClick={() => onSuggestionClick(note)}
          >
            {note.length > 50 ? note.substring(0, 47) + "..." : note}
          </Badge>
        ))}
      </div>
    </div>
  );
};
