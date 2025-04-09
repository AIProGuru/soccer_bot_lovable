import React from 'react';

export interface PlayStyle {
  name: string;
  description: string;
  example: string;
  tacticalDetails?: string;
}

export const PLAY_STYLES: Record<string, PlayStyle> = {
  "possession": {
    name: "Possession-Based Football",
    description: "Focuses on controlling the ball through short, precise passes. The aim is to dominate the game by keeping the ball away from opponents and patiently creating scoring opportunities.",
    example: "Example: FC Barcelona under Pep Guardiola",
    tacticalDetails: `🔄 Play Style: Possession-Based Football

⸻

🔑 Key Tactical Principles
	•	Short, sharp passing sequences
	•	Positional rotations to create overloads
	•	Build-up from the back with patience
	•	Maintain high percentage of ball possession
	•	Intelligent movement to pull opponents out of shape
	•	Quick recovery after losing possession (counter-press)

⸻

🧩 Player Roles & Positioning

Goalkeeper: Comfortable with the ball at feet, involved in build-up
Center Backs: Split wide, initiate attacks with composed passing
Full-Backs: Push high to create width, overlap and underlap support
Central Midfielders: Rotate and support build-up, dictate tempo
Wingers: Stay wide and stretch opposition, cut inside when needed
Striker: Drops into midfield to link play or make blind-side runs

⸻

🔁 In-Game Adjustments (If Under Pressure)
	•	Drop pivot deeper to offer a safer passing lane
	•	Instruct full-backs to sit back temporarily
	•	Encourage 1-2 touch combinations to escape pressing traps
	•	Switch sides quickly to find space on the weak side
	•	Slow down tempo to regain control and composure

⸻

🧠 Recommended Training Focus
	•	Rondo drills to sharpen quick passing
	•	Positional play exercises (e.g., 6v4 overloads)
	•	Transition games with immediate pressing after loss
	•	Playing out from the back under pressure
	•	Third man runs and off-ball movement drills

⸻

🌟 Inspired By
	•	Pep Guardiola's FC Barcelona and Manchester City
	•	Xavi's Barcelona
	•	Luis Enrique's Spanish national team
	•	Johan Cruyff's Total Football evolution`
  },
  "counter": {
    name: "Counter-Attacking Football",
    description: "Involves defending deep and quickly transitioning to attack once possession is won. It targets exploiting spaces left by the opposition when they are attacking.",
    example: "Example: Leicester City during their 2015-16 Premier League title win",
    tacticalDetails: `🔄 Play Style: Counter-Attacking Football

⸻

🔑 Key Tactical Principles
	•	Sit deep in compact defensive shape
	•	Regain possession in middle or defensive third
	•	Break quickly with direct vertical passes
	•	Use speed and space behind opponent's defense
	•	Minimal touches in transition
	•	Exploit numerical advantage on the break

⸻

🧩 Player Roles & Positioning

Goalkeeper: Long distribution and fast release
Center Backs (CB): Stay tight, win duels, clear danger quickly
Full-Backs (FB): Prioritize defense, support counter only when safe
Defensive Midfielders (CDM): Screen the back line, start counter with first pass
Wingers: Stay wide and high, explode forward on turnover
Striker (ST): Play on the shoulder of last defender, stretch backline with pace

⸻

🧠 Mentality Instructions
	•	Stay patient, trust the system
	•	Absorb pressure without panic
	•	Attack with pace and purpose when chances arise
	•	Communicate to coordinate shape and press triggers
	•	Stay disciplined in roles—don't overcommit

⸻

🔁 In-Game Adjustments (If Under Pressure)
	•	Drop defensive line deeper
	•	Move to 5-at-the-back if overwhelmed
	•	Use fresh legs on wings for speed in transition
	•	Switch to two holding midfielders for protection
	•	Delay opposition through tactical fouls in midfield

⸻

🧪 Recommended Training Focus
	•	Transition drills from defense to attack
	•	3v2, 4v3 breakaway scenarios
	•	Recovery runs + press triggers after turnovers
	•	Finishing in space under pressure
	•	Sprint endurance and explosive power

⸻

🌟 Inspired By
	•	José Mourinho's Inter Milan (2010)
	•	Diego Simeone's Atlético Madrid
	•	Leicester City (2015–16) under Claudio Ranieri
	•	Real Madrid under Carlo Ancelotti (counter moments)
	•	Germany national team (2014 World Cup transitions)`
  },
  "gegenpressing": {
    name: "High Pressing (Gegenpressing)",
    description: "Aggressively pressures opponents high up the pitch to force errors and regain possession quickly. Teams using this style aim to win the ball back as soon as they lose it.",
    example: "Example: Liverpool under Jürgen Klopp",
    tacticalDetails: `🔄 Play Style: High Pressing (Gegenpressing)

⸻

🔑 Key Tactical Principles
	•	Win the ball back within 5 seconds of losing it
	•	Press in coordinated units, triggered by opponent passes or poor touches
	•	Maintain a high defensive line to compress space
	•	Force play into pressing traps (sideline, weak-foot, isolated player)
	•	Immediate vertical attack after regaining possession
	•	High physical demands and constant communication

⸻

🧩 Player Roles & Positioning

Goalkeeper: Sweeper-keeper, high starting position, distributes fast
Center Backs (CB): Aggressive positioning, ready to intercept long balls
Full-Backs (FB): Press high and wide, support overloads on the flanks
Central Midfielders (CM): Constant pressing, cover wide and central zones, win second balls
Wingers: Press opponent full-backs, force back passes, make inside runs
Striker (ST): Initiate press, angle runs to guide opponent into traps, trigger counter-press

⸻

🧠 Mentality Instructions
	•	Relentless energy—never stop pressing
	•	Every player defends and attacks
	•	Trust the structure—don't chase alone
	•	React instantly to ball loss—win it back on the spot
	•	Stay brave and aggressive, even under fatigue

⸻

🔁 In-Game Adjustments (If Under Pressure)
	•	Switch to 4-1-4-1 for more midfield control
	•	Reduce pressing intensity in the final 15 minutes if energy drops
	•	Sub early for fresh legs in wide and midfield zones
	•	Compact lines if opponent starts bypassing the press
	•	Delay attacks slightly to regain composure and shape

⸻

🧪 Recommended Training Focus
	•	Coordinated pressing patterns (e.g., 3v3 + 1 pressing zones)
	•	Transition drills (win and go vertical)
	•	High-intensity rondos with pressing rules
	•	Fitness + recovery training to maintain pressing levels
	•	Communication and trigger-based pressing simulations

⸻

🌟 Inspired By
	•	Jürgen Klopp's Liverpool (2015–2022 peak press years)
	•	Ralf Rangnick's RB Leipzig
	•	Bayern Munich under Hansi Flick
	•	Marcelo Bielsa's Leeds United
	•	Germany U23 pressing models`
  },
  "direct": {
    name: "Direct Play",
    description: "Focuses on quickly moving the ball toward the opponent's goal with long passes and minimal buildup. This style targets quick, decisive attacks and benefits from physical forwards.",
    example: "Example: Traditional English Premier League teams"
  },
  "wing-play": {
    name: "Wing Play",
    description: "Utilizes wide areas of the pitch to stretch the defense and deliver crosses into the box. It relies heavily on fast wingers and fullbacks to create scoring chances.",
    example: "Example: Manchester United under Sir Alex Ferguson",
    tacticalDetails: `🔄 Play Style: Wing Play

⸻

🔑 Key Tactical Principles
	•	Maximize width to stretch opponent's defensive shape
	•	Use full-backs and wingers in tandem to create overloads
	•	Deliver early and frequent crosses into the box
	•	Isolate wide 1v1 situations to exploit pace and dribbling
	•	Quick switches of play to shift defensive blocks
	•	Encourage diagonal runs from strikers and midfielders into the box

⸻

🧩 Player Roles & Positioning

Goalkeeper: Quick long throws or kicks to wide areas to start transition
Center Backs: Stay compact, distribute wide when building
Full-Backs (RB/LB): High positioning, aggressive overlaps, early crosses
Central Midfielders: Shift laterally to support wide play, deliver diagonal balls
Wingers: Stay wide to stretch play, 1v1 dribblers or early crossers
Striker (ST): Target man or poacher to attack crosses
CAM (if in 4-2-3-1): Arrive late into box or combine with wingers

⸻

🧠 Mentality Instructions
	•	Be aggressive in wide areas — take on your marker
	•	Prioritize width and stretching the pitch
	•	Full-backs: deliver fast and early — don't overthink it
	•	Midfielders: always support wide channels and recover quickly
	•	Striker: stay alert in the box — expect delivery anytime

⸻

🔁 In-Game Adjustments (If Under Pressure)
	•	Bring full-backs deeper if wide space is being exposed
	•	Switch to a 3-4-3 with wing-backs to reinforce width
	•	Add a second striker to increase threat in the box
	•	Focus on winning second balls from crosses and rebounds
	•	Change from crossing to cut-backs if opponent defends deep

⸻

🧪 Recommended Training Focus
	•	Crossing and finishing drills (1st time, aerial, cut-backs)
	•	2v1 and 3v2 wing overload exercises
	•	Positional rondos emphasizing wide transitions
	•	Switching play drills (long diagonals, quick short switches)
	•	Timing runs into the box for midfielders and strikers

⸻

🌟 Inspired By
	•	Sir Alex Ferguson's Manchester United (Giggs & Beckham era)
	•	Antonio Conte's Chelsea (2016/17 with wing-backs)
	•	Gareth Southgate's England (2021 Euros)
	•	Bayern Munich with Coman & Davies on flanks
	•	Classic Premier League wide play (early 2000s)`
  },
  "low-block": {
    name: "Low Block (Defensive Style)",
    description: "Defends with many players behind the ball, denying the opposition space in dangerous areas. Teams focus on absorbing pressure and hitting on the counter.",
    example: "Example: Atlético Madrid under Diego Simeone",
    tacticalDetails: `🔄 Play Style: Low Block (Defensive Style)

⸻

🔑 Key Tactical Principles
	•	Maintain deep, compact defensive lines
	•	Deny space in central areas and behind the back line
	•	Force opponents wide and defend crosses
	•	Prioritize zonal discipline over pressing
	•	Patience and timing when breaking forward
	•	Counter only when clear opportunity arises

⸻

🎯 Focus Area
	•	Compactness between lines (20–30m front to back)
	•	Blocking central passing lanes
	•	Delayed pressure instead of active pressing
	•	Forcing low-percentage wide attacks
	•	Quick, vertical counter-attacks after regaining

⸻

🧩 Player Roles & Positioning

Goalkeeper: Command area, manage time, direct defensive line
Center Backs (CB): Stay deep, block shots, win aerial duels
Full-Backs (FB): Stay narrow, only engage wide if necessary
Central Midfielders: Screen the back line, protect half-spaces
Wingers: Drop into midfield line, track opposition full-backs
Striker: Stay high as outlet or drop between lines to relieve pressure

⸻

🧠 Mentality Instructions
	•	Stay patient—defending is the plan, not the problem
	•	Every player defends—no exceptions
	•	Don't chase the ball—stay in your zone and trust the shape
	•	Communication is constant—shift together, recover together
	•	Break with speed when the moment comes—but never force it

⸻

🔁 In-Game Adjustments (If Under Pressure)
	•	Drop wingers even deeper into a 5-4-1 if needed
	•	Reinforce midfield with a double pivot to absorb pressure
	•	Bring on fresh legs to maintain energy and focus
	•	Time-wasting tactics in last 15 minutes to protect lead
	•	Switch to long clearances and set-piece focus

⸻

🧪 Recommended Training Focus
	•	10v8/11v10 defending with compact blocks
	•	Zonal marking and shifting drills
	•	Defensive shape retention under pressure
	•	Quick recovery counter-attack drills
	•	Set-piece defense (especially wide free kicks and corners)

⸻

🌟 Inspired By
	•	Diego Simeone's Atlético Madrid
	•	José Mourinho's Inter Milan (2010)
	•	Portugal Euro 2016
	•	Sean Dyche's Burnley
	•	Italy National Team (2000s–2010s)`
  },
  "vertical": {
    name: "Vertical Play",
    description: "Focuses on progressing the ball forward quickly through line-breaking passes. The goal is to move the ball into dangerous zones with minimal touches and destabilize the opponent's structure.",
    example: "Example: Julian Nagelsmann's RB Leipzig, Luciano Spalletti's Napoli",
    tacticalDetails: `🔄 Play Style: Vertical Play

⸻

🔑 Key Tactical Principles
	•	Prioritize fast forward progression through the central channels
	•	Minimize sideways and backward passes
	•	Focus on breaking lines with quick, direct passes
	•	High support around the ball to allow sharp combinations
	•	Third-man runs, 1–2s, and vertical rotations to create breakthroughs
	•	Exploit disorganized defenses immediately after turnovers

⸻

🎯 Focus Area
	•	Breaking lines quickly and directly
	•	Central overloads and vertical passing lanes
	•	Quick support for 1–2s and layoffs
	•	Positioning between opponent lines
	•	Forward-thinking in all areas of the pitch

⸻

🧩 Player Roles & Positioning

Goalkeeper: Quick, low-risk distribution to feet
Center Backs (CB): Play into midfield aggressively, step into space when possible
Full-Backs (FB): Offer underlaps or central options, not just wide overlap
Defensive Midfielder (CDM): Receives under pressure, turns, and plays forward
Central Midfielders (CMs): Find pockets between lines, drive vertically with and without the ball
Wingers: Make inside diagonal runs or receive and drive inward
Striker (ST): Drops deep to connect or stretches the line with aggressive runs in behind

⸻

🧠 Mentality Instructions
	•	Play forward first—don't settle for safety
	•	Be brave between the lines—pressure is expected
	•	Support must be fast and tight—no one left isolated
	•	When we win the ball—go forward instantly
	•	Final third decisions must be quick and decisive

⸻

🔁 In-Game Adjustments (If Under Pressure)
	•	Add a second pivot (double 6) to relieve pressure in buildup
	•	Move wide players slightly higher to push back opposition full-backs
	•	Bring on fresh central players to maintain vertical energy
	•	Slow down tempo slightly if vertical passing lanes are blocked
	•	Drop striker deeper to act as false 9 and draw defenders out

⸻

🧪 Recommended Training Focus
	•	Vertical passing drills (bounce pass to third man)
	•	Breaking lines in small-sided games (central overloads)
	•	Quick 1–2 combination exercises under pressure
	•	Central positioning and support angle movement drills
	•	Reaction transitions after regaining possession

⸻

🌟 Inspired By
	•	Julian Nagelsmann's RB Leipzig
	•	Jürgen Klopp's Liverpool (counter-vertical phases)
	•	Luciano Spalletti's Napoli (2022/23)
	•	Germany U21 (central vertical model)`
  }
  // Total Football has been removed
};

