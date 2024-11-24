import {
  EquipmentRegistryItem,
  StackableRegistryItem,
  UnstackableRegistryItem,
  CurrencyRegistryItem,
  EquipmentSlot,
  EquipmentRarity,
  ItemType,
} from "./types/itemSystem/itemSystem";

export const itemEquipmentRegistry: Array<EquipmentRegistryItem> = [
  {
    registryId: "test-weapon",
    type: ItemType.EQUIPMENT,
    name: "Test Weapon",
    icon: "test_weapon",
    slot: EquipmentSlot.MAIN_WEAPON,
    base: {
      atk: 100,
      sta: 153,
      str: 113,
      critDamage: 20,
    },
    rarity: EquipmentRarity.EPIC,
    level: 20,
  },
];

export const itemStackableRegistry: Array<StackableRegistryItem> = [
  {
    registryId: "scroll-of-summon",
    type: ItemType.STACKABLE,
    name: "Scroll of Summon",
    icon: "scroll_of_summon",
    description: "A scroll that can be used to summon a hero.",
  },
];

export const itemUnstackableRegistry: Array<UnstackableRegistryItem> = [
  {
    registryId: "rock",
    type: ItemType.UNSTACKABLE,
    name: "Rock",
    icon: "rock",
    description: "Just a rock.",
  },
];

export const itemCurrencyLibrary: Array<CurrencyRegistryItem> = [
  {
    registryId: "gold",
    type: ItemType.CURRENCY,
    name: "Gold",
    icon: "gold",
    description: "A currency used to buy items.",
  },
];

export const itemRegistry: Array<
  | EquipmentRegistryItem
  | StackableRegistryItem
  | UnstackableRegistryItem
  | CurrencyRegistryItem
> = [
  ...itemEquipmentRegistry,
  ...itemStackableRegistry,
  ...itemUnstackableRegistry,
  ...itemCurrencyLibrary,
];
