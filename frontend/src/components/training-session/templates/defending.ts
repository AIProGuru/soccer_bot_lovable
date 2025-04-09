
import { SessionTemplate } from './types';

export const defendingTemplates: SessionTemplate[] = [
  {
    id: "mirror-match-drill",
    name: "Mirror & Match Drill",
    drillName: "Mirror & Match Drill",
    duration: "10",
    ageGroup: "u14",
    trainingFocus: "defensive",
    playerCount: "2",
    physicalIntensity: "medium",
    notes: "Attacker makes sharp lateral or diagonal movements; defender mirrors without diving in. Focuses on staying balanced, low, and in control.",
    trainingStyle: "defending",
    tags: ["Footwork", "Positioning", "Reactive Defending"]
  },
  {
    id: "end-zone-duel",
    name: "End Zone Duel (1v1 to Line)",
    drillName: "End Zone Duel (1v1 to Line)",
    duration: "12",
    ageGroup: "u15",
    trainingFocus: "defensive",
    playerCount: "4",
    physicalIntensity: "medium",
    notes: "Attacker tries to dribble over an end line, defender must delay and win the ball. Reward patience and correct body shape, not just tackling.",
    trainingStyle: "defending",
    tags: ["Delay", "Angle of Approach", "Containment"]
  },
  {
    id: "recovery-sprint-duel",
    name: "Recovery Sprint Duel",
    drillName: "Recovery Sprint Duel",
    duration: "15",
    ageGroup: "u16",
    trainingFocus: "defensive",
    playerCount: "6",
    physicalIntensity: "high",
    notes: "Defender starts behind attacker and must sprint back, angle off, and recover before shot or goal line. Trains transition defending under pressure.",
    trainingStyle: "defending",
    tags: ["Recovery Run", "Angle Cut-Off", "Game Scenario"]
  },
  {
    id: "alley-duel",
    name: "1v1 Alley Duel",
    drillName: "1v1 Alley Duel",
    duration: "10",
    ageGroup: "u14",
    trainingFocus: "defensive",
    playerCount: "4",
    physicalIntensity: "medium",
    notes: "Narrow channel; attacker must beat defender using limited space. Encourages tight body control and using the line to guide attacker.",
    trainingStyle: "defending",
    tags: ["Close Control Defense", "Channel Pressure"]
  },
  {
    id: "pressure-tackle-drill",
    name: "Pressure to Tackle Drill",
    drillName: "Pressure to Tackle Drill",
    duration: "12",
    ageGroup: "u16",
    trainingFocus: "defensive",
    playerCount: "6",
    physicalIntensity: "medium",
    notes: "Defender applies pressure after 2 touches by attacker. Works on reading heavy touch, clean tackling, and timing.",
    trainingStyle: "defending",
    tags: ["Tackling Technique", "Reading Touch", "Clean Execution"]
  },
  {
    id: "zone-entry-challenge",
    name: "Zone Entry Challenge",
    drillName: "Zone Entry Challenge",
    duration: "15",
    ageGroup: "u15",
    trainingFocus: "defensive",
    playerCount: "6",
    physicalIntensity: "medium",
    notes: "Attacker starts in safe zone, must enter scoring zone. Defender can only tackle in that zone. Helps defenders time entry and avoid fouls.",
    trainingStyle: "defending",
    tags: ["Defensive Patience", "Controlled Aggression"]
  },
  {
    id: "delay-double-drill",
    name: "Delay & Double Drill (1v1 to 2v1)",
    drillName: "Delay & Double Drill (1v1 to 2v1)",
    duration: "15",
    ageGroup: "u16",
    trainingFocus: "defensive",
    playerCount: "6",
    physicalIntensity: "medium",
    notes: "1v1 duel where second defender enters after 3 seconds. First defender must delay without diving in — simulates real in-game help moments.",
    trainingStyle: "defending",
    tags: ["Stall Until Support", "Delay Principles"]
  },
  {
    id: "gate-pressure-finish",
    name: "Gate Pressure Finish",
    drillName: "Gate Pressure Finish",
    duration: "10",
    ageGroup: "u14",
    trainingFocus: "defensive",
    playerCount: "4",
    physicalIntensity: "medium",
    notes: "Attacker tries to dribble through one of two gates. Defender must read intention, position body correctly, and block route. Forces reading cues and quick decisions.",
    trainingStyle: "defending",
    tags: ["Compact Defending", "Directional Pressure"]
  }
];
