import {
  Currency,
  CurrencyRegistryItem,
  Equipment,
  EquipmentRegistryItem,
  ItemType,
  Stackable,
  StackableRegistryItem,
  Unstackable,
  UnstackableRegistryItem,
} from "../types/itemSystem/itemSystem";
import { v4 as uuidv4 } from "uuid";

export const itemCreator = {
  createEquipment: (registryItem: EquipmentRegistryItem): Equipment => {
    return {
      registryId: registryItem.registryId,
      id: uuidv4(),
      name: registryItem.name,
      icon: registryItem.icon,
      type: ItemType.EQUIPMENT,
      slot: registryItem.slot,
      base: registryItem.base,
      rarity: registryItem.rarity,
      level: registryItem.level,
    };
  },
  createStackable: (
    registryItem: StackableRegistryItem,
    amount: number
  ): Stackable => {
    return {
      registryId: registryItem.registryId,
      id: uuidv4(),
      name: registryItem.name,
      icon: registryItem.icon,
      type: ItemType.STACKABLE,
      quantity: amount,
      description: registryItem.description,
    };
  },
  createUnstackable: (registryItem: UnstackableRegistryItem): Unstackable => {
    return {
      registryId: registryItem.registryId,
      id: uuidv4(),
      name: registryItem.name,
      icon: registryItem.icon,
      type: ItemType.UNSTACKABLE,
      description: registryItem.description,
    };
  },
  createCurrency: (
    registryItem: CurrencyRegistryItem,
    amount: number
  ): Currency => {
    return {
      registryId: registryItem.registryId,
      id: uuidv4(),
      name: registryItem.name,
      icon: registryItem.icon,
      type: ItemType.CURRENCY,
      description: registryItem.description,
      quantity: amount,
    };
  },
};
