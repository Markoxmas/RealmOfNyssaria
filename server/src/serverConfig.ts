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
  drops: {
    gold_multiplier: 0.1,
    scroll_of_summon_drop_rate: 0.05,
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
};
