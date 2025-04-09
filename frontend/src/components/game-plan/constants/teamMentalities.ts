
/**
 * Team mentality options for match approach
 */
export interface TeamMentality {
  name: string;
  description: string;
  goal: string;
  mentality_instructions?: string;
}

export const TEAM_MENTALITIES: Record<string, TeamMentality> = {
  "park-the-bus": {
    name: "Park the Bus (Defensive)",
    description: "Focuses on defending with as many players as possible behind the ball, with a compact defensive shape to prevent the opposition from scoring.",
    goal: "Protect a lead or secure a draw against stronger opponents with strong defensive organization.",
    mentality_instructions: `🧠 Mental Instructions – "Park the Bus" Mentality

🛡️ Core Mindset:
	•	"Defend with your life. Every block, every clearance counts."
	•	"You don't need to win the ball, just stop them from scoring."
	•	"Keep your shape—no unnecessary pressing."

⸻

🧱 Defensive Discipline:
	•	"Maintain compact lines. No one breaks formation."
	•	"Prioritize positioning over pressing."
	•	"Don't get drawn out—force them wide, not through the middle."

⸻

💬 Communication:
	•	"Constant talking: organize, alert each other, pass on runners."
	•	"The back line leads the defense. Everyone listens and follows."

⸻

🧠 Emotional Control:
	•	"Be calm under pressure. Expect waves of attack."
	•	"Don't panic with the ball—clear when in doubt."

⸻

🧨 Situational Triggers:
	•	"Shift as one. When the ball moves, the unit moves."
	•	"Full-backs stay home unless the ball is 100% cleared."
	•	"No risks in your own third—safety first."

⸻

🪖 Attacking Mentality (Minimal):
	•	"Use counter-attacks only when the opportunity is clear."
	•	"One striker stays high—everyone else defends."`
  },
  "underdog": {
    name: "Underdog (Nothing to Lose)",
    description: "Encourages risk-taking and high effort, especially when facing stronger opponents.",
    goal: "Play with freedom and capitalize on unexpected chances.",
    mentality_instructions: `1. Discipline Over Emotion

🔒 "You do not chase. You do not press unless it's a trap. You hold your line."
• Players are trained to suppress their natural instinct to press or break shape.
• The mentality is: discipline > aggression.

⸻

2. Patience Is Power

🧠 "Let them have the ball. We defend zones. We don't panic."
• Coaches emphasize: not reacting emotionally to sustained pressure.
• Mental state: calm, focused, organized — even under constant attack.

⸻

3. Collective Sacrifice

🫂 "It's not about your ego — it's about the team surviving the storm."
• Attackers are expected to track back 100%, even if they rarely touch the ball.
• Everyone must be mentally willing to suffer for the team.

⸻

4. Trust the Block

🧱 "Stay in shape. Trust the system. Trust your teammates."
• Mental discipline to stay compact and not break lines — even when isolated.
• Players are drilled to trust spacing and compactness over chasing.

⸻

5. Focus for 90+ Minutes

🕓 "One lapse = one goal. Concentration must be 100% — always."
• Players are reminded that mental fatigue is the enemy.
• They train to stay sharp without the ball, with a laser-like defensive focus.

⸻

6. Attack with Intelligence (Not Emotion)

⚡ "When we counter — we go with a killer instinct."
• Even with a defensive mindset, coaches drill players to switch mentally into fast, decisive mode on counters.
• The instruction: defend like a wall, strike like a knife.

⸻

🧠 Example Mentality Instructions from Mourinho / Simeone:
• "Compactness is our confidence."
• "Let them play where it doesn't hurt."
• "We don't press — we predict."
• "You defend the badge. You defend with your life."
• "1 point is better than none. We fight for every second."`
  },
  "counter": {
    name: "Counter-Attacking",
    description: "Involves defending deep and transitioning quickly to exploit spaces behind the opponent when possession is regained.",
    goal: "Catch opponents off-guard with quick, direct attacks.",
    mentality_instructions: `⚡ Mental Instructions – Counter-Attack Mentality

🧠 Core Mindset:
	•	"Defend first, punish later."
	•	"Every interception is an opportunity to strike."
	•	"Stay patient—wait for the right moment to break."

⸻

🧱 Defensive Focus:
	•	"Compact and disciplined—no unnecessary pressing."
	•	"Keep shape at all times. We strike when they overcommit."
	•	"Delay the opponent's attack, don't dive in."

⸻

🚀 Transition Triggers:
	•	"As soon as we win it, go vertical and fast."
	•	"Look for wide runners and diagonal outlets immediately."
	•	"Exploit their full-backs—they'll be high and exposed."

⸻

🗣️ Communication:
	•	"Call for the outlet. Help the ball carrier make the decision."
	•	"Defenders: alert the midfield for second balls and rebounds."

⸻

💡 Attacking Mentality:
	•	"Few touches. Fast decisions. Direct play."
	•	"Forward players: stay alert, stay wide, stretch the pitch."
	•	"Every break should end in a shot or a set-piece."

⸻

💪 Psychological Edge:
	•	"Absorb the pressure—they'll get frustrated."
	•	"Our moment will come—be clinical when it does."`
  },
  "balanced": {
    name: "Balanced",
    description: "Offers a mix of offensive and defensive approaches, allowing the team to adapt to different phases of the game without overcommitting.",
    goal: "Maintain control while staying prepared to attack or defend as needed.",
    mentality_instructions: `⚖️ Mental Instructions – Balanced Mentality

🧠 Core Mindset:
	•	"Adapt to the flow—control when needed, attack when it opens."
	•	"Balance between risk and safety—read the game."
	•	"Stay calm under pressure, but be ready to switch gears."

⸻

🔁 Decision-Making:
	•	"Recognize moments to press, hold, or push forward."
	•	"Don't force the game—create chances with patience or pace."
	•	"When we're under pressure: recycle, reset, reorganize."

⸻

🧱 Defensive Responsibility:
	•	"Everyone defends as a unit."
	•	"Midfield: always scan and cover second balls."
	•	"Full-backs: balance between support and security."

⸻

⚔️ Attacking Balance:
	•	"Play what the game gives—don't rush decisions."
	•	"Combine short build-up with long switches to stretch."
	•	"Look for overloads but stay protected behind the ball."

⸻

🔊 Communication & Leadership:
	•	"Talk constantly—especially during transitions."
	•	"Leaders: manage the rhythm and keep focus high."

⸻

💪 Psychological Approach:
	•	"Confidence in our system—don't panic if the game changes."
	•	"Stay composed after setbacks—trust your teammates."
	•	"We don't chase the game—we shape it."`
  },
  "attacking": {
    name: "Attacking",
    description: "Focuses on aggressive, forward-thinking play with an emphasis on creating scoring opportunities and pressuring the opponent's defense.",
    goal: "Score early and dominate the attacking phase.",
    mentality_instructions: `🏃 Mental Instructions – Attacking Mentality

🧠 Core Mindset:
	•	"Adapt to the flow—control when needed, attack when it opens."
	•	"Balance between risk and safety—read the game."
	•	"Stay calm under pressure, but be ready to switch gears."

⸻

🔁 Decision-Making:
	•	"Recognize moments to press, hold, or push forward."
	•	"Don't force the game—create chances with patience or pace."
	•	"When we're under pressure: recycle, reset, reorganize."

⸻

🧱 Defensive Responsibility:
	•	"Everyone defends as a unit."
	•	"Midfield: always scan and cover second balls."
	•	"Full-backs: balance between support and security."

⸻

⚔️ Attacking Balance:
	•	"Play what the game gives—don't rush decisions."
	•	"Combine short build-up with long switches to stretch."
	•	"Look for overloads but stay protected behind the ball."

⸻

🔊 Communication & Leadership:
	•	"Talk constantly—especially during transitions."
	•	"Leaders: manage the rhythm and keep focus high."

⸻

💪 Psychological Approach:
	•	"Confidence in our system—don't panic if the game changes."
	•	"Stay composed after setbacks—trust your teammates."
	•	"We don't chase the game—we shape it."`
  },
  "all-out-attack": {
    name: "All-Out Attack",
    description: "Commits players forward aggressively, often sacrificing defensive solidity for the sake of scoring, typically used when chasing a result late in the game.",
    goal: "Maximize scoring opportunities at all costs.",
    mentality_instructions: `🧠 Core Mindset:
	•	"Forget fear. This is do or die."
	•	"Every player must think forward. Goals are the only objective."
	•	"We are throwing everything at them. No holding back."

⸻

⚔️ Offensive Urgency:
	•	"Take shots on sight—no hesitation."
	•	"Midfielders and defenders: step up, support the attack."
	•	"Wingers: isolate and drive. Deliver early and often."

⸻

🪖 Positional Commitment:
	•	"Push center backs into midfield if needed—overload the pitch."
	•	"Full-backs: act as wingers. Defend only if absolutely necessary."
	•	"Flood the box—create chaos and capitalize on second balls."

⸻

🛡 Defensive Risk:
	•	"Accept the risk of counterattacks—defense is minimal."
	•	"One defender stays—everyone else joins the final third."
	•	"Keeper: ready to sweep and distribute quickly."

⸻

🗣 Communication & Urgency:
	•	"Yell time, yell space, yell support—no silence."
	•	"Demand constant movement—no one stands still."

⸻

💥 Psychological Edge:
	•	"The opponent will panic—keep pressing until they break."
	•	"Every cross, every touch, every duel counts—treat it like the winner."
	•	"Believe it's possible—even in the last second."`
  }
};
