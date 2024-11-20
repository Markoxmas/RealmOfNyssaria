import { IHero } from "../models/Hero";
import { serverConfig } from "../serverConfig";

export const calculateLevelUpCost = (hero: IHero, amount: number) => {
  const { level_up_base, level_up_multiplier } = serverConfig.upgrade;
  let cost = 0;
  for (let i = 0; i < amount; i++) {
    cost += level_up_base * Math.pow(level_up_multiplier, hero.level - 1 + i);
  }
  return Math.floor(cost);
};
