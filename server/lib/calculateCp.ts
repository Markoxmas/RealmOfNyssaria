import { serverConfig } from "../serverConfig";
import { HeroData } from "../types/HeroData";

export const calculateCp = (hero: HeroData) => {
  const { cp_multiplier, cp_base, star_multiplier } = serverConfig.cp;
  return Math.floor(
    cp_base *
      Math.pow(cp_multiplier, hero.level - 1) *
      (1 + star_multiplier * hero.stars)
  );
};
