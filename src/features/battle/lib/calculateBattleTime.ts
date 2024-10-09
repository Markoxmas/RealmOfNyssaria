import { Battle } from "../battleSlice";

export default function calculateBattleTime(battle: Battle) {
  console.log("Marko", battle);
  if (battle.battleMilestones.length === 0) {
    return 0;
  } else {
    // Returns time in milliseconds
    console.log(
      "I am inside",
      Date.now() - battle.battleMilestones[0].startTime
    );
    return Date.now() - battle.battleMilestones[0].startTime;
  }
}
