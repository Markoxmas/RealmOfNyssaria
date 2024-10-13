import { Hero } from "../../heroes/heroesSlice";
import { Battle } from "../battleSlice";

export default function getBattleSlots(heroesInBattle: Hero[]) {
  const totalSlots = 5;
  const emptySlots = totalSlots - heroesInBattle.length;

  if (!heroesInBattle) {
    return Array(totalSlots).fill(null);
  }

  return [...heroesInBattle, ...Array(emptySlots).fill(null)];
}
