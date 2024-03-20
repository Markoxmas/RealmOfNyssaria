import { Request, Response } from "express";
import { summonHeroes as summonHeroesHelper } from "../lib/summonHeroes";
import Hero, { IHero } from "../models/Hero";
import Inventory, { IInventory } from "../models/Inventory";

export const summonHeroes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const amount = Number(req.params.amount);

    const inventories: Array<IInventory> = await Inventory.find();
    const firstInventory = inventories[0];
    if (firstInventory.scroll_of_summon < amount) {
      res.status(400).json({ error: "Not enough scrolls of summon" });
      return;
    } else {
      firstInventory.scroll_of_summon -= amount;
    }

    const summonedHeroes = summonHeroesHelper(amount);

    const savedHeroes: Array<IHero> = [];
    for (const heroData of summonedHeroes) {
      const newHero = new Hero(heroData);
      const savedHero = await newHero.save();
      savedHeroes.push(savedHero);
    }
    await firstInventory.save();

    res
      .status(201)
      .json({
        summonedHeroes: savedHeroes,
        scrollOfSummon: firstInventory.scroll_of_summon,
      });
  } catch (error) {
    console.error("Error summoning heroes:", error);
    res.status(500).json({ error: "Failed to summon heroes" });
  }
};
