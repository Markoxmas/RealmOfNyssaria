import { IHero } from "../models/Hero";

export const areSacrificesFulfilled = (
  hero: IHero,
  sacrifices: IHero[],
  requiredSacrifices: Array<{
    stars: number;
    amount: number;
    same: boolean;
  } | null>
) => {
  const requiredSacrificesAmount = requiredSacrifices.reduce((acc, curr) => {
    if (curr !== null) {
      return acc + curr.amount;
    } else {
      return acc;
    }
  }, 0);
  if (requiredSacrificesAmount !== sacrifices.length) {
    return false;
  }

  let isValid = true;
  requiredSacrifices.forEach((requiredSacrifice) => {
    if (requiredSacrifice !== null) {
      for (let i = 0; i < requiredSacrifice.amount; i++) {
        let foundHero;
        if (requiredSacrifice.same) {
          foundHero = sacrifices.find(
            (sacrifice) =>
              sacrifice.stars === requiredSacrifice.stars &&
              sacrifice.name === hero.name
          );
        } else {
          foundHero = sacrifices.find(
            (sacrifice) => sacrifice.stars === requiredSacrifice.stars
          );
        }

        if (!foundHero) {
          isValid = false;
        } else {
          const index = sacrifices.indexOf(foundHero);
          sacrifices.splice(index, 1);
        }
      }
    }
  });

  return isValid;
};
