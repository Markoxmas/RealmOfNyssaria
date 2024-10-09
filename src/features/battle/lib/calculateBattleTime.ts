import { Battle } from "../battleSlice";

export default function calculateBattleTime(battle: Battle) {
  if (battle.battleMilestones.length === 0) {
    return 0;
  } else {
    // Returns time in milliseconds
    return Date.now() - battle.battleMilestones[0].start_time;
  }
}
