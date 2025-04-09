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
import { FORMATIONS } from "../constants";

interface FormationSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormationSelect: React.FC<FormationSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-coaching-50">Formation</Label>
        <TooltipHelper
          title="About Formations"
          description="Choose how your team should line up defensively and offensively. The right formation makes the most of your players' strengths while countering your opponent's formation. Each formation offers different tactical advantages in attack and defense."
        />
      </div>
      <Select
        onValueChange={(value) => onChange(value)}
        value={value}
      >
        <SelectTrigger className="bg-coaching-700 border-coaching-600 text-coaching-50">
          <SelectValue placeholder="Choose formation" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] bg-coaching-800 border-coaching-700">
          {Object.entries(FORMATIONS).map(([formation, description]) => (
            <SelectItem 
              key={formation} 
              value={formation}
              description={description}
              className="text-coaching-50 hover:bg-coaching-700/50 focus:bg-coaching-700/50 cursor-pointer p-3"
            >
              <div>{formation}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
