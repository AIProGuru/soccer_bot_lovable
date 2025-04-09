
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TooltipHelper } from "./TooltipHelper";
import { PLAY_STYLES, getPlayStyleCharacteristics } from "../constants";
import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface PlayStyleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

// Extract the tactical details sections based on their headers
const extractTacticalSections = (details: string | undefined) => {
  if (!details) return {};
  
  const sections: Record<string, string> = {};
  
  // Look for key tactical principles section
  const keyPrinciplesMatch = details.match(/🔑 Key Tactical Principles([\s\S]*?)⸻/);
  if (keyPrinciplesMatch) {
    sections.keyTacticalPrinciples = keyPrinciplesMatch[1].trim();
  }
  
  // Look for player roles section
  const playerRolesMatch = details.match(/🧩 Player Roles & Positioning([\s\S]*?)⸻/);
  if (playerRolesMatch) {
    sections.playerRoles = playerRolesMatch[1].trim();
  }
  
  // Look for mentality instructions section
  const mentalityMatch = details.match(/🧠 Mentality Instructions([\s\S]*?)⸻/);
  if (mentalityMatch) {
    sections.mentalityInstructions = mentalityMatch[1].trim();
  }
  
  // Look for in-game adjustments section
  const adjustmentsMatch = details.match(/🔁 In-Game Adjustments([\s\S]*?)⸻/);
  if (adjustmentsMatch) {
    sections.inGameAdjustments = adjustmentsMatch[1].trim();
  }
  
  // Look for training focus section (handle both emoji variants)
  const trainingMatch = details.match(/(?:🧠|🧪) Recommended Training Focus([\s\S]*?)⸻/);
  if (trainingMatch) {
    sections.trainingFocus = trainingMatch[1].trim();
  }
  
  // Look for inspired by section
  const inspiredMatch = details.match(/🌟 Inspired By([\s\S]*?)$/);
  if (inspiredMatch) {
    sections.inspiredBy = inspiredMatch[1].trim();
  }
  
  return sections;
};

