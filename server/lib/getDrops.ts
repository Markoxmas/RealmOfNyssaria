import { BattleMilestone } from "../models/Battle";
import { calculateBattleDamage } from "./calculateBattleDamage";
import { calculateBattleKills } from "./calculateBattleKills";
import { serverConfig } from "../serverConfig";

export const getDrops = (battleMilestones: BattleMilestone[]) => {
  const damageDone = calculateBattleDamage(battleMilestones);
  const kills = calculateBattleKills(
    battleMilestones[0].monster_hp,
    damageDone
  );

  const drops = {
    scroll_of_summon: 0,
    gold: 0,
  };
  for (let i = 0; i < kills; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    if (randomNum <= serverConfig.drops.scroll_of_summon_drop_rate) {
      drops.scroll_of_summon++;
    }
  }
  drops.gold += Math.floor(damageDone * serverConfig.drops.gold_multiplier);

  return drops;
};
