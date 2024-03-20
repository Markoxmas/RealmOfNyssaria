import { HeroData } from "../types/HeroData";
import { serverConfig } from "../serverConfig";
import { heroLibrary } from "../heroLibrary";

function getRandomStars() {
  const roll = Math.random();
  if (roll <= serverConfig.summon_3) {
    return 3;
  } else if (roll <= serverConfig.summon_4) {
    return 4;
  } else {
    return 5;
  }
}

export const summonHeroes = (amount: number) => {
  const summonedHeroes: Array<HeroData> = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * heroLibrary.length);
    const chosenHero = heroLibrary[randomIndex];
    const nextHero: HeroData = {
      name: chosenHero.name,
      stars: getRandomStars(),
      level: 1,
      cp: 0,
      image: chosenHero.image,
      in_battle: false,
    };
    summonedHeroes.push(nextHero);
  }

  return summonedHeroes;
};
