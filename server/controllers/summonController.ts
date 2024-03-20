import { Request, Response } from "express";
import { summonHeroes as summonHeroesHelper } from "../lib/summonHeroes";
import Hero, { IHero } from "../models/Hero";

export const summonHeroes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const amount = Number(req.params.amount);

    const summonedHeroes = summonHeroesHelper(amount);

    const savedHeroes: Array<IHero> = [];
    for (const heroData of summonedHeroes) {
      const newHero = new Hero(heroData);
      const savedHero = await newHero.save();
      savedHeroes.push(savedHero);
    }

    res.status(201).json({ summonedHeroes: savedHeroes });
  } catch (error) {
    console.error("Error summoning heroes:", error);
    res.status(500).json({ error: "Failed to summon heroes" });
  }
};
