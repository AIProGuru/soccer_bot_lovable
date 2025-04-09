import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldAlert, Zap, Users, Target, Flag, Workflow, LightbulbIcon, Brain, Settings2, PenTool, Crosshair } from "lucide-react";

interface TacticalAdvicePanelProps {
  formation: string;
  playStyle: string;
  defensiveStrategy: string;
}

export const TacticalAdvicePanel: React.FC<TacticalAdvicePanelProps> = ({
  formation,
  playStyle,
  defensiveStrategy
}) => {
  // Check if we have the specific combination for our detailed examples
  const isCounterExample = 
    formation === '4-3-3' && 
    playStyle === 'counter-attack' && 
    (defensiveStrategy === 'defensive' || defensiveStrategy.includes('lose'));
    
  const isLowBlockExample =
    playStyle === 'low-block' &&
    (defensiveStrategy === 'defensive' || defensiveStrategy.includes('lose'));
    
  const isVerticalExample =
    playStyle === 'vertical';

  const renderSpecificAdvice = () => {
    if (isVerticalExample) {
      return renderVerticalAdvice();
    }
    
    if (isLowBlockExample) {
      return renderLowBlockAdvice();
    }
    
    if (isCounterExample) {
      return renderCounterAdvice();
    }
    
    return renderGenericAdvice();
  };
  
  const renderVerticalAdvice = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Crosshair className="h-5 w-5 mr-2 text-coaching-300" /> 
            1. Key Tactical Principles
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Prioritize fast forward progression through the central channels</li>
              <li>Minimize sideways and backward passes</li>
              <li>Focus on breaking lines with quick, direct passes</li>
              <li>High support around the ball to allow sharp combinations</li>
              <li>Third-man runs, 1–2s, and vertical rotations to create breakthroughs</li>
              <li>Exploit disorganized defenses immediately after turnovers</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Target className="h-5 w-5 mr-2 text-coaching-300" /> 
            2. Focus Area
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Breaking lines quickly and directly</li>
              <li>Central overloads and vertical passing lanes</li>
              <li>Quick support for 1–2s and layoffs</li>
              <li>Positioning between opponent lines</li>
              <li>Forward-thinking in all areas of the pitch</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Users className="h-5 w-5 mr-2 text-coaching-300" /> 
            3. Player Roles & Positioning
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Goalkeeper: Quick, low-risk distribution to feet</li>
              <li>Center Backs (CB): Play into midfield aggressively, step into space when possible</li>
              <li>Full-Backs (FB): Offer underlaps or central options, not just wide overlap</li>
              <li>Defensive Midfielder (CDM): Receives under pressure, turns, and plays forward</li>
              <li>Central Midfielders (CMs): Find pockets between lines, drive vertically with and without the ball</li>
              <li>Wingers: Make inside diagonal runs or receive and drive inward</li>
              <li>Striker (ST): Drops deep to connect or stretches the line with aggressive runs in behind</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Brain className="h-5 w-5 mr-2 text-coaching-300" /> 
            4. Mentality Instructions
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Play forward first—don't settle for safety</li>
              <li>Be brave between the lines—pressure is expected</li>
              <li>Support must be fast and tight—no one left isolated</li>
              <li>When we win the ball—go forward instantly</li>
              <li>Final third decisions must be quick and decisive</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Settings2 className="h-5 w-5 mr-2 text-coaching-300" /> 
            5. In-Game Adjustments
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Add a second pivot (double 6) to relieve pressure in buildup</li>
              <li>Move wide players slightly higher to push back opposition full-backs</li>
              <li>Bring on fresh central players to maintain vertical energy</li>
              <li>Slow down tempo slightly if vertical passing lanes are blocked</li>
              <li>Drop striker deeper to act as false 9 and draw defenders out</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <PenTool className="h-5 w-5 mr-2 text-coaching-300" /> 
            6. Recommended Training Focus
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Vertical passing drills (bounce pass to third man)</li>
              <li>Breaking lines in small-sided games (central overloads)</li>
              <li>Quick 1–2 combination exercises under pressure</li>
              <li>Central positioning and support angle movement drills</li>
              <li>Reaction transitions after regaining possession</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <LightbulbIcon className="h-5 w-5 mr-2 text-coaching-300" /> 
            7. Inspired By
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Julian Nagelsmann's RB Leipzig</li>
              <li>Jürgen Klopp's Liverpool (counter-vertical phases)</li>
              <li>Luciano Spalletti's Napoli (2022/23)</li>
              <li>Germany U21 (central vertical model)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderLowBlockAdvice = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <ShieldAlert className="h-5 w-5 mr-2 text-coaching-300" /> 
            1. Defensive Shape & Structure
          </h3>
          
          <div className="ml-7 space-y-4">
            <div>
              <h4 className="text-md font-semibold text-coaching-100 flex items-center mb-2">
                <ShieldAlert className="h-4 w-4 mr-2 text-coaching-300" />
                Compact Low Block
              </h4>
              <ul className="list-disc ml-6 text-coaching-200 space-y-1">
                <li>Maintain two narrow, compact banks of defenders and midfielders.</li>
                <li>Defensive line should sit no higher than 30-35 yards from goal.</li>
                <li>No more than 25-30 yards from defensive line to forward line.</li>
                <li>Center backs stay central, don't get pulled wide.</li>
                <li>Full-backs tuck in narrower than in other systems.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold text-coaching-100 flex items-center mb-2">
                <Zap className="h-4 w-4 mr-2 text-coaching-300" />
                Controlling Space (Not Possession)
              </h4>
              <ul className="list-disc ml-6 text-coaching-200 space-y-1">
                <li>Focus on denying central space rather than winning the ball high.</li>
                <li>Force opponents to wide areas where they're less dangerous.</li>
                <li>Maintain defensive discipline - don't break lines to chase.</li>
                <li>Keep midfield centrally condensed to block passing lanes.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Target className="h-5 w-5 mr-2 text-coaching-300" /> 
            2. Counter-Attack Strategy
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Maintain at least one outlet player higher up (often the striker).</li>
              <li>Use direct, vertical passes to transition quickly when possession is won.</li>
              <li>Don't over-commit numbers forward - maintain defensive security.</li>
              <li>Practice first-time clearances to designated areas for counters.</li>
              <li>Fast wingers should conserve energy for explosive counter attacking runs.</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Users className="h-5 w-5 mr-2 text-coaching-300" /> 
            3. Player Instructions
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Goalkeeper: Act as sweeper, command box, manage game tempo through distribution.</li>
              <li>Center Backs: Stay central, focus on clearances and blocks, avoid stepping up.</li>
              <li>Full Backs: Mark opposing wingers, only engage when absolutely necessary.</li>
              <li>Central Midfielders: Screen defense, intercept passes, distribute quickly when won.</li>
              <li>Wingers: Track back to form 5-4-1 out of possession, explosive forward runs on counters.</li>
              <li>Striker: Outlet for clearances, hold up play when possible, selective pressing.</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <LightbulbIcon className="h-5 w-5 mr-2 text-coaching-300" /> 
            4. Game Management
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Set-Piece Focus: Maximize scoring potential from limited opportunities.</li>
              <li>Game State Management: Adjust defensive depth based on score and time.</li>
              <li>Tactical Fouls: Strategic fouls to prevent dangerous counterattacks.</li>
              <li>Energy Conservation: Players should know when to sprint vs. when to walk.</li>
              <li>Substitution Strategy: Fresh legs in wide areas and midfield when fatigue shows.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderCounterAdvice = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Workflow className="h-5 w-5 mr-2 text-coaching-300" /> 
            1. Tactical Setup
          </h3>
          
          <div className="ml-7 space-y-4">
            <div>
              <h4 className="text-md font-semibold text-coaching-100 flex items-center mb-2">
                <ShieldAlert className="h-4 w-4 mr-2 text-coaching-300" />
                Defensive Shape (Out of Possession)
              </h4>
              <ul className="list-disc ml-6 text-coaching-200 space-y-1">
                <li>Compact Mid-Block or Low-Block: Since you're counter-attacking, you should defend deep and deny space in behind.</li>
                <li>Narrow Formation: Keep the back four compact to prevent through balls.</li>
                <li>Midfield Shield: The central midfield trio should be well-balanced:
                  <ul className="list-disc ml-6 mt-1">
                    <li>One Defensive Midfielder (CDM): Stays in front of the center-backs.</li>
                    <li>Two Box-to-Box Midfielders (CMs): Help both defensively and offensively.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold text-coaching-100 flex items-center mb-2">
                <Zap className="h-4 w-4 mr-2 text-coaching-300" />
                Attacking Transition (In Possession)
              </h4>
              <ul className="list-disc ml-6 text-coaching-200 space-y-1">
                <li>Quick Vertical Play: As soon as you win the ball, transition fast with direct passes to the front three.</li>
                <li>Wingers Ready to Exploit Space: Your wingers should stay high and wide to stretch the defense and exploit open spaces on counters.</li>
                <li>Overlapping Full-Backs: Only one at a time should push forward to support attacks.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Users className="h-5 w-5 mr-2 text-coaching-300" /> 
            2. Player Roles & Positioning
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Center Backs: Stay deep and maintain a solid line; avoid stepping up too high.</li>
              <li>Full Backs: Defensive first, only one should join attacks at a time.</li>
              <li>Defensive Midfielder: Key role - screens defense, breaks up attacks, and distributes quickly.</li>
              <li>Box-to-Box Midfielders: Cover ground, support defense, and join counters when appropriate.</li>
              <li>Wingers: Position high and wide when defending to be ready for quick transition.</li>
              <li>Striker: Hold up play when needed, but primarily focus on making runs behind defenders.</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <Target className="h-5 w-5 mr-2 text-coaching-300" /> 
            3. Key Strategic Elements
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Transitions: The moment of winning the ball is crucial - practice quick forward passes.</li>
              <li>Direct Play: Don't overpass; look for direct balls to the forwards when space is available.</li>
              <li>Wide Outlets: Use width to stretch opponents and create spaces to exploit.</li>
              <li>Set Pieces: Maintain defensive solidity, keep at least 4 players back during corners.</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-coaching-50 flex items-center mb-2">
            <LightbulbIcon className="h-5 w-5 mr-2 text-coaching-300" /> 
            4. Tips for Success
          </h3>
          
          <div className="ml-7">
            <ul className="list-disc ml-6 text-coaching-200 space-y-1">
              <li>Patience: Don't force attacks if the opportunity isn't there.</li>
              <li>Timing: Practice the timing of counter-attacking movements.</li>
              <li>Defensive Discipline: Maintain shape and don't get pulled out of position.</li>
              <li>Energy Management: Counter-attacking requires explosiveness, so manage player stamina.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderGenericAdvice = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-coaching-700/40 rounded-md border border-coaching-600/50">
          <h3 className="text-coaching-50 flex items-center mb-2">
            <Flag className="h-5 w-5 mr-2 text-coaching-300" />
            Formation: {formation}
          </h3>
          <p className="text-coaching-200">
            {getFormationAdvice(formation)}
          </p>
        </div>

        <div className="p-4 bg-coaching-700/40 rounded-md border border-coaching-600/50">
          <h3 className="text-coaching-50 flex items-center mb-2">
            <Zap className="h-5 w-5 mr-2 text-coaching-300" />
            Play Style: {playStyle}
          </h3>
          <p className="text-coaching-200">
            {getPlayStyleAdvice(playStyle)}
          </p>
        </div>

        <div className="p-4 bg-coaching-700/40 rounded-md border border-coaching-600/50">
          <h3 className="text-coaching-50 flex items-center mb-2">
            <ShieldAlert className="h-5 w-5 mr-2 text-coaching-300" />
            Team Mentality: {defensiveStrategy}
          </h3>
          <p className="text-coaching-200">
            {getDefensiveStrategyAdvice(defensiveStrategy)}
          </p>
        </div>
      </div>
    );
  };

  const getFormationAdvice = (formation: string): string => {
    switch (formation) {
      case '4-3-3':
        return 'The 4-3-3 formation provides excellent coverage across the pitch with balanced defensive and attacking options. It requires disciplined midfielders who can transition between defense and attack.';
      case '4-4-2':
        return 'The classic 4-4-2 offers defensive stability with two solid banks of four. It relies on strong partnerships between the strikers and good width from the midfielders.';
      case '3-5-2':
        return 'The 3-5-2 provides additional midfield control while maintaining three dedicated defenders. Wing-backs must be extremely fit to cover the entire flank.';
      case '5-3-2':
        return 'A defensive 5-3-2 offers excellent protection against attacking teams. The three center-backs provide solidity while wing-backs can push forward when appropriate.';
      default:
        return 'Select a formation to get specific tactical advice tailored to your team setup.';
    }
  };

  const getPlayStyleAdvice = (style: string): string => {
    switch (style) {
      case 'possession':
        return 'Possession-based play requires technical players comfortable on the ball. Focus on short passing, movement, and creating numerical advantages in different areas of the pitch.';
      case 'counter-attack':
        return 'Counter-attacking football relies on defensive solidity and explosive transitions. Practice quick vertical passes and have your forwards ready to exploit spaces behind the opposition defense.';
      case 'high-press':
        return 'High pressing requires excellent fitness levels and coordination. Your team must move as a unit to cut passing lanes and force opponents into mistakes high up the pitch.';
      case 'wing-play':
        return 'Wing-focused tactics require fast, technical wide players and good crossers. Your full-backs should provide overlapping support while midfielders cover defensively.';
      case 'low-block':
        return 'The low block is a defensive tactic where your team defends deep and compact. Focus on denying space centrally, forcing opponents wide, and transitioning quickly when winning the ball.';
      case 'vertical':
        return 'Vertical football prioritizes quick forward progression through central channels. Focus on breaking lines with direct passes, minimal sideways playing, and exploiting spaces between opposition lines.';
      default:
        return 'Select a playing style to receive specific tactical recommendations.';
    }
  };

  const getDefensiveStrategyAdvice = (strategy: string): string => {
    if (strategy.includes('defensive') || strategy.includes('lose')) {
      return 'With a defensive mentality, focus on maintaining your shape, limiting spaces between the lines, and staying compact. Counter-attacks should be your primary offensive weapon.';
    } else if (strategy.includes('balanced')) {
      return 'A balanced approach allows flexibility to adapt to game situations. Be ready to defend in a mid-block but push forward when opportunities arise.';
    } else if (strategy.includes('offensive') || strategy.includes('win')) {
      return 'With an attacking mindset, press higher up the pitch and commit more players forward. Be watchful of defensive transitions and potential counter-attacks against you.';
    } else {
      return 'Select a team mentality to get tailored defensive and transition advice.';
    }
  };

  return (
    <Card className="mt-4 bg-coaching-800 border-coaching-700">
      <CardHeader>
        <CardTitle className="text-xl text-coaching-50 flex items-center">
          <LightbulbIcon className="h-5 w-5 mr-2 text-coaching-300" />
          Tactical Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {renderSpecificAdvice()}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
