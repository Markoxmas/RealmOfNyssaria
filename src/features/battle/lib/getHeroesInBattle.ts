import { Battle } from "../battleSlice";

export default function getHeroesInBattle(battle: Battle) {
  return battle && battle.battleMilestones.length > 0
    ? battle.battleMilestones[battle.battleMilestones.length - 1].heroes
    : [];
}
