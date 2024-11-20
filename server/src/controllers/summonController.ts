import { Request, Response } from "express";
import { summonHeroes as summonHeroesHelper } from "../lib/summonHeroes";
import Hero, { IHero } from "../models/Hero";
import Inventory, { IInventory } from "../models/Inventory";

export const summonHeroes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryId = req.params.inventoryId;
    const amount = Number(req.params.amount);

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      res.status(404).json({ error: "Inventory not found" });
      return;
    }

    // Check if the "Scroll of Summon" exists and if there's enough quantity
    const hasSufficientScrolls = inventory.items.some(
      (item) => item.id === 2 && item.quantity >= amount
    );

    if (!hasSufficientScrolls) {
      res.status(400).json({ error: "Not enough scrolls of summon" });
      return;
    }

    // Update the quantity of "Scroll of Summon" in the inventory
    await Inventory.findByIdAndUpdate(
      inventoryId,
      {
        $inc: { "items.$[elem].quantity": -amount },
      },
      {
        arrayFilters: [{ "elem.id": 2 }],
        new: true,
      }
    );

    const summonedHeroes = summonHeroesHelper(amount);

    const savedHeroes: Array<IHero> = [];
    for (const heroData of summonedHeroes) {
      const newHero = new Hero(heroData);
      const savedHero = await newHero.save();
      savedHeroes.push(savedHero);
    }

    // Send the response with the summoned heroes and updated scroll quantity
    const updatedInventory = await Inventory.findById(inventoryId);

    res.status(201).json({
      summonedHeroes: savedHeroes,
      scrollOfSummon: updatedInventory?.items.find((item) => item.id === 2)
        ?.quantity,
    });
  } catch (error) {
    console.error("Error summoning heroes:", error);
    res.status(500).json({ error: "Failed to summon heroes" });
  }
};
