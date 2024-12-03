import { Battle } from "../battleSlice";
import getHeroesFromBattle from "./getHeroesFromBattle";

export default function getHeroBattleId(battles: Battle[], heroId: string) {
  let battleId = null;

  battles.forEach((battle) => {
    const heroesInBattle = getHeroesFromBattle(battle);
    if (heroesInBattle.some((hero) => hero._id === heroId)) {
      battleId = battle._id;
    }
  });

  return battleId;
}
