import { Request, Response } from "express";
import Hero from "../models/Hero";
import Inventory from "../models/Inventory";
import { calculateLevelUpCost } from "../lib/calculateLevelUpCost";
import { calculateCp } from "../lib/calculateCp";
import { serverConfig } from "../serverConfig";

export const levelUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { heroId, inventoryId } = req.params;
    const amount = Number(req.params.amount);

    const hero = await Hero.findById(heroId);
    if (!hero) {
      res.status(404).json({ error: "Hero not found" });
      return;
    }

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      res.status(404).json({ error: "Inventory not found" });
      return;
    }

    const costOfUpgrade = calculateLevelUpCost(hero, amount);
    const { star_max_level } = serverConfig.upgrade;
    if (inventory.gold < costOfUpgrade) {
      res.status(400).json({ error: "Not enough gold" });
      return;
    } else if (hero.level + amount > star_max_level[hero.stars - 1]) {
      res.status(400).json({ error: "Hero level cannot exceed max level" });
      return;
    } else {
      inventory.gold -= costOfUpgrade;
      hero.level += amount;
      hero.cp = calculateCp(hero);

      await inventory.save();
      await hero.save();
    }

    res.status(200).json({ hero, inventory });
  } catch (error) {
    console.error("Error retrieving inventories:", error);
    res.status(500).json({ error: "Failed to retrieve inventories" });
  }
};
