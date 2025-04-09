
import React from 'react';
import { ArrowUp, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DirectPlayTemplateButtonProps {
  tactics: Record<string, any>;
  onTacticsChange: (field: string, value: string) => void;
}

export const DirectPlayTemplateButton: React.FC<DirectPlayTemplateButtonProps> = ({ 
  tactics, 
  onTacticsChange 
}) => {
  const handleDirectPlayFill = () => {
    console.log("Filling form with Direct Play tactics");
    
    // Create an object with all the direct play values
    const directPlayTactics = {
      formation: "4-4-2",
      playStyle: "direct",
      focusArea: "• Speed of execution — get the ball forward quickly\n• Physical presence — dominate aerial duels and second balls\n• Verticality — minimize sideways or backward passes\n• Territorial pressure — push opponents into their defensive third",
      keyTacticalPrinciples: "• Prioritize vertical passes and forward movement\n• Skip midfield lines when needed to reach attacking zones fast\n• Target man or striker used for hold-up or flick-ons\n• Win second balls and immediately attack open space\n• Focus on territory gained, not possession percentages\n• Use wide players and crosses to deliver early into the box",
      playerRoles: "Goalkeeper: Long distribution, targets striker or wide channels\nCenter Backs: Clear lines, play direct when pressed\nFull-Backs: Deliver early crosses or long diagonals into space\nCentral Midfielders: Battle for second balls, distribute quickly\nWingers: Stay high and wide, cross early or attack space directly\nStriker: Hold up the ball, link play, dominate aerially, or run in behind\nSecondary Striker / CAM (optional): Time late runs, receive knockdowns",
      mentalityInstructions: "• Be brave and decisive — every action has intent\n• Don't overcomplicate — win your duel, move the ball forward\n• Every player must support second balls and transition fast\n• Prioritize space behind, not possession in front\n• Physicality and work rate win games — never switch off",
      inGameAdjustments: "• Drop striker deeper to help with hold-up and relieve pressure\n• Shift to 4-5-1 for more central control and second-ball security\n• Bring on pacey players for fresh counter-attacking threat\n• Switch flanks quickly to stretch opponents\n• Use long throw-ins, corners, and set-pieces to regain momentum",
      trainingFocus: "• Long passing and diagonal switches\n• 2v2 / 3v3 second-ball transition drills\n• Set-piece routines (free kicks, throw-ins, corners)\n• Crossing & finishing under pressure\n• Aerial duels + physical pressing drills",
      inspiredBy: "• Leicester City (2015–16, Ranieri)\n• Atlético Madrid (Simeone, compact direct phase)\n• José Mourinho's Chelsea (counter-to-direct transitions)\n• Tony Pulis' Stoke (set-piece direct power)\n• Real Madrid's direct break moments under Ancelotti",
      defensiveStrategy: "disciplined"
    };
    
    // Update each field with the direct play values
    Object.entries(directPlayTactics).forEach(([field, value]) => {
      if (field in tactics && tactics[field] !== value) {
        onTacticsChange(field, value);
      }
    });
    
    // Dispatch an event to notify other components
    const event = new CustomEvent('autofill-tactics', { 
      detail: directPlayTactics 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex justify-end mb-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleDirectPlayFill}
        className="flex items-center gap-2 bg-coaching-700 hover:bg-coaching-600 text-coaching-50 border-coaching-600"
      >
        <ArrowUp className="h-4 w-4" />
        <span>Direct Play Template</span>
        <Target className="h-4 w-4" />
      </Button>
    </div>
  );
};
