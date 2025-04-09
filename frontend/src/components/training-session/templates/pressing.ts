
import { SessionTemplate } from './types';

export const pressingTemplates: SessionTemplate[] = [
  {
    id: "defensive-pressing-triggers",
    name: "Defensive Pressing Triggers",
    drillName: "Defensive Pressing Triggers",
    duration: "20",
    ageGroup: "u16",
    trainingFocus: "defensive",
    playerCount: "12",
    physicalIntensity: "high",
    notes: "Teams practice identifying and responding to pressing triggers as a unit. Focus on collective defensive actions.",
    trainingStyle: "pressing",
    tags: ["Pressing", "Defensive", "Shape", "Reaction", "Transition"]
  },
  {
    id: "counter-press-to-finish",
    name: "Counter-Press to Finish",
    drillName: "Counter-Press to Finish",
    duration: "22",
    ageGroup: "u16",
    trainingFocus: "pressing",
    playerCount: "10",
    physicalIntensity: "high",
    notes: "Teams immediately press after losing possession to win the ball back and create scoring opportunities.",
    trainingStyle: "pressing",
    tags: ["Transition", "Pressing", "Finishing", "Game Simulation"]
  }
];
