
import React from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TooltipHelper } from "./TooltipHelper";
import { TEAM_MENTALITIES } from "../constants";

interface TeamMentalitySelectProps {
  value: string;
  onChange: (value: string) => void;
  onMentalityInstructionsChange?: (instructions: string) => void;
}

export const TeamMentalitySelect: React.FC<TeamMentalitySelectProps> = ({
  value,
  onChange,
  onMentalityInstructionsChange
}) => {
  const handleMentalityChange = (newValue: string) => {
    onChange(newValue);
    
    // Auto-fill mentality instructions if available
    const selectedMentality = TEAM_MENTALITIES[newValue as keyof typeof TEAM_MENTALITIES];
    if (selectedMentality?.mentality_instructions && onMentalityInstructionsChange) {
      onMentalityInstructionsChange(selectedMentality.mentality_instructions);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-coaching-50">Team Mentality</Label>
        <TooltipHelper
          title="About Team Mentality"
          description="Set your overall match attitude – aggressive, cautious, or balanced. Your team's mentality influences risk-taking, pressing intensity, and defensive positioning. Different mentalities are suitable for different match situations and opponent qualities."
        />
      </div>
      <Select
        onValueChange={handleMentalityChange}
        value={value}
      >
        <SelectTrigger className="bg-coaching-700 border-coaching-600 text-coaching-50">
          <SelectValue placeholder="Select team mentality" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] bg-coaching-800 border-coaching-700">
          {Object.entries(TEAM_MENTALITIES).map(([key, mentality]) => (
            <SelectItem 
              key={key} 
              value={key}
              className="text-coaching-50 hover:bg-coaching-700/50 focus:bg-coaching-700/50 cursor-pointer p-3"
            >
              {mentality.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
