import { Hero } from "../../heroes/heroesSlice";

export default function getBattleSlots(
  heroesInBattle: Hero[]
): Array<Hero | null> {
  const totalSlots = 5;
  const emptySlots = totalSlots - heroesInBattle.length;

  if (!heroesInBattle) {
    return Array(totalSlots).fill(null);
  }

  return [...heroesInBattle, ...Array(emptySlots).fill(null)];
}
