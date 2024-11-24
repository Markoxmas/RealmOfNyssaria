import { Hero } from "../../heroes/heroesSlice";
import { Currency } from "../../inventory/types/itemSystem";
import { UpgradeInfo } from "../upgradeSlice";

export default function maxLevelUpAmount(
  hero: Hero | null,
  gold: Currency,
  upgradeInfo: UpgradeInfo
) {
  if (hero === null) {
    return;
  }

  let requiredGold = {
    one: 0,
    ten: 0,
    max: 0,
  };
  let finalLevelUpAmount = 0;
  const maxLevelUpAmount = upgradeInfo.maxLevel - hero.level;
  for (let i = 0; i < maxLevelUpAmount; i++) {
    requiredGold.max += Math.floor(
      upgradeInfo.levelUpBase *
        upgradeInfo.levelUpMultiplier ** (hero.level + i - 1)
    );
    if (requiredGold.max <= gold.quantity) {
      finalLevelUpAmount++;
      if (i === 0) {
        requiredGold.one = requiredGold.max;
      }
      if (i === 9) {
        requiredGold.ten = requiredGold.max;
      }
    } else {
      break;
    }
  }

  return {
    finalLevelUpAmount,
    requiredGold,
  };
}
