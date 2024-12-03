import { Faction } from "./Faction";
import { BattleArea, BattleRegistryItem } from "./types/battleSystem";

type BattleRegistry = {
  passive: Array<BattleRegistryItem>;
  active: Array<BattleRegistryItem>;
};

export const battleRegistry: BattleRegistry = {
  passive: [
    {
      registryId: "random-animal",
      name: "Random animal",
      area: BattleArea.SHADOW_FOREST,
      faction: Faction.SHADOWREALM,
      dropRolls: [
        {
          registryId: "gold",
          dropRate: 1,
          quantity: 550,
        },
        {
          registryId: "scroll-of-summon",
          dropRate: 0.2,
          quantity: 1,
        },
        {
          registryId: "rock",
          dropRate: 0.6,
          quantity: 1,
        },
        {
          registryId: "test-weapon",
          dropRate: 0.1,
          quantity: 1,
        },
      ],
    },
    {
      registryId: "random-monster",
      name: "Random monster",
      area: BattleArea.SNOWY_MOUNTAINS,
      faction: Faction.SHADOWREALM,
      dropRolls: [
        {
          registryId: "gold",
          dropRate: 1,
          quantity: 550,
        },
        {
          registryId: "scroll-of-summon",
          dropRate: 0.8,
          quantity: 1,
        },
        {
          registryId: "test-weapon",
          dropRate: 0.1,
          quantity: 1,
        },
      ],
    },
    {
      registryId: "yetti",
      name: "Yetti",
      area: BattleArea.SNOWY_MOUNTAINS,
      faction: Faction.SHADOWREALM,
      dropRolls: [
        {
          registryId: "gold",
          dropRate: 1,
          quantity: 550,
        },
        {
          registryId: "scroll-of-summon",
          dropRate: 0.8,
          quantity: 1,
        },
        {
          registryId: "test-weapon",
          dropRate: 0.1,
          quantity: 1,
        },
      ],
    },
  ],
  active: [],
};