export function getPlayStyleCharacteristics(styleKey: string): string[] {
  switch (styleKey) {
    case "possession":
      return [
        "Short passing and triangular movement",
        "High technical skill requirements",
        "Patient buildup play",
        "Emphasis on ball retention",
        "Constant player movement to create passing options"
      ];
    case "counter":
      return [
        "Quick vertical transitions",
        "Compact defensive shape",
        "Fast, direct passing",
        "Exploiting space behind opponents",
        "Disciplined defending before explosive attacks"
      ];
    case "gegenpressing":
      return [
        "Immediate pressure after losing possession",
        "Coordinated team pressing",
        "High fitness and energy demands",
        "Winning the ball in advanced positions",
        "Preventing opponent buildup"
      ];
    case "direct":
      return [
        "Long passes and direct distribution",
        "Physical forwards to hold up play",
        "Minimized build-up phases",
        "Emphasis on winning second balls",
        "Quick progression toward the opponent's goal"
      ];
    case "wing-play":
      return [
        "Utilizing wide areas as primary attacking routes",
        "Strong crossers and aerial threats",
        "Overlapping fullbacks",
        "Stretching opposition defense",
        "Creating 2v1 situations on the flanks"
      ];
    case "tiki-taka":
      return [
        "Extremely high possession percentage",
        "Quick, one-touch passing",
        "Positional fluidity",
        "Breaking down compact defenses",
        "Creating numerical advantages in small spaces"
      ];
    case "low-block":
      return [
        "Compact defensive shape with minimal space between lines",
        "Prioritizing defensive solidity",
        "Countering when opportunities arise",
        "Limiting space in dangerous areas",
        "Frustrating opponent attacks"
      ];
    case "catenaccio":
      return [
        "Rigorous man-marking system",
        "Disciplined defensive organization",
        "Minimal risk-taking in possession",
        "Quick, opportunistic counters",
        "Strategic, conservative approach to game management"
      ];
    case "vertical":
      return [
        "Forward-focused passing and movement",
        "Quick progression through opponent lines",
        "Line-breaking passes into central spaces",
        "High tempo transitions and combinations",
        "1-2 touch play with immediate support"
      ];
    default:
      return ["Select a play style to see detailed characteristics"];
  }
}
