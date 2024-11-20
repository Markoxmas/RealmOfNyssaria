import { BattleMilestone } from "../models/Battle";

export const calculateBattleDamage = (battleMilestones: BattleMilestone[]) => {
  const battleMilestoneCount = battleMilestones.length;
  const milestones = battleMilestones;
  let damageDone = 0;
  for (let i = 0; i < battleMilestoneCount; i++) {
    if (i === battleMilestoneCount - 1) {
      damageDone +=
        Math.floor((Date.now() - milestones[i].start_time) / 1000) *
        milestones[i].collective_cp;
    } else {
      damageDone +=
        Math.floor(
          (milestones[i + 1].start_time - milestones[i].start_time) / 1000
        ) * milestones[i].collective_cp;
    }
  }
  return damageDone;
};
