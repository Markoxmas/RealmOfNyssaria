import { Hero } from "../../heroes/heroesSlice";
import { Battle } from "../battleSlice";

// Gets all the heroes that are not in battle
export default function getAvailableHeroes(heroes: Hero[], battle: Battle) {
  const heroesInBattle =
    battle && battle.battleMilestones.length > 0
      ? battle.battleMilestones[battle.battleMilestones.length - 1].heroes
      : [];
  const heroesOutsideBattle = heroes.filter(
    (hero) => !heroesInBattle.some((battleHero) => battleHero._id === hero._id)
  );

  return heroesOutsideBattle;
}
