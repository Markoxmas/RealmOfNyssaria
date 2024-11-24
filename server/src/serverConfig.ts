export const serverConfig = {
  summon: {
    summon_3: 0.6,
    summon_4: 0.9,
  },
  cp: {
    cp_multiplier: 1.04,
    cp_base: 30,
    star_multiplier: 0.1,
  },
  battle: {
    max_monster_hp: 10000,
  },
  upgrade: {
    level_up_base: 100,
    level_up_multiplier: 1.05,
    star_max_level: [10, 20, 30, 50, 80, 100, 140, 160, 180, 200],
    sacrifices: [
      [null, null],
      [null, null],
      [
        {
          stars: 3,
          amount: 3,
          same: false,
        },
        null,
      ],
      [
        {
          stars: 4,
          amount: 2,
          same: false,
        },
        null,
      ],
      [
        {
          stars: 5,
          amount: 1,
          same: true,
        },
        null,
      ],
      [
        {
          stars: 6,
          amount: 1,
          same: false,
        },
        null,
      ],
      [
        {
          stars: 5,
          amount: 2,
          same: true,
        },
        null,
      ],
      [
        {
          stars: 8,
          amount: 1,
          same: false,
        },
      ],
      [
        {
          stars: 6,
          amount: 1,
          same: false,
        },
        {
          stars: 5,
          amount: 2,
          same: true,
        },
      ],
    ],
  },
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
};
