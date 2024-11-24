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
