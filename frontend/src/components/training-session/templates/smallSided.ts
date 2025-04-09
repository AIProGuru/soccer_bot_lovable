
import { SessionTemplate } from './types';

export const smallSidedTemplates: SessionTemplate[] = [
  {
    id: "compact-pressure-zone",
    name: "5v5 Compact Pressure Zone",
    drillName: "5v5 Compact Pressure Zone",
    duration: "18",
    ageGroup: "u16",
    trainingFocus: "pressing",
    playerCount: "10",
    physicalIntensity: "high",
    notes: "Two teams play in a tight space (30x25m). One team presses aggressively in numbers, forcing play wide or into traps. Switch roles every 4 min.",
    trainingStyle: "smallSided",
    tags: ["High Press", "Decision-Making", "Compactness"]
  },
  {
    id: "transition-game",
    name: "4v4+3 Transition Game",
    drillName: "4v4+3 Transition Game",
    duration: "20",
    ageGroup: "u16",
    trainingFocus: "transition",
    playerCount: "11",
    physicalIntensity: "high",
    notes: "4v4 in central zone, 3 neutrals outside. Immediate transition when ball is won — focus on exploiting overloads fast. Ideal for midfield decision speed.",
    trainingStyle: "smallSided",
    tags: ["Transition", "Overload", "Support Play"]
  },
  {
    id: "channel-game",
    name: "6v6 Channel Game",
    drillName: "6v6 Channel Game",
    duration: "25",
    ageGroup: "u17",
    trainingFocus: "attacking",
    playerCount: "12",
    physicalIntensity: "medium",
    notes: "Pitch split into 3 vertical channels. Teams score by progressing through each channel. Encourages fast, direct movement through zones.",
    trainingStyle: "smallSided",
    tags: ["Verticality", "Wide Play", "Direct Play"]
  },
  {
    id: "finishing-grid",
    name: "5v5 + Goalkeepers Finishing Grid",
    drillName: "5v5 + Goalkeepers Finishing Grid",
    duration: "22",
    ageGroup: "u15",
    trainingFocus: "attacking",
    playerCount: "12",
    physicalIntensity: "high",
    notes: "Normal 5v5 but goals only count from inside final third. Teams must find ways to penetrate and finish under time pressure. GK distribution triggers counters.",
    trainingStyle: "smallSided",
    tags: ["Attacking", "Defending", "Finishing"]
  },
  {
    id: "rotating-possession",
    name: "3v3v3 Rotating Possession Game",
    drillName: "3v3v3 Rotating Possession Game",
    duration: "15",
    ageGroup: "u14",
    trainingFocus: "possession",
    playerCount: "9",
    physicalIntensity: "high",
    notes: "One team defends in the middle while two outer teams try to keep possession. If defenders win, they replace the losing team. High work rate.",
    trainingStyle: "smallSided",
    tags: ["Ball Retention", "Pressing Triggers", "Compactness"]
  },
  {
    id: "tactical-shape",
    name: "7v7 Tactical Shape Game",
    drillName: "7v7 Tactical Shape Game",
    duration: "25",
    ageGroup: "u19",
    trainingFocus: "defensive",
    playerCount: "14",
    physicalIntensity: "medium",
    notes: "Full-width pitch but short length. Focus on collective team shape, defensive compactness, and switching the point of attack. Coach transitions and cover.",
    trainingStyle: "smallSided",
    tags: ["Team Shape", "Compact Defending", "Switch of Play"]
  },
  {
    id: "breakout-game",
    name: "4v4 Breakout Game",
    drillName: "4v4 Breakout Game",
    duration: "18",
    ageGroup: "u16",
    trainingFocus: "pressResistance",
    playerCount: "8",
    physicalIntensity: "high",
    notes: "Two small goals at each end. Score only by breaking opponent's line and finishing within 5 seconds. Fast-paced and encourages vertical breakouts.",
    trainingStyle: "smallSided",
    tags: ["Press Resistance", "First Touch", "Quick Play"]
  },
  {
    id: "wide-channel-ssg",
    name: "6v6 Wide Channel SSG",
    drillName: "6v6 Wide Channel SSG",
    duration: "20",
    ageGroup: "u17",
    trainingFocus: "attacking",
    playerCount: "12",
    physicalIntensity: "medium",
    notes: "Wide channels allow only outside backs or wingers. Score only if ball enters from wide into central zone. Trains structured wide play + final third entry.",
    trainingStyle: "smallSided",
    tags: ["Exploiting Width", "Crossing", "Compact Defending"]
  }
];
