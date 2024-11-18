import { IInventory } from "../models/Inventory";

export const inventoryLib = {
  hasSufficientGold: (inventory: IInventory, cost: number) => {
    const gold = inventory.items.find((item) => item.id === 1);
    if (gold) {
      return gold.quantity >= cost;
    } else {
      return false;
    }
  },
  hasSufficientScrollsOfSummon: (inventory: IInventory, cost: number) => {
    const scrolls = inventory.items.find((item) => item.id === 2);
    if (scrolls) {
      return scrolls.quantity >= cost;
    } else {
      return false;
    }
  },
  addGold: (inventory: IInventory, amount: number) => {
    const newInventory = { ...inventory };
    newInventory.items = inventory.items.map((item) => {
      if (item.id === 1) {
        return {
          ...item,
          quantity: item.quantity + amount,
        };
      } else {
        return item;
      }
    });
    return newInventory;
  },
  addScrollsOfSummon: (inventory: IInventory, amount: number) => {
    const newInventory = { ...inventory };
    newInventory.items = inventory.items.map((item) => {
      if (item.id === 2) {
        return {
          ...item,
          quantity: item.quantity + amount,
        };
      } else {
        return item;
      }
    });
    return newInventory;
  },
};
