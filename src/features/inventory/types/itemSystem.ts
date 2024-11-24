export enum ItemType {
  EQUIPMENT = "EQUIPMENT",
  STACKABLE = "STACKABLE",
  UNSTACKABLE = "UNSTACKABLE",
  CURRENCY = "CURRENCY",
}

export type Item = {
  registryId: string;
  id: string;
  name: string;
  icon: string;
  type: ItemType;
};

export enum EquipmentSlot {
  HEAD = "HEAD",
  CHEST = "CHEST",
  GAUNTLETS = "GAUNTLETS",
  LEGS = "LEGS",
  BOOTS = "BOOTS",
  MAIN_WEAPON = "MAIN_WEAPON",
  OFF_HAND = "OFF_HAND",
  DOUBLE_HAND = "DOUBLE_HAND",
  RING = "RING",
  NECKLACE = "NECKLACE",
}

export type EquipmentStats = {
  atk?: number;
  def?: number;
  str?: number;
  sta?: number;
  agi?: number;
  int?: number;
  critRate?: number;
  critDamage?: number;
  atkSpeed?: number;
  absorption?: number;
  atkShadowrealm?: number;
  atkGuardian?: number;
  atkSorceress?: number;
  atkRadiance?: number;
  defShadowrealm?: number;
  defGuardian?: number;
  defSorceress?: number;
  defRadiance?: number;
};

export enum EquipmentRarity {
  COMMON = "COMMON", //white
  UNCOMMON = "UNCOMMON", //green
  RARE = "RARE", //blue
  EPIC = "EPIC", //purple
  LEGENDARY = "LEGENDARY", //orange
}

export type Equipment = Item & {
  slot: EquipmentSlot;
  base: EquipmentStats;
  rarity: EquipmentRarity;
  level: number;
};

export type Stackable = Item & {
  quantity: number;
  description: string;
};

export type Unstackable = Item & {
  description: string;
};

export type Currency = Item & {
  description: string;
  quantity: number;
};
