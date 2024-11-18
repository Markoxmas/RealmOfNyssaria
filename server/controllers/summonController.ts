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

    // Find the index of the "Scroll of Summon" item in the inventory
    const itemIndex = firstInventory.items.findIndex((item) => item.id === 2);

    if (itemIndex === -1 || firstInventory.items[itemIndex].quantity < amount) {
      res.status(400).json({ error: "Not enough scrolls of summon" });
      return;
    } else {
      // Deduct the amount from the item's quantity
      firstInventory.items[itemIndex].quantity -= amount;
    }

    const summonedHeroes = summonHeroesHelper(amount);

    const savedHeroes: Array<IHero> = [];
    for (const heroData of summonedHeroes) {
      const newHero = new Hero(heroData);
      const savedHero = await newHero.save();
      savedHeroes.push(savedHero);
    }

    await firstInventory.save();

    res.status(201).json({
      summonedHeroes: savedHeroes,
      scrollOfSummon: firstInventory.items[itemIndex].quantity,
    });
  } catch (error) {
    console.error("Error summoning heroes:", error);
    res.status(500).json({ error: "Failed to summon heroes" });
  }
};
