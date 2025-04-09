
import React, { useEffect } from 'react';
import { Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormationSelect } from './components/FormationSelect';
import { PlayStyleSelect } from './components/PlayStyleSelect';
import { TeamMentalitySelect } from './components/TeamMentalitySelect';
import { TooltipHelper } from './components/TooltipHelper';
import { TacticalDetailsAccordion } from './components/TacticalDetailsAccordion';

interface TacticsFormProps {
  tactics: {
    formation: string;
    playStyle: string;
    focusArea: string;
    defensiveStrategy: string;
    offensiveStrategy: string;
    playerNotes: string;
    keyTacticalPrinciples: string;
    playerRoles: string;
    mentalityInstructions: string;
    inGameAdjustments: string;
    trainingFocus: string;
    inspiredBy: string;
  };
  onTacticsChange: (field: string, value: string) => void;
}

export const TacticsForm: React.FC<TacticsFormProps> = ({ tactics, onTacticsChange }) => {
  // Add useEffect to listen for autofill-tactics events
  useEffect(() => {
    const handleAutoFill = (event: CustomEvent<Record<string, string>>) => {
      console.log("Received autofill-tactics event with data:", event.detail);
      
      // Update all tactical sections from the event data
      Object.entries(event.detail).forEach(([field, value]) => {
        console.log(`Updating ${field} with value:`, value);
        if (field in tactics && tactics[field] !== value) {
          onTacticsChange(field, value);
        }
      });
    };
    
    // Add event listener with type assertion for CustomEvent
    window.addEventListener('autofill-tactics', handleAutoFill as EventListener);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('autofill-tactics', handleAutoFill as EventListener);
    };
  }, [onTacticsChange, tactics]);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormationSelect
          value={tactics.formation}
          onChange={(value) => onTacticsChange('formation', value)}
        />
        <PlayStyleSelect
          value={tactics.playStyle}
          onChange={(value) => onTacticsChange('playStyle', value)}
        />
      </div>

      <TeamMentalitySelect
        value={tactics.defensiveStrategy}
        onChange={(value) => onTacticsChange('defensiveStrategy', value)}
        onMentalityInstructionsChange={(value) => onTacticsChange('mentalityInstructions', value)}
      />

      <TacticalDetailsAccordion 
        tactics={tactics}
        onTacticsChange={onTacticsChange}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-1">
          <Info className="h-5 w-5 text-coaching-300" />
          <Label htmlFor="playerNotes" className="text-base font-medium text-coaching-50">
            Opponent/Player Notes
          </Label>
          <TooltipHelper
            title="Opponent/Player Notes"
            description="Add any specific notes about the opponent team or individual players that could influence your tactical decisions."
          />
        </div>
        <Textarea
          id="playerNotes"
          placeholder="e.g., Their striker is weak on his left foot, Their right-back pushes high up the pitch"
          className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
          value={tactics.playerNotes}
          onChange={(e) => onTacticsChange('playerNotes', e.target.value)}
        />
      </div>
    </div>
  );
};
