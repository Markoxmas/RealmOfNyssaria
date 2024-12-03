import { Hero } from "../../heroes/heroesSlice";
import { Battle } from "../battleSlice";

export default function isHeroInBattle(battles: Battle[], heroId: string) {
  const allHeroesInBattle: Hero[] = [];
  battles.forEach((battle) => {
    if (battle.battleMilestones.length > 0) {
      allHeroesInBattle.push(
        ...battle.battleMilestones[battle.battleMilestones.length - 1].heroes
      );
    }
  });
  return allHeroesInBattle.some((battleHero) => battleHero._id === heroId);
}
