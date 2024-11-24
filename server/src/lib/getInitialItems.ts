import {
  Currency,
  CurrencyRegistryItem,
  Equipment,
  EquipmentRegistryItem,
  Stackable,
  StackableRegistryItem,
  Unstackable,
  UnstackableRegistryItem,
} from "../types/itemSystem/itemSystem";
import { itemCreator } from "./itemCreator";
import { itemRegistry } from "../itemRegistry";

type AnyRegistryItem =
  | EquipmentRegistryItem
  | StackableRegistryItem
  | UnstackableRegistryItem
  | CurrencyRegistryItem;

export const getInitialItems = (): Array<
  Equipment | Stackable | Unstackable | Currency
> => {
  return [
    itemCreator.createEquipment(
      itemRegistry.find(
        (item: AnyRegistryItem) => item.registryId === "test-weapon"
      ) as Equipment
    ),
    itemCreator.createStackable(
      itemRegistry.find(
        (item: AnyRegistryItem) => item.registryId === "scroll-of-summon"
      ) as Stackable,
      1000
    ),
    itemCreator.createUnstackable(
      itemRegistry.find(
        (item: AnyRegistryItem) => item.registryId === "rock"
      ) as Unstackable
    ),
    itemCreator.createCurrency(
      itemRegistry.find(
        (item: AnyRegistryItem) => item.registryId === "gold"
      ) as Currency,
      100000
    ),
  ];
};
