import { Hero } from "../../heroes/heroesSlice";
import { Battle } from "../battleSlice";

export default function getModalBattleHeroes(heroes: Hero[], battle: Battle) {
  return battle && battle.battleMilestones.length > 0
    ? battle.battleMilestones[battle.battleMilestones.length - 1].heroes
    : [];
}
