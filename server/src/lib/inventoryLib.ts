import { IInventory } from "../models/Inventory";
import { Currency, Stackable } from "../types/itemSystem/itemSystem";

export const inventoryLib = {
  hasSufficientGold: (inventory: IInventory, cost: number) => {
    const gold = inventory.items.find(
      (item) => item.registryId === "gold"
    ) as Currency;
    if (gold) {
      return gold.quantity >= cost;
    } else {
      return false;
    }
  },
  hasSufficientScrollsOfSummon: (inventory: IInventory, cost: number) => {
    const scrolls = inventory.items.find(
      (item) => item.registryId === "scroll-of-summon"
    ) as Stackable;
    if (scrolls) {
      return scrolls.quantity >= cost;
    } else {
      return false;
    }
  },
};
