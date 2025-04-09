
import React from 'react';
import { KeyRound, Users, Brain, Settings2, PenTool, Lightbulb } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TooltipHelper } from './TooltipHelper';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

interface TacticalDetailsAccordionProps {
  tactics: {
    keyTacticalPrinciples: string;
    playerRoles: string;
    mentalityInstructions: string;
    inGameAdjustments: string;
    trainingFocus: string;
    inspiredBy: string;
  };
  onTacticsChange: (field: string, value: string) => void;
}

export const TacticalDetailsAccordion: React.FC<TacticalDetailsAccordionProps> = ({
  tactics,
  onTacticsChange
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="tactical-details">
        <AccordionTrigger className="text-lg font-medium text-coaching-50 hover:no-underline flex items-center">
          <KeyRound className="mr-2 h-5 w-5 text-coaching-300" />
          Tactical Details
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <KeyRound className="h-5 w-5 text-coaching-300" />
              <Label htmlFor="keyTacticalPrinciples" className="text-base font-medium text-coaching-50">
                Key Tactical Principles
              </Label>
              <TooltipHelper
                title="Key Tactical Principles"
                description="Define 3-5 key tactical principles that should guide your team's play in this match."
              />
            </div>
            <Textarea
              id="keyTacticalPrinciples"
              placeholder="e.g., Quick transitions after winning possession, Numerical advantage in midfield, Wide overloads to exploit space"
              className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
              value={tactics.keyTacticalPrinciples}
              onChange={(e) => onTacticsChange('keyTacticalPrinciples', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5 text-coaching-300" />
              <Label htmlFor="playerRoles" className="text-base font-medium text-coaching-50">
                Player Roles & Positioning
              </Label>
              <TooltipHelper
                title="Player Roles & Positioning"
                description="Describe the specific roles and positioning for key players in your formation."
              />
            </div>
            <Textarea
              id="playerRoles"
              placeholder="e.g., Fullbacks provide width, Central Midfielder dictates tempo, Striker makes runs in behind"
              className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
              value={tactics.playerRoles}
              onChange={(e) => onTacticsChange('playerRoles', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Brain className="h-5 w-5 text-coaching-300" />
              <Label htmlFor="mentalityInstructions" className="text-base font-medium text-coaching-50">
                Mentality Instructions
              </Label>
              <TooltipHelper
                title="Mentality Instructions"
                description="Outline the key mental and emotional instructions for the team during the match."
              />
            </div>
            <Textarea
              id="mentalityInstructions"
              placeholder="e.g., Stay composed under pressure, Maintain focus, Show determination"
              className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
              value={tactics.mentalityInstructions}
              onChange={(e) => onTacticsChange('mentalityInstructions', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Settings2 className="h-5 w-5 text-coaching-300" />
              <Label htmlFor="inGameAdjustments" className="text-base font-medium text-coaching-50">
                In-Game Adjustments
              </Label>
              <TooltipHelper
                title="In-Game Adjustments"
                description="Describe potential tactical adjustments to make during the match based on different scenarios."
              />
            </div>
            <Textarea
              id="inGameAdjustments"
              placeholder="e.g., Switch to a more defensive formation if leading, Increase attacking width if chasing the game"
              className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
              value={tactics.inGameAdjustments}
              onChange={(e) => onTacticsChange('inGameAdjustments', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <PenTool className="h-5 w-5 text-coaching-300" />
              <Label htmlFor="trainingFocus" className="text-base font-medium text-coaching-50">
                Recommended Training Focus
              </Label>
              <TooltipHelper
                title="Recommended Training Focus"
                description="Suggest specific training drills and exercises to prepare the team for this match."
              />
            </div>
            <Textarea
              id="trainingFocus"
              placeholder="e.g., Set-piece routines, Transition drills, Pressing triggers"
              className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
              value={tactics.trainingFocus}
              onChange={(e) => onTacticsChange('trainingFocus', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Lightbulb className="h-5 w-5 text-coaching-300" />
              <Label htmlFor="inspiredBy" className="text-base font-medium text-coaching-50">
                Inspired By
              </Label>
              <TooltipHelper
                title="Inspired By"
                description="Mention specific teams, coaches, or tactical approaches that have inspired this game plan."
              />
            </div>
            <Textarea
              id="inspiredBy"
              placeholder="e.g., Pep Guardiola's Barcelona, Jürgen Klopp's Liverpool, Arrigo Sacchi's Milan"
              className="bg-coaching-700/50 border-coaching-600 text-coaching-50 min-h-[80px]"
              value={tactics.inspiredBy}
              onChange={(e) => onTacticsChange('inspiredBy', e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
