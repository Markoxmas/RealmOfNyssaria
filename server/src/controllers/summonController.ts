import { Request, Response } from "express";
import { summonHeroes as summonHeroesHelper } from "../lib/summonHeroes";
import Hero, { IHero } from "../models/Hero";
import Inventory from "../models/Inventory";
import User from "../models/User";
import { Stackable } from "../types/itemSystem/itemSystem";

export const summonHeroes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (userId) {
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const { inventoryId } = user;
      const amount = Number(req.params.amount);

      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        res.status(404).json({ error: "Inventory not found" });
        return;
      }

      // Check if the "Scroll of Summon" exists and if there's enough quantity
      const scrollOfSummon = inventory.items.find(
        (item) => item.registryId === "scroll-of-summon"
      ) as Stackable;

      if (!(scrollOfSummon && scrollOfSummon.quantity >= amount)) {
        res.status(404).json({ error: "Not enough scrolls of summon" });
        return;
      }

      // Update the quantity of "Scroll of Summon" in the inventory
      await Inventory.findByIdAndUpdate(
        inventoryId,
        {
          $inc: { "items.$[elem].quantity": -amount },
        },
        {
          arrayFilters: [{ "elem.registryId": "scroll-of-summon" }],
          new: true,
        }
      );

      const summonedHeroes = summonHeroesHelper(amount);

      const savedHeroes: Array<IHero> = [];
      for (const heroData of summonedHeroes) {
        const newHero = new Hero(heroData);
        user.heroIds.push(newHero._id as string);
        const savedHero = await newHero.save();
        savedHeroes.push(savedHero);
      }

      // Send the response with the summoned heroes and updated scroll quantity
      const updatedInventory = await Inventory.findById(inventoryId);

      await user.save();

      res.status(201).json({
        summonedHeroes: savedHeroes,
        scrollOfSummon: updatedInventory?.items.find(
          (item) => item.registryId === "scroll-of-summon"
        ),
      });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error summoning heroes:", error);
    res.status(500).json({ error: "Failed to summon heroes" });
  }
};
