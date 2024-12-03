import { HeroData } from "../types/HeroData";
import { serverConfig } from "../serverConfig";
import { heroRegistry } from "../heroRegistry";
import { calculateCp } from "./calculateCp";

function getRandomStars() {
  const roll = Math.random();
  const { summon_3, summon_4 } = serverConfig.summon;

  if (roll <= summon_3) {
    return 3;
  } else if (roll <= summon_4) {
    return 4;
  } else {
    return 5;
  }
}

export const summonHeroes = (amount: number) => {
  const summonedHeroes: Array<HeroData> = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * heroRegistry.length);
    const chosenHero = heroRegistry[randomIndex];

    const nextHero: HeroData = {
      name: chosenHero.name,
      stars: getRandomStars(),
      level: 1,
      cp: 0,
      image: chosenHero.image,
    };

    nextHero.cp = calculateCp(nextHero);

    summonedHeroes.push(nextHero);
  }

  return summonedHeroes;
};
