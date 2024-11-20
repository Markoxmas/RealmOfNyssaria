import { BattleMilestone } from "../models/Battle";
import { serverConfig } from "../serverConfig";
import { calculateBattleDamage } from "./calculateBattleDamage";

export const calculateMonsterHp = (battleMilestones: BattleMilestone[]) => {
  const { max_monster_hp } = serverConfig.battle;
  const damageDone = calculateBattleDamage(battleMilestones);
  const firstMilestone = battleMilestones[0];
  return Math.abs((firstMilestone.monster_hp - damageDone) % max_monster_hp);
};
