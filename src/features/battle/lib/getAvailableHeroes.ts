import { Hero } from "../../heroes/heroesSlice";
import { Battle } from "../battleSlice";
import getHeroesInBattle from "./getHeroesInBattle";

// Gets all the heroes that are not in battle
export default function getAvailableHeroes(heroes: Hero[], battles: Battle[]) {
  const heroesInBattle = getHeroesInBattle(battles);
  const heroesOutsideBattle = heroes.filter(
    (hero) => !heroesInBattle.some((battleHero) => battleHero._id === hero._id)
  );

  return heroesOutsideBattle;
}
