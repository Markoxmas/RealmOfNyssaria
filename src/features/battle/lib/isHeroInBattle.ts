import { Battle } from "../battleSlice";

export default function isHeroInBattle(battle: Battle, heroId: string) {
  const heroesInBattle =
    battle && battle.battleMilestones.length > 0
      ? battle.battleMilestones[battle.battleMilestones.length - 1].heroes
      : [];
  return heroesInBattle.some((battleHero) => battleHero._id === heroId);
}
