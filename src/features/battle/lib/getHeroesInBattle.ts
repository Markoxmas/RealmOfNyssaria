import { Battle } from "../battleSlice";

export default function getHeroesInBattle(battles: Battle[]) {
  return battles.flatMap((battle) => {
    return battle.battleMilestones.length > 0
      ? battle.battleMilestones[battle.battleMilestones.length - 1].heroes
      : [];
  });
}
