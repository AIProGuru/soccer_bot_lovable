import { GamePlanTemplate } from "./types";

export const defaultTemplates: GamePlanTemplate[] = [
  {
    id: "counter-attacking-football",
    name: "Counter-Attacking Football",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Away",
    },
    teamAnalysis: {
      formation: "4-4-2",
      playStyle: "counter",
      teamMentality: "defensive",
      focusArea: "Quick transitions and defensive stability"
    },
    opponentPlan: {
      formation: "4-3-3",
      playStyle: "possession",
      strengths: ["Ball retention", "Technical quality", "High press"],
      weaknesses: ["Vulnerable to counter-attacks", "Space behind defenders", "Slow recovery"],
      keyPlayers: ["[Playmaker]", "[Forward]"],
      notes: "Expect them to have most of the possession. We'll set up to hit them on the counter."
    },
    tactics: {
      offensiveApproach: "Direct vertical passes into space. Target pacey wingers and forwards for quick breaks.",
      defensiveApproach: "Compact mid-block or low block. Force play wide and defend as a unit.",
      setPlays: "Utilize set pieces for physical advantage. Quick free kicks to catch opposition unprepared.",
      transitionStrategy: "Immediate vertical passes when possession is won. Fast breaks with limited touches.",
      substitutionStrategy: "Add defensive solidity if leading, extra pace if chasing."
    },
    tacticalSummary: "Defend deep in a structured block. Force the opponent wide or into mistakes. Once possession is won, launch fast, vertical attacks into space behind the opponent's defensive line using pacey wingers and strikers.",
    playerRoles: `🔒 Center Backs (CB):
• Stay tight and close together
• Clear danger, no risky passes
• Focus on winning duels

🏃‍♂️ Fullbacks (LB/RB):
• Stay back during attack
• Only support counter if space is open
• Prevent opponent wingers from cutting inside

🛡️ Central Midfielders (CM):
• One destroyer: break play, tackle
• One passer: play first-time balls forward
• Maintain discipline and shape

⚡ Wingers (LM/RM):
• Stay wide
• Sprint forward immediately in transitions
• Cross early or cut inside depending on space

🎯 Strikers (ST):
• One holds the ball up
• One makes runs in behind
• Work together to pull defenders out of shape`,
    keyTacticalPrinciples: `• Compact mid-block or low block
• Quick vertical transitions
• Forward runs behind the defense
• Clear roles and structure in defense
• Risk passes only in transition moments`,
    inGameAdjustments: `• Switch to 5-4-1 to defend the lead
• Bring on a third CM to block central areas
• Push fullbacks wider to prevent crosses
• Add pace upfront if opponent leaves space`,
    trainingFocus: `• Defensive shape drills
• Transition speed drills
• Long passes into channels
• Fast break finishing
• Sprint recovery training`,
    playerInstructions: `Player\tInstructions
GK\tLong kicks, quick distribution to flanks
CBs\tClear lines, stay central, win headers
FBs\tStay back, close down wide men
CMs\tDestroy + distribute, no forward roaming
Wingers\tStay wide, sprint forward on breaks
STs\tOne drop-deep, one run in behind, high pressing if space`,
    inspiredBy: "Diego Simeone's Atletico Madrid, Mourinho's Inter 2010, Leicester 2016",
    tags: ["Counter-Attack", "Defensive", "Direct", "Away", "4-4-2"]
  },
  {
    id: "possession-detailed-plan",
    name: "Possession-Based Game Plan",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-3-3",
      playStyle: "possession",
      teamMentality: "patient",
      focusArea: "Short passing triangles and positional play"
    },
    opponentPlan: {
      formation: "4-4-2",
      playStyle: "mixed",
      strengths: ["Counter-attacks", "Defensive organization", "Set pieces"],
      weaknesses: ["High pressing", "Possession retention", "Defending wide areas"],
      keyPlayers: ["[Central Defender]", "[Striker]"],
      notes: "Expect them to sit in a mid-block and look to counter. We'll need patience to break them down."
    },
    tactics: {
      offensiveApproach: "Short, sharp passing with triangles and diamonds. Overload flanks to stretch defenses. Patient buildup with quick execution in final third.",
      defensiveApproach: "Immediate counter-press to recover possession. Defensive midfielder shields backline.",
      setPlays: "Short corners with rehearsed movement patterns",
      transitionStrategy: "Quick recovery of possession with organized pressing. Fullbacks recover quickly on transitions.",
      substitutionStrategy: "Switch to 4-2-3-1 to protect midfield if under pressure. Substitute one winger for extra midfielder if needed."
    },
    tacticalSummary: "Maintain possession through short, sharp passing and intelligent off-the-ball movement. The goal is to pull opponents out of position and create gaps to exploit through central or wide overloads.",
    playerRoles: `🔒 Center Backs (CB):
• Stay wide during buildup
• Prioritize short passes to midfield
• Join attack only when safe

🏃‍♂️ Fullbacks (LB/RB):
• Push high in attack to support wingers
• Maintain width
• Fall back quickly on transitions

🧠 Defensive Midfielder (CDM):
• Act as pivot
• Control tempo
• Provide passing outlet under pressure
• Shield backline

🎯 Central Midfielders (CM):
• One playmaker: drive forward, link play
• One support: cover space, maintain shape
• Rotate and support wide play

⚡ Wingers (LW/RW):
• Stay wide to stretch backline
• Cut inside when near final third
• Provide crossing & shooting options

🎯 Striker (ST):
• Drop deep to create space
• Link with midfield
• Press defenders off the ball`,
    keyTacticalPrinciples: `• Positional play with structured movement
• Triangles and diamonds for passing options
• Overloads on flanks to stretch defenses
• Patience in buildup, but quick execution in final third
• Recover possession immediately with organized press`,
    inGameAdjustments: `• Switch to 4-2-3-1 to protect midfield
• Reduce fullback runs, stay back more often
• Lower tempo, hold ball to regain control
• Substitute one winger for extra midfielder if needed`,
    trainingFocus: `• 5v2 Rondos
• Shadow play for positional rotations
• Build-up from back under pressure
• Overload & finishing drills
• Quick recovery pressing drills`,
    playerInstructions: `Player\tInstructions
GK\tShort distribution, play from back
CBs\tStay wide, short passes, no long balls
FBs\tOverlap often, support midfield, recover quickly
CDM\tStay back, dictate tempo, always available for pass
CMs\tOne box-to-box, one advanced playmaker
Wingers\tWide positioning, cut inside final third, support FBs
ST\tFalse 9 movement, link-up, press CBs off ball`,
    inspiredBy: "Pep Guardiola at Man City, Johan Cruyff's Total Football philosophy",
    tags: ["Possession", "Positional Play", "Home", "Guardiola", "4-3-3"]
  },
  {
    id: "high-pressing-gegenpressing",
    name: "High Pressing (Gegenpressing)",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-3-3",
      playStyle: "pressing",
      teamMentality: "aggressive",
      focusArea: "Intense pressing and fast transitions"
    },
    opponentPlan: {
      formation: "4-4-2",
      playStyle: "mixed",
      strengths: ["Possession play", "Build from back", "Technical quality"],
      weaknesses: ["Slow build-up", "Recovery runs", "Decision-making under pressure"],
      keyPlayers: ["[Playmaker]", "[Goalkeeper]"],
      notes: "Their possession style can be disrupted by aggressive pressing. Focus on forcing errors in their defensive third."
    },
    tactics: {
      offensiveApproach: "Fast vertical transitions after winning possession. Attack before opponent can reset defensive structure.",
      defensiveApproach: "High press immediately after losing possession. Force play wide and trap against touchline.",
      setPlays: "Quick free kicks and throw-ins to maximize opponent disorganization.",
      transitionStrategy: "Immediate vertical passes to exploit spaces before opposition recovers shape.",
      substitutionStrategy: "Rotate high-energy positions (wingers, pressing midfielders) after 60-70 minutes."
    },
    tacticalSummary: "The team aims to win the ball back within seconds of losing it through coordinated pressing traps. The goal is to disrupt the opponent's buildup in their defensive third and launch fast attacks before the opposition can reset.",
    playerRoles: `Goalkeeper (GK):
• Sweeper-keeper
• Quick off line, distributes fast

Center Backs (CB):
• High line
• Aggressive on duels
• Comfortable on ball

Fullbacks (RB/LB):
• Push high to press wide areas
• Overlap to support wing play
• Pin opposition wingers

Defensive Midfielder (CDM):
• Shields back line
• Presses up when needed
• Distributes quickly

Central Midfielders (CMs):
• One joins press high, one supports cover
• Disrupt opposition playmakers
• Deliver final pass on counter

Wingers (RW/LW):
• Press fullbacks
• Cut off passing lanes
• Transition quickly to attack

Striker (ST):
• Initiates press
• Presses center backs and DMs
• Drops slightly to support midfield if needed`,
    keyTacticalPrinciples: `• Immediate pressing upon ball loss (5-second rule)
• Trigger-based pressing (bad touches, back passes, sideline traps)
• Compact team shape between defense and midfield
• Midfielders support press aggressively
• High defensive line to squeeze play`,
    inGameAdjustments: `• Switch to 4-1-4-1 for defensive cover
• Drop the line deeper and protect central spaces
• Lower press intensity late in the game
• Substitute fresh legs at 60–70 mins to maintain energy`,
    trainingFocus: `• Coordinated pressing drills
• Press trigger scenarios
• Quick transition drills (defense to attack)
• Short passing in tight spaces
• High-intensity conditioning work`,
    playerInstructions: `Player\tInstructions
GK\tSweeper-keeper, quick distribution
CBs\tAggressive step-up, comfort on ball
FBs\tHigh positioning, press wide, support attack
CDM\tScreen defense, trigger press, quick distribution
CMs\tDisrupt playmakers, support press, deliver final pass
Wingers\tPress fullbacks, cut lanes, quick transitions
ST\tInitiate press, harass CBs/DMs, support midfield`,
    inspiredBy: "Jürgen Klopp (Liverpool), Ralf Rangnick (RB Leipzig), Hansi Flick (Bayern Munich)",
    tags: ["High Press", "Gegenpressing", "Aggressive", "Klopp", "4-3-3"]
  },
  {
    id: "defensive-away-plan",
    name: "Defensive Away Game Plan",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Away",
    },
    teamAnalysis: {
      formation: "4-4-2",
      playStyle: "counter",
      teamMentality: "disciplined",
      focusArea: "Defensive organization and quick transitions"
    },
    opponentPlan: {
      formation: "4-3-3",
      playStyle: "possession",
      strengths: ["Home advantage", "Technical midfielders", "Ball retention"],
      weaknesses: ["Vulnerable on counter-attacks", "Slow defenders", "Set-piece defending"],
      keyPlayers: ["[Forward]", "[Midfielder]"],
      notes: "Known for dominating possession at home. Be patient and strike on the counter."
    },
    tactics: {
      offensiveApproach: "Direct counter-attacking through the wings",
      defensiveApproach: "Compact mid-block with disciplined shape",
      setPlays: "Target tall center-backs on corners",
      transitionStrategy: "Quick vertical passes after winning possession",
      substitutionStrategy: "Fresh legs on the wings after 60-70 minutes"
    },
    tags: ["Away", "Defensive", "Counter-Attack", "Mid-Block"]
  },
  {
    id: "possession-home-plan",
    name: "Possession Home Game Plan",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-3-3",
      playStyle: "possession",
      teamMentality: "proactive",
      focusArea: "Dominating possession and creating chances"
    },
    opponentPlan: {
      formation: "5-3-2",
      playStyle: "defensive",
      strengths: ["Organized defense", "Physical presence", "Set pieces"],
      weaknesses: ["Limited attacking options", "Lack of creative outlets", "Fatigue in latter stages"],
      keyPlayers: ["[Defender]", "[Forward]"],
      notes: "Will likely sit deep and look to frustrate. Patience and movement will be key to break them down."
    },
    tactics: {
      offensiveApproach: "Patient build-up with quick combinations in final third",
      defensiveApproach: "High press to win ball in opponent's half",
      setPlays: "Short corners with rehearsed movements",
      transitionStrategy: "Immediate counter-press when possession is lost",
      substitutionStrategy: "Creative players against tired legs in last 30 minutes"
    },
    tags: ["Home", "Possession", "High-Press", "Patient"]
  },
  {
    id: "pressing-derby-plan",
    name: "High-Pressing Derby Game Plan",
    matchDetails: {
      opponentTeam: "[Rival Team]",
      competitionType: "Derby",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-2-3-1",
      playStyle: "pressing",
      teamMentality: "aggressive",
      focusArea: "Intensity, pressing triggers, and quick transitions"
    },
    opponentPlan: {
      formation: "4-3-3",
      playStyle: "mixed",
      strengths: ["Technical midfield", "Attacking fullbacks", "Star forward"],
      weaknesses: ["Goalkeeper distribution", "Transition defense", "Defensive discipline"],
      keyPlayers: ["[Midfielder]", "[Forward]"],
      notes: "High-emotion derby match. Their players can be rattled by aggressive pressing and crowd energy."
    },
    tactics: {
      offensiveApproach: "Direct play after winning the ball in dangerous areas",
      defensiveApproach: "Aggressive pressing with defined triggers",
      setPlays: "Rehearsed free-kick routines near the box",
      transitionStrategy: "Immediate vertical passes when possession is won",
      substitutionStrategy: "Maintain energy levels with high-energy replacements"
    },
    tags: ["Derby", "High-Intensity", "Pressing", "Emotional"]
  },
  {
    id: "cup-underdog-plan",
    name: "Cup Match Underdog Strategy",
    matchDetails: {
      opponentTeam: "[Favored Opponent]",
      competitionType: "Cup",
      venue: "Away",
    },
    teamAnalysis: {
      formation: "5-4-1",
      playStyle: "defensive",
      teamMentality: "resilient",
      focusArea: "Organized defense and efficient counter-attacks"
    },
    opponentPlan: {
      formation: "4-3-3",
      playStyle: "possession",
      strengths: ["Technical quality", "Famous players", "Set pieces"],
      weaknesses: ["Overconfidence", "Defensive transitions", "Physical battles"],
      keyPlayers: ["[Star Player 1]", "[Star Player 2]"],
      notes: "Top-tier opponent expected to dominate. Can be frustrated by organized defending and direct play."
    },
    tactics: {
      offensiveApproach: "Direct counter-attacks targeting space behind fullbacks",
      defensiveApproach: "Deep, compact block with disciplined positioning",
      setPlays: "Maximum players for defensive set pieces",
      transitionStrategy: "Quick, direct passes to forwards who hold up play",
      substitutionStrategy: "Energy preservation with timely substitutions"
    },
    tags: ["Cup", "Underdog", "Defensive", "Counter-Attack"]
  },
  {
    id: "positional-play-plan",
    name: "Positional Play Masterclass",
    matchDetails: {
      opponentTeam: "[Opponent Team]",
      competitionType: "League",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-3-3",
      playStyle: "positional",
      teamMentality: "methodical",
      focusArea: "Positional superiority and third-man concepts"
    },
    opponentPlan: {
      formation: "4-4-2",
      playStyle: "direct",
      strengths: ["Defensive organization", "Set pieces", "Counter-attacks"],
      weaknesses: ["Technical limitations", "Defensive transitions", "Low block fatigue"],
      keyPlayers: ["[Striker]", "[Defender]"],
      notes: "Will likely defend in a mid/low block. Patient positional play will be needed to break them down."
    },
    tactics: {
      offensiveApproach: "Positional rotations to create free man and numerical advantages",
      defensiveApproach: "Positional pressing to control space",
      setPlays: "Short options with third-man movement",
      transitionStrategy: "Quick ball circulation to find free players",
      substitutionStrategy: "Technical players who can maintain possession pattern"
    },
    tags: ["Home", "Positional", "Technical", "Patience"]
  },
  {
    id: "direct-play-template",
    name: "Direct Play",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Home/Away",
    },
    teamAnalysis: {
      formation: "4-4-2",
      playStyle: "direct",
      teamMentality: "attacking",
      focusArea: "Fast vertical progression and second ball battles"
    },
    opponentPlan: {
      formation: "4-3-3",
      playStyle: "mixed",
      strengths: ["Technical quality", "Possession retention", "Build-up play"],
      weaknesses: ["Aerial duels", "Physical battles", "Transition defense"],
      keyPlayers: ["[Playmaker]", "[Center Back]"],
      notes: "Focus on bypassing their midfield with direct balls and exploiting space behind their defense."
    },
    tactics: {
      offensiveApproach: "Fast, direct forward passes targeting strikers. Minimize build-up play and bypass midfield when possible.",
      defensiveApproach: "Win the ball and get it forward quickly. Target aerial duels and second balls.",
      setPlays: "Use every set piece as an attacking opportunity. Target tall players from corners and free kicks.",
      transitionStrategy: "Immediate forward passes after winning possession. No dwelling on the ball.",
      substitutionStrategy: "Keep fresh legs in forward positions. Add height or pace depending on game state."
    },
    tacticalSummary: "The aim is to bypass midfield lines with long balls or quick, direct passes, targeting forwards who can hold up play or run in behind. The team looks to move the ball forward rapidly, apply pressure off second balls, and capitalize on defensive disorganization.",
    playerRoles: `• Center Backs: Long-range passers; bypass midfield
• Fullbacks: Deliver early crosses and support attacks
• Midfielders: Win second balls, distribute quickly
• Wingers: Stretch play wide, direct dribbles and early deliveries
• Strikers: One drops to hold up, the other makes runs behind`,
    keyTacticalPrinciples: `• Quick vertical progression
• Minimize passes in midfield
• Constant movement from forwards
• High emphasis on winning second balls
• Overload the opponent's backline`,
    inGameAdjustments: `• Shift to a 4-5-1 to absorb pressure
• Encourage goalkeeper to go long
• Focus on set pieces and throw-ins to regain control
• Substitute in pacey players for counter-attacks`,
    trainingFocus: `• Long passing accuracy drills
• Forward movement and runs in behind
• Second ball recovery exercises
• Quick decision-making under pressure
• Set-piece efficiency (throw-ins, free kicks, corners)`,
    playerInstructions: `Player\tInstructions
GK\tDistribute quickly and long
CBs\tPlay direct balls to forwards, minimize short passing
FBs\tDeliver early crosses, provide width
CMs\tWin second balls, distribute forward quickly
Wingers\tStretch play, direct dribbling, early crosses
STs\tOne holds up ball, one runs behind defense`,
    inspiredBy: "Sir Alex Ferguson's Manchester United (1990s), Diego Simeone's Atlético Madrid, Tony Pulis-era Stoke City",
    tags: ["Direct", "Vertical", "4-4-2", "Second Balls", "Set Pieces"]
  },
  {
    id: "wing-play-tactical",
    name: "Wing Play Tactical",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-2-3-1",
      playStyle: "wing-play",
      teamMentality: "balanced",
      focusArea: "Exploiting wide areas and delivering crosses"
    },
    opponentPlan: {
      formation: "4-4-2",
      playStyle: "mixed",
      strengths: ["Compact central defense", "Physical presence", "Counter-attacks"],
      weaknesses: ["Defending wide areas", "Full-back positioning", "Aerial organization"],
      keyPlayers: ["[Central Midfielder]", "[Striker]"],
      notes: "Their full-backs can be isolated and exploited in 1v1 situations or overloads."
    },
    tactics: {
      offensiveApproach: "Exploit wide areas to stretch the opposition, create overloads on flanks, and deliver dangerous crosses into the box.",
      defensiveApproach: "Balanced approach with focus on quick recovery runs from wide players when possession is lost.",
      setPlays: "Utilize corners and wide free-kicks to exploit aerial advantage in the box.",
      transitionStrategy: "Quick switches of play to isolate wingers in 1v1 situations and exploit space.",
      substitutionStrategy: "Fresh legs on the wings after 60-70 minutes, additional aerial presence if crossing strategy is effective."
    },
    tacticalSummary: "The strategy is to exploit wide areas to stretch the opposition, isolate full-backs, and deliver dangerous crosses into the box. The goal is to create numerical superiority on the flanks, overloads, and supply lines to a central striker or late runners.",
    playerRoles: `• Wingers:
  - Traditional (touchline) or inverted
  - Beat full-backs 1v1, cut inside or cross
  - Maintain width throughout attack

• Full-Backs:
  - High and overlapping positions
  - Provide width and crossing options
  - Support wingers with overlapping runs

• #9 (Striker):
  - Strong in aerial duels
  - Good at finishing crosses
  - Create space with movement in the box

• #10 (Attacking Midfielder):
  - Arrive late in the box
  - Connect with wide players
  - Support diagonal runs behind defense

• Double Pivot (2 CMs):
  - One holds position as anchor
  - One supports attack while covering wide rotations
  - Distribute play to wide areas

• Center Backs:
  - Stay compact and organized
  - Ready for counter-attacks
  - Support build-up with diagonal passes to wide areas`,
    keyTacticalPrinciples: `• Width: Maintain maximum width throughout build-up and attack.
• Overlaps & Underlaps: Full-backs or wing-backs support attacks with overlaps.
• Quick Switches of Play: Use diagonals and switches to isolate wingers.
• Early Crosses: Deliver balls into the box quickly before the defense sets.
• Wide Overloads: Combine with #8 or #10 to double up against the opponent's full-back.`,
    inGameAdjustments: `• Drop full-backs deeper to avoid getting caught on the counter.
• Switch to 3-4-3 with wing-backs if being overrun in midfield.
• Bring on a second striker to attack crosses with two targets.
• Shift to mid-block to regain control of space.
• Increase diagonal long balls if wide press is too intense.`,
    trainingFocus: `• Crossing & Finishing Drills
• Overlapping Runs & Combinations
• 1v1 Winger Drills
• Switching Play Exercises
• Defensive Transition Recovery (for full-backs)
• Aerial Duels & Heading Practice`,
    playerInstructions: `Player\tInstructions
Wingers\tStay wide, beat defender 1v1, deliver crosses
Full-Backs\tPush high when attacking, provide overlaps
Striker\tAttack crosses, central positioning in box
AM\tSupport wide play, late runs into box
CMs\tOne holds, one supports wide overloads
CBs\tStay central, cover for full-backs`,
    inspiredBy: "Sir Alex Ferguson's Manchester United (1999-2008), Antonio Conte's Chelsea with Victor Moses & Marcos Alonso (2016/17), England National Team (2021 Euros)",
    tags: ["Wing Play", "Crossing", "Wide Attacks", "Overloads", "4-2-3-1"]
  },
  {
    id: "low-block-tactical",
    name: "Low Block Tactical",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Away",
    },
    teamAnalysis: {
      formation: "4-5-1",
      playStyle: "defensive",
      teamMentality: "defensive",
      focusArea: "Defensive organization and counter-attacks"
    },
    opponentPlan: {
      formation: "4-3-3",
      playStyle: "possession",
      strengths: ["Technical quality", "Possession game", "Attacking full-backs"],
      weaknesses: ["Vulnerable on the counter", "Frustrated by deep blocks", "Impatient in build-up"],
      keyPlayers: ["[Creative Midfielder]", "[Forward]"],
      notes: "Opponent will likely dominate possession. Our focus is to stay compact, force them wide, and counter-attack with speed."
    },
    tactics: {
      offensiveApproach: "Quick counter-attacks utilizing direct passes to the striker or wingers. Limited build-up play.",
      defensiveApproach: "Deep, compact low block with narrow spacing between lines (25-30m depth). Force play wide.",
      setPlays: "Maximize set pieces for attacking opportunities. Full commitment to defensive set pieces.",
      transitionStrategy: "Immediate vertical passes when possession is won. Quick outlet to forwards who can hold up play.",
      substitutionStrategy: "Fresh defensive players in later stages. Potentially add another defender if protecting a lead."
    },
    tacticalSummary: "The low block is a defensive strategy where the team sits deep, close to its own penalty box, forming compact horizontal and vertical lines. The objective is to limit space behind the defense, block central channels, and force the opponent into low-percentage wide play. Attack through counter-attacks or isolated set-piece moments.",
    playerRoles: `• Goalkeeper (GK):
  - Command box and communicate positioning
  - Long distribution when possible
  - Sweeper role behind the defensive line

• Center Backs (CBs):
  - Stay deep and maintain position
  - Clear crosses and block shots
  - Don't step out unless absolutely necessary

• Full-Backs (FBs):
  - Position narrow when defending
  - Prevent cutbacks and wide overloads
  - Limited overlapping runs, focus on defensive duties

• Central Midfielders (CMs):
  - Three-man shield in front of back line
  - Stay close to each other (minimal gaps)
  - Block passing lanes to opposition forwards

• Wingers:
  - Track opponent full-backs and wide midfielders
  - Drop into midfield line when defending
  - Spring counter-attacks when possession is won

• Striker (ST):
  - Stay high as outlet for counter-attacks
  - Press selectively, conserve energy
  - Hold up play and wait for support`,
    keyTacticalPrinciples: `• Maintain compactness between lines (no more than 25-30m front to back)
• Force play wide, avoid being broken through the center
• Prioritize zonal marking and clear communication
• Disciplined shape regardless of ball position
• Quick, vertical transitions upon regaining possession`,
    inGameAdjustments: `• Shift from 4-5-1 to 5-4-1 for more protection against wide overloads
• Drop even deeper in final 15-20 minutes to close out a result
• Add a second holding midfielder if struggling to contain central play
• Replace attacking players with fresh, defensive-minded ones to keep intensity
• Slow game tempo through controlled set pieces when ahead`,
    trainingFocus: `• Defensive Shape Drills (Back 4 + midfield 5 movements)
• Zonal Marking Exercises
• Counter-Attack Simulations (Regain + immediate forward runs)
• Cross-Clearing Drills
• Communication & Line Management
• Defensive Transition Recovery Work`,
    playerInstructions: `Player\tInstructions
GK\tCommand box, stay on line, long distribution
CBs\tStay deep, block shots, clear danger
FBs\tNarrow position, prevent cutbacks, limited forward runs
CMs\tShield back line, block passing lanes, stay compact
Wingers\tTrack full-backs, drop into midfield, spring counters
ST\tStay high, press selectively, outlet for counters`,
    inspiredBy: "Diego Simeone's Atlético Madrid, José Mourinho's Inter Milan (2010), Sean Dyche's Burnley, Greece National Team (EURO 2004)",
    tags: ["Low Block", "Defensive", "Counter-Attack", "Compact", "4-5-1"]
  },
  {
    id: "vertical-play-tactical",
    name: "Vertical Play Tactical",
    matchDetails: {
      opponentTeam: "[Opponent Name]",
      competitionType: "League",
      venue: "Home",
    },
    teamAnalysis: {
      formation: "4-3-3",
      playStyle: "vertical",
      teamMentality: "proactive",
      focusArea: "Forward progression and line-breaking passes"
    },
    opponentPlan: {
      formation: "4-4-2",
      playStyle: "mixed",
      strengths: ["Organized defense", "Midfield compactness", "Transition defense"],
      weaknesses: ["Space between lines", "Defensive coordination", "High line vulnerabilities"],
      keyPlayers: ["[Defensive Midfielder]", "[Center Back]"],
      notes: "Focus on breaking their midfield lines with quick vertical passes. Look to exploit the space between their defense and midfield with intelligent movement."
    },
    tactics: {
      offensiveApproach: "Quick, incisive forward passing to break lines. Minimal horizontal passes. Progressive ball movement with intent.",
      defensiveApproach: "Proactive pressing in middle third. Win the ball to launch immediate vertical attacks.",
      setPlays: "Quick free kicks and throw-ins to catch opposition out of position.",
      transitionStrategy: "Immediate forward passing upon winning possession. Attack space directly.",
      substitutionStrategy: "Fresh attackers who can maintain vertical threat. Technical midfielders to sustain progression."
    },
    tacticalSummary: "Vertical Play focuses on progressing the ball forward as quickly as possible through incisive, line-breaking passes. The goal is to move the ball into dangerous zones with minimal touches and to destabilize the opponent's structure before they can reset. It prioritizes central progression, quick support play, and fast combinations in the final third.",
    playerRoles: `• Goalkeeper (GK):
  - Distribute quickly
  - Initiate attacks with throws or low passes
  - Look for medium-range options in half-spaces

• Center Backs (CBs):
  - Break lines with passes into midfield
  - Carry the ball forward if space opens
  - Aggressive positioning to compress play

• Full-Backs (FBs):
  - Join the attack aggressively
  - Underlap or overlap based on winger movement
  - Provide quick passing options

• Central Defensive Midfielder (CDM):
  - Connect defenders and attackers
  - Play sharp vertical balls into pockets
  - Be available as a reset option when needed

• Central Midfielders (CMs):
  - Make third-man runs
  - Break into the box
  - Support striker with central combinations

• Wingers:
  - Cut inside often
  - Offer quick release options
  - Attack channels between defenders

• Striker (ST):
  - Make constant runs in behind
  - Hold up and lay off for midfield runners
  - Create space with movement`,
    keyTacticalPrinciples: `• Play forward at every opportunity
• Use 1-2 touch combinations to break lines
• Encourage midfielders and fullbacks to support play immediately after passes
• Constant movement off the ball to provide vertical options
• Prioritize passes into central spaces (between lines)`,
    inGameAdjustments: `• Temporarily shift to a slower build-up (possession phase) to regain control
• Drop one CM deeper to assist in progression if opponent is pressing high
• Use wingers to stretch width if central lanes are blocked
• Add a second striker or attacking midfielder to provide more vertical targets
• Switch to a 4-2-3-1 to provide more central presence if struggling to progress`,
    trainingFocus: `• Vertical Passing Drills (e.g. bounce pass to third man)
• Rondo with Forward Pass Triggers
• Small-Sided Games with Touch Limit + Forward Pass Bonus
• Midfield Movement Patterns (1-2s and runs between lines)
• Attacking Transition Races (attack goal within 5 seconds after regaining)
• Line-Breaking Pass Recognition Exercises`,
    playerInstructions: `Player\tInstructions
GK\tQuick distribution, look for advanced options
CBs\tCarry forward, play vertical passes, aggressive positioning
FBs\tHigh position, underlap runs, quick combinations
CDM\tBreak lines with passes, position to receive and distribute
CMs\tMake third-man runs, forward passing, penetrating movements
Wingers\tNarrow positioning, cut inside, create overloads centrally
ST\tRuns in behind, lay-offs, create space for midfield runners`,
    inspiredBy: "Julian Nagelsmann's RB Leipzig, Jürgen Klopp's Liverpool (Vertical-Transition Phase), Luciano Spalletti's Napoli (2022/23), Marcelo Bielsa's Leeds",
    tags: ["Vertical", "Fast Attack", "Line-Breaking", "Forward Passing", "4-3-3"]
  }
];
