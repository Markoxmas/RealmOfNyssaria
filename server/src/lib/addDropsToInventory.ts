import { IInventory } from "../models/Inventory";
import { Drop } from "../types/Drops";
import { Currency, ItemType, Stackable } from "../types/itemSystem/itemSystem";

export default function addDropsToInventory(
  inventory: IInventory,
  drops: Drop[]
) {
  const newInventory = { ...inventory };

  const equipmentAndUnstackables = drops.filter(
    (drop) =>
      drop.type === ItemType.EQUIPMENT || drop.type === ItemType.UNSTACKABLE
  );
  newInventory.items = [...inventory.items, ...equipmentAndUnstackables];

  const stackablesAndCurrency = drops.filter(
    (drop) =>
      drop.type === ItemType.STACKABLE || drop.type === ItemType.CURRENCY
  ) as Array<Stackable | Currency>;
  stackablesAndCurrency.forEach((drop) => {
    const existingDrop = newInventory.items.find(
      (item) => item.registryId === drop.registryId
    ) as Stackable | Currency;
    if (existingDrop) {
      existingDrop.quantity += drop.quantity;
    } else {
      newInventory.items.push(drop);
    }
  });

  return newInventory;
}