export const PlayStyleSelect: React.FC<PlayStyleSelectProps> = ({
  value,
  onChange,
}) => {
  const [openStyleDialog, setOpenStyleDialog] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInfoClick = (styleKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedStyle(styleKey);
    setOpenStyleDialog(true);
  };

  const handleStyleChange = (newValue: string) => {
    onChange(newValue);
    
    // Get the selected play style
    const selectedPlayStyle = PLAY_STYLES[newValue];
    
    if (selectedPlayStyle && selectedPlayStyle.tacticalDetails) {
      console.log(`Selected play style: ${newValue} with tactical details`);
      
      // Extract sections from the tactical details
      const sections = extractTacticalSections(selectedPlayStyle.tacticalDetails);
      console.log("Extracted sections:", sections);
      
      if (Object.keys(sections).length > 0) {
        // Dispatch custom event with the sections
        const event = new CustomEvent('autofill-tactics', { 
          detail: sections 
        });
        
        window.dispatchEvent(event);
        
        toast({
          title: "Tactical Details Auto-filled",
          description: `${selectedPlayStyle.name} template has been applied to your tactical sections`,
        });
      }
    } else {
      console.log(`Selected play style: ${newValue} without tactical details`);
      
      // Set up auto-fill tactics dictionary for different play styles
      const tacticsTemplates: Record<string, Record<string, string>> = {
        "possession": {
          keyTacticalPrinciples: `•\tShort, sharp passing sequences
•\tPositional rotations to create overloads
•\tBuild-up from the back with patience
•\tMaintain high percentage of ball possession
•\tIntelligent movement to pull opponents out of shape
•\tQuick recovery after losing possession (counter-press)`,
          playerRoles: `Goalkeeper: Comfortable with the ball at feet, involved in build-up
Center Backs: Split wide, initiate attacks with composed passing
Full-Backs: Push high to create width, overlap and underlap support
Central Midfielders: Rotate and support build-up, dictate tempo
Wingers: Stay wide and stretch opposition, cut inside when needed
Striker: Drops into midfield to link play or make blind-side runs`,
          mentalityInstructions: `•\tStay calm and composed in all phases
•\tTrust the system: patient buildup leads to chances
•\tTake responsibility on the ball—don't rush decisions
•\tStay compact and connected off the ball
•\tCommunicate constantly to maintain positional structure`,
          inGameAdjustments: `•\tDrop pivot deeper to offer a safer passing lane
•\tInstruct full-backs to sit back temporarily
•\tEncourage 1-2 touch combinations to escape pressing traps
•\tSwitch sides quickly to find space on the weak side
•\tSlow down tempo to regain control and composure`,
          trainingFocus: `•\tRondo drills to sharpen quick passing
•\tPositional play exercises (e.g., 6v4 overloads)
•\tTransition games with immediate pressing after loss
•\tPlaying out from the back under pressure
•\tThird man runs and off-ball movement drills`,
          inspiredBy: `•\tPep Guardiola's FC Barcelona and Manchester City
•\tXavi's Barcelona
•\tLuis Enrique's Spanish national team
•\tJohan Cruyff's Total Football evolution`
        },
        "counter": {
          keyTacticalPrinciples: `•\tSit deep in compact defensive shape
•\tRegain possession in middle or defensive third
•\tBreak quickly with direct vertical passes
•\tUse speed and space behind opponent's defense
•\tMinimal touches in transition
•\tExploit numerical advantage on the break`,
          playerRoles: `Goalkeeper: Long distribution and fast release
Center Backs (CB): Stay tight, win duels, clear danger quickly
Full-Backs (FB): Prioritize defense, support counter only when safe
Defensive Midfielders (CDM): Screen the back line, start counter with first pass
Wingers: Stay wide and high, explode forward on turnover
Striker (ST): Play on the shoulder of last defender, stretch backline with pace`,
          mentalityInstructions: `•\tStay patient, trust the system
•\tAbsorb pressure without panic
•\tAttack with pace and purpose when chances arise
•\tCommunicate to coordinate shape and press triggers
•\tStay disciplined in roles—don't overcommit`,
          inGameAdjustments: `•\tDrop defensive line deeper
•\tMove to 5-at-the-back if overwhelmed
•\tUse fresh legs on wings for speed in transition
•\tSwitch to two holding midfielders for protection
•\tDelay opposition through tactical fouls in midfield`,
          trainingFocus: `•\tTransition drills from defense to attack
•\t3v2, 4v3 breakaway scenarios
•\tRecovery runs + press triggers after turnovers
•\tFinishing in space under pressure
•\tSprint endurance and explosive power`,
          inspiredBy: `•\tJosé Mourinho's Inter Milan (2010)
•\tDiego Simeone's Atlético Madrid
•\tLeicester City (2015–16) under Claudio Ranieri
•\tReal Madrid under Carlo Ancelotti (counter moments)
•\tGermany national team (2014 World Cup transitions)`
        },
        "gegenpressing": {
          keyTacticalPrinciples: `•\tWin the ball back within 5 seconds of losing it
•\tPress in coordinated units, triggered by opponent passes or poor touches
•\tMaintain a high defensive line to compress space
•\tForce play into pressing traps (sideline, weak-foot, isolated player)
•\tImmediate vertical attack after regaining possession
•\tHigh physical demands and constant communication`,
          playerRoles: `Goalkeeper: Sweeper-keeper, high starting position, distributes fast
Center Backs (CB): Aggressive positioning, ready to intercept long balls
Full-Backs (FB): Press high and wide, support overloads on the flanks
Central Midfielders (CM): Constant pressing, cover wide and central zones, win second balls
Wingers: Press opponent full-backs, force back passes, make inside runs
Striker (ST): Initiate press, angle runs to guide opponent into traps, trigger counter-press`,
          mentalityInstructions: `•\tRelentless energy—never stop pressing
•\tEvery player defends and attacks
•\tTrust the structure—don't chase alone
•\tReact instantly to ball loss—win it back on the spot
•\tStay brave and aggressive, even under fatigue`,
          inGameAdjustments: `•\tSwitch to 4-1-4-1 for more midfield control
•\tReduce pressing intensity in the final 15 minutes if energy drops
•\tSub early for fresh legs in wide and midfield zones
•\tCompact lines if opponent starts bypassing the press
•\tDelay attacks slightly to regain composure and shape`,
          trainingFocus: `•\tCoordinated pressing patterns (e.g., 3v3 + 1 pressing zones)
•\tTransition drills (win and go vertical)
•\tHigh-intensity rondos with pressing rules
•\tFitness + recovery training to maintain pressing levels
•\tCommunication and trigger-based pressing simulations`,
          inspiredBy: `•\tJürgen Klopp's Liverpool (2015–2022 peak press years)
•\tRalf Rangnick's RB Leipzig
•\tBayern Munich under Hansi Flick
•\tMarcelo Bielsa's Leeds United
•\tGermany U23 pressing models`
        },
        "wing-play": {
          keyTacticalPrinciples: `•\tMaximize width to stretch opponent's defensive shape
•\tUse full-backs and wingers in tandem to create overloads
•\tDeliver early and frequent crosses into the box
•\tIsolate wide 1v1 situations to exploit pace and dribbling
•\tQuick switches of play to shift defensive blocks
•\tEncourage diagonal runs from strikers and midfielders into the box`,
          playerRoles: `Goalkeeper: Quick long throws or kicks to wide areas to start transition
Center Backs: Stay compact, distribute wide when building
Full-Backs (RB/LB): High positioning, aggressive overlaps, early crosses
Central Midfielders: Shift laterally to support wide play, deliver diagonal balls
Wingers: Stay wide to stretch play, 1v1 dribblers or early crossers
Striker (ST): Target man or poacher to attack crosses
CAM (if in 4-2-3-1): Arrive late into box or combine with wingers`,
          mentalityInstructions: `•\tBe aggressive in wide areas — take on your marker
•\tPrioritize width and stretching the pitch
•\tFull-backs: deliver fast and early — don't overthink it
•\tMidfielders: always support wide channels and recover quickly
•\tStriker: stay alert in the box — expect delivery anytime`,
          inGameAdjustments: `•\tBring full-backs deeper if wide space is being exposed
•\tSwitch to a 3-4-3 with wing-backs to reinforce width
•\tAdd a second striker to increase threat in the box
•\tFocus on winning second balls from crosses and rebounds
•\tChange from crossing to cut-backs if opponent defends deep`,
          trainingFocus: `•\tCrossing and finishing drills (1st time, aerial, cut-backs)
•\t2v1 and 3v2 wing overload exercises
•\tPositional rondos emphasizing wide transitions
•\tSwitching play drills (long diagonals, quick short switches)
•\tTiming runs into the box for midfielders and strikers`,
          inspiredBy: `•\tSir Alex Ferguson's Manchester United (Giggs & Beckham era)
•\tAntonio Conte's Chelsea (2016/17 with wing-backs)
•\tGareth Southgate's England (2021 Euros)
•\tBayern Munich with Coman & Davies on flanks
•\tClassic Premier League wide play (early 2000s)`
        }
      };
      
      // Auto-fill tactics fields based on selected play style
      if (tacticsTemplates[newValue]) {
        const sections = tacticsTemplates[newValue];
        
        // Log before dispatching event
        console.log(`Dispatching autofill event for ${newValue} style with sections:`, sections);
        
        // Dispatch custom event with the sections
        const event = new CustomEvent('autofill-tactics', { 
          detail: sections 
        });
        
        window.dispatchEvent(event);
        
        toast({
          title: "Tactical Details Auto-filled",
          description: `${PLAY_STYLES[newValue].name} template has been applied to your tactical sections`,
        });
      }
    }
  };

  const selectedPlayStyle = value ? PLAY_STYLES[value] : null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-coaching-50">Play Style</Label>
        <TooltipHelper
          title="About Play Styles"
          description="Dictate how your team controls the game. Your play style defines your approach to possession, attacking rhythm, and defensive structure. Choose a style that complements your formation and makes the most of your players' technical abilities."
        />
      </div>
      <Select
        onValueChange={handleStyleChange}
        value={value}
      >
        <SelectTrigger className="bg-coaching-700 border-coaching-600 text-coaching-50">
          <SelectValue placeholder="Select play style" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] bg-coaching-800 border-coaching-700">
          {Object.entries(PLAY_STYLES).map(([key, style]) => (
            <SelectItem 
              key={key} 
              value={key}
              className="text-coaching-50 hover:bg-coaching-700/50 focus:bg-coaching-700/50 cursor-pointer p-3 pr-10 relative"
            >
              <div className="flex items-center justify-between w-full">
                <span>{style.name}</span>
                <button 
                  onClick={(e) => handleInfoClick(key, e)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-coaching-300 hover:text-coaching-100"
                >
                  <InfoIcon size={16} />
                </button>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedPlayStyle && (
        <div className="mt-2 bg-coaching-700/40 p-3 rounded-md border border-coaching-600/50 text-sm">
          <p className="text-coaching-100 font-medium">{selectedPlayStyle.name}</p>
          <p className="text-coaching-200 mt-1">{selectedPlayStyle.description}</p>
          <p className="text-coaching-300 mt-1 italic text-xs">{selectedPlayStyle.example}</p>
          
          {selectedPlayStyle.tacticalDetails && (
            <button 
              onClick={() => {
                navigator.clipboard.writeText(selectedPlayStyle.tacticalDetails || "");
                toast({
                  title: "Copied to Clipboard",
                  description: "Tactical details copied to clipboard"
                });
              }}
              className="mt-3 text-xs text-coaching-100 hover:text-coaching-50 bg-coaching-600/50 hover:bg-coaching-600 px-3 py-1 rounded-full"
            >
              Copy Tactical Details
            </button>
          )}
        </div>
      )}

      <Dialog open={openStyleDialog} onOpenChange={setOpenStyleDialog}>
        <DialogContent className="bg-coaching-800 border-coaching-700 text-coaching-50">
          {selectedStyle && PLAY_STYLES[selectedStyle] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-coaching-50">
                  {PLAY_STYLES[selectedStyle].name}
                </DialogTitle>
                <DialogDescription className="text-coaching-200">
                  Tactical approach details
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="bg-coaching-700/50 p-4 rounded-md border border-coaching-600">
                  <h3 className="text-md font-semibold text-coaching-100 mb-2">Description</h3>
                  <p className="text-coaching-200">{PLAY_STYLES[selectedStyle].description}</p>
                </div>
                
                <div className="bg-coaching-700/50 p-4 rounded-md border border-coaching-600">
                  <h3 className="text-md font-semibold text-coaching-100 mb-2">Famous Example</h3>
                  <p className="text-coaching-200">{PLAY_STYLES[selectedStyle].example}</p>
                </div>
                
                <div className="bg-coaching-700/50 p-4 rounded-md border border-coaching-600">
                  <h3 className="text-md font-semibold text-coaching-100 mb-2">Key Characteristics</h3>
                  <ul className="list-disc pl-5 text-coaching-200 space-y-1">
                    {getPlayStyleCharacteristics(selectedStyle).map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>
                
                {PLAY_STYLES[selectedStyle].tacticalDetails && (
                  <div className="bg-coaching-700/50 p-4 rounded-md border border-coaching-600">
                    <h3 className="text-md font-semibold text-coaching-100 mb-2">Tactical Details</h3>
                    <pre className="whitespace-pre-wrap text-xs text-coaching-200 font-mono overflow-auto max-h-[300px]">
                      {PLAY_STYLES[selectedStyle].tacticalDetails}
                    </pre>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(PLAY_STYLES[selectedStyle].tacticalDetails || "");
                        toast({
                          title: "Copied to Clipboard",
                          description: "Tactical details copied to clipboard"
                        });
                      }}
                      className="mt-2 text-xs text-coaching-100 hover:text-coaching-50 bg-coaching-600/50 hover:bg-coaching-600 px-3 py-1 rounded-full"
                    >
                      Copy Tactical Details
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
