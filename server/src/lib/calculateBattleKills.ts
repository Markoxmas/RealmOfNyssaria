import { BattleMilestone } from "../models/Battle";
import { serverConfig } from "../serverConfig";
import { calculateBattleDamage } from "./calculateBattleDamage";

export const calculateBattleKills = (battleMilestones: BattleMilestone[]) => {
  const damageDone = calculateBattleDamage(battleMilestones);
  const startMonsterHp = battleMilestones[0].monster_hp;
  const fullKills = Math.floor(damageDone / serverConfig.battle.max_monster_hp);
  const partialKills =
    damageDone % serverConfig.battle.max_monster_hp > startMonsterHp ? 1 : 0;
  return fullKills + partialKills;
};
