import { Faction } from "../Faction";
import {
  Currency,
  Equipment,
  Stackable,
  Unstackable,
} from "./itemSystem/itemSystem";

export type DropRoll = {
  registryId: string;
  dropRate: number; // between 0 and 1
  quantity: number;
};

export type DropRolls = Array<DropRoll>;

export type Drop = Equipment | Stackable | Unstackable | Currency;

export type BattleRegistryItem = {
  registryId: string;
  name: string;
  area: BattleArea;
  faction: Faction;
  dropRolls: DropRolls;
};

export enum BattleArea {
  SHADOW_FOREST = "Shadow Forest",
  SNOWY_MOUNTAINS = "Snowy Mountains",
  DESERT = "Desert",
  VOLCANO = "Volcano",
  OCEAN = "Ocean",
}
