import { Battle } from "../../battle/battleSlice";
import getAvailableHeroes from "../../battle/lib/getAvailableHeroes";
import { Hero } from "../../heroes/heroesSlice";
import { UpgradeState } from "../upgradeSlice";

export default function getAvailableHeroesForSacrifice(
  heroes: Hero[],
  battle: Battle,
  upgrade: UpgradeState
) {
  const modalHeroes = upgrade.upgradeInfo.sacrifices[upgrade.starUpModalSlot]
    ?.same
    ? getAvailableHeroes(heroes, battle).filter(
        (hero) =>
          upgrade.hero?.name === hero.name &&
          hero.stars ===
            upgrade.upgradeInfo.sacrifices[upgrade.starUpModalSlot]?.stars
      )
    : getAvailableHeroes(heroes, battle).filter(
        (hero) =>
          hero.stars ===
          upgrade.upgradeInfo.sacrifices[upgrade.starUpModalSlot]?.stars
      );

  const chosenHeroIds = upgrade.chosenSacrifices[upgrade.starUpModalSlot]
    ?.map((hero) => hero._id)
    .concat(upgrade.hero ? [upgrade.hero._id] : []);

  return modalHeroes.filter((hero) => !chosenHeroIds.includes(hero._id));
}
