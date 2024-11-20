import { serverConfig } from "../serverConfig";

export const calculateBattleKills = (
  startMonsterHp: number,
  damageDone: number
) => {
  const fullKills = Math.floor(damageDone / serverConfig.battle.max_monster_hp);
  const partialKills =
    damageDone % serverConfig.battle.max_monster_hp > startMonsterHp ? 1 : 0;
  return fullKills + partialKills;
};
