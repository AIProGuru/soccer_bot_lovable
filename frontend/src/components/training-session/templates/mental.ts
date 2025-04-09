
import { SessionTemplate } from './types';

export const mentalTemplates: SessionTemplate[] = [
  {
    id: "gauntlet-consequence",
    name: "1v1 Gauntlet With Losing Consequence",
    drillName: "1v1 Gauntlet With Losing Consequence",
    duration: "10",
    ageGroup: "u16",
    trainingFocus: "mental",
    playerCount: "8",
    physicalIntensity: "medium",
    notes: "Loser of each 1v1 moves to a new station with tougher odds (2v1, smaller goal, etc.). Encourages mental reset and bounce-back behavior.",
    trainingStyle: "mental",
    tags: ["1v1", "Pressure", "Fight Mentality", "Bounce Back"]
  },
  {
    id: "fatigue-press-rondo",
    name: "Fatigue Press Rondo",
    drillName: "Fatigue Press Rondo",
    duration: "12",
    ageGroup: "u17",
    trainingFocus: "mental",
    playerCount: "8",
    physicalIntensity: "high",
    notes: "Rondo with 2 pressers who rotate every 60 seconds. Defenders must handle mental pressure of failing in front of team.",
    trainingStyle: "mental",
    tags: ["High Tempo", "Decision-Making", "Emotional Control"]
  },
  {
    id: "chaos-transition-grid",
    name: "Chaos Transition Grid",
    drillName: "Chaos Transition Grid",
    duration: "15",
    ageGroup: "u18",
    trainingFocus: "mental",
    playerCount: "12",
    physicalIntensity: "medium",
    notes: "3 teams in different zones. Coach calls out sudden changes: switch ball, double goals, or add neutral. Forces mental switching.",
    trainingStyle: "mental",
    tags: ["Switching Roles", "Cognitive Load", "Chaos Management"]
  },
  {
    id: "no-mistakes-passing",
    name: "No Mistakes Passing Ladder",
    drillName: "No Mistakes Passing Ladder",
    duration: "10",
    ageGroup: "u15",
    trainingFocus: "mental",
    playerCount: "6",
    physicalIntensity: "low",
    notes: "Players must complete 10 passes in sequence. A single mistake = restart. Builds calm and control under mental tension.",
    trainingStyle: "mental",
    tags: ["Precision Passing", "High Stakes", "Focus Training"]
  },
  {
    id: "pressure-shootout",
    name: "Pressure Shootout With Mind Games",
    drillName: "Pressure Shootout With Mind Games",
    duration: "15",
    ageGroup: "u16",
    trainingFocus: "mental",
    playerCount: "12",
    physicalIntensity: "low",
    notes: "Players shoot while teammates shout, distract, or simulate crowd noise. Builds isolation focus and execution skill.",
    trainingStyle: "mental",
    tags: ["Penalty Pressure", "Distractions", "Mind Focus"]
  },
  {
    id: "tight-zone-time-cap",
    name: "3v3 in Tight Zone With Time Cap",
    drillName: "3v3 in Tight Zone With Time Cap",
    duration: "12",
    ageGroup: "u16",
    trainingFocus: "mental",
    playerCount: "6",
    physicalIntensity: "high",
    notes: "Teams play 30-second rounds in a 12x12m box. Constant mental resets, rapid decisions, and competitive grind.",
    trainingStyle: "mental",
    tags: ["Claustrophobic Scenario", "Fast Thinking", "Mental Reset"]
  },
  {
    id: "red-zone-decision",
    name: "Red Zone Decision Drill",
    drillName: "Red Zone Decision Drill",
    duration: "15",
    ageGroup: "u17",
    trainingFocus: "mental",
    playerCount: "10",
    physicalIntensity: "medium",
    notes: "Players complete sequences with timed decisions (pass, shoot, hold). Wrong choice = sprint or reset. Increases accountability.",
    trainingStyle: "mental",
    tags: ["Mistake Punishment", "Cognitive Pressure", "Resilience"]
  },
  {
    id: "double-ball-scramble",
    name: "Double Ball Scramble",
    drillName: "Double Ball Scramble",
    duration: "15",
    ageGroup: "u18",
    trainingFocus: "mental",
    playerCount: "16",
    physicalIntensity: "high",
    notes: "2 balls in play. Coach can call \"freeze,\" \"switch ball,\" or \"add player.\" Challenges players to manage chaos and adapt quickly.",
    trainingStyle: "mental",
    tags: ["Dual Ball Management", "Mental Split", "Scanning"]
  }
];
