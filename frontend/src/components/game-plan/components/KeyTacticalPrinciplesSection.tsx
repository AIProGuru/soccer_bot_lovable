
import React from 'react';
import { KeyRound, Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KeyTacticalPrinciplesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const KeyTacticalPrinciplesSection: React.FC<KeyTacticalPrinciplesSectionProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-4 mt-4 border-t border-coaching-700 pt-4">
      <div className="flex items-center gap-1">
        <KeyRound className="h-5 w-5 text-coaching-300" />
        <Label htmlFor="keyTacticalPrinciples" className="text-base font-medium text-coaching-50">
          Key Tactical Principles
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-coaching-400 cursor-help ml-1" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p>Define 3-5 key tactical principles that should guide your team's play in this match.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        id="keyTacticalPrinciples"
        placeholder="e.g., Quick transitions after winning possession, Numerical advantage in midfield, Wide overloads to exploit space"
        className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
