import { DropRolls } from "../types/Drops";
import { itemRegistry } from "../itemRegistry";
import { itemCreator } from "./itemCreator";
import {
  EquipmentRegistryItem,
  StackableRegistryItem,
  UnstackableRegistryItem,
  CurrencyRegistryItem,
  ItemType,
  Equipment,
  Stackable,
  Unstackable,
  Currency,
} from "../types/itemSystem/itemSystem";

export const getDrops = (battleKills: number, dropRolls: DropRolls) => {
  const drops: Array<Equipment | Stackable | Unstackable | Currency> = [];

  for (let rollRound = 0; rollRound < battleKills; rollRound++) {
    dropRolls.forEach((roll) => {
      if (Math.random() <= roll.dropRate) {
        const itemEssence = itemRegistry.find(
          (item) => item.registryId === roll.registryId
        );

        if (itemEssence) {
          switch (itemEssence.type) {
            case ItemType.EQUIPMENT:
              drops.push(
                itemCreator.createEquipment(
                  itemEssence as EquipmentRegistryItem
                )
              );
              break;
            case ItemType.STACKABLE:
              if (drops.some((drop) => drop.registryId === roll.registryId)) {
                const drop = drops.find(
                  (drop) => drop.registryId === roll.registryId
                ) as Stackable;
                drop.quantity += roll.quantity;
              } else {
                drops.push(
                  itemCreator.createStackable(
                    itemEssence as StackableRegistryItem,
                    roll.quantity
                  )
                );
              }
              break;
            case ItemType.UNSTACKABLE:
              drops.push(
                itemCreator.createUnstackable(
                  itemEssence as UnstackableRegistryItem
                )
              );
              break;
            case ItemType.CURRENCY:
              if (drops.some((drop) => drop.registryId === roll.registryId)) {
                const drop = drops.find(
                  (drop) => drop.registryId === roll.registryId
                ) as Currency;
                drop.quantity += roll.quantity;
              } else {
                drops.push(
                  itemCreator.createCurrency(
                    itemEssence as CurrencyRegistryItem,
                    roll.quantity
                  )
                );
              }
              break;
          }
        }
      }
    });
  }

  return drops;
};
