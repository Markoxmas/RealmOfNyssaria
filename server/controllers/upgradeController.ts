import { Request, Response } from "express";
import Hero from "../models/Hero";
import Inventory from "../models/Inventory";
import { calculateLevelUpCost } from "../lib/calculateLevelUpCost";
import { calculateCp } from "../lib/calculateCp";
import { serverConfig } from "../serverConfig";
import { areSacrificesFulfilled } from "../lib/areSacrificesFulfilled";
import { inventoryLib } from "../lib/inventoryLib";

export const levelUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hero_id, inventoryId } = req.params;
    const amount = Number(req.params.amount);

    const hero = await Hero.findById(hero_id);
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

    if (!inventoryLib.hasSufficientGold(inventory, costOfUpgrade)) {
      res.status(400).json({ error: "Not enough gold" });
      return;
    } else if (hero.level + amount > star_max_level[hero.stars - 1]) {
      res.status(400).json({ error: "Hero level cannot exceed max level" });
      return;
    } else {
      await Inventory.findByIdAndUpdate(
        inventoryId,
        {
          $inc: {
            "items.$[elem].quantity": -costOfUpgrade,
          },
        },
        {
          arrayFilters: [{ "elem.id": 1 }],
        }
      );
      hero.level += amount;
      hero.cp = calculateCp(hero);

      await hero.save();
    }

    const updatedInventory = await Inventory.findById(inventoryId);

    res.status(200).json({ hero, inventory: updatedInventory });
  } catch (error) {
    console.error("Error leveling up", error);
    res.status(500).json({ error: "Failed to level up the hero" });
  }
};

export const starUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hero_id } = req.params;
    const { sacrificeIds } = req.body;
    const { sacrifices } = serverConfig.upgrade;

    const hero = await Hero.findById(hero_id);
    if (!hero) {
      res.status(404).json({ error: "Hero not found" });
      return;
    }

    const sacrificeHeroes = await Hero.find({ _id: { $in: sacrificeIds } });
    if (sacrificeHeroes.length !== sacrificeIds.length) {
      res.status(400).json({ error: "Some heroes were not found" });
      return;
    }

    const sacrificesNeeded = sacrifices[hero.stars - 1];
    const isSacrificeValid = areSacrificesFulfilled(
      hero,
      [...sacrificeHeroes],
      sacrificesNeeded
    );

    if (!isSacrificeValid) {
      res.status(400).json({ error: "Invalid sacrifices" });
      return;
    }

    hero.stars += 1;
    hero.cp = calculateCp(hero);
    await hero.save();

    const upgradeInfo = {
      levelUpBase: serverConfig.upgrade.level_up_base,
      levelUpMultiplier: serverConfig.upgrade.level_up_multiplier,
      maxLevel: serverConfig.upgrade.star_max_level[hero.stars - 1],
      sacrifices: serverConfig.upgrade.sacrifices[hero.stars - 1],
    };

    const idsToDelete = sacrificeHeroes.map((hero) => hero._id);
    await Hero.deleteMany({ _id: { $in: idsToDelete } });

    res.status(200).json({ hero, deletedHeroes: idsToDelete, upgradeInfo });
  } catch (error) {
    console.error("Error starring up", error);
    res.status(500).json({ error: "Failed to star up the hero" });
  }
};

export const getUpgradeInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hero_id } = req.params;

    const hero = await Hero.findById(hero_id);
    if (!hero) {
      res.status(404).json({ error: "Hero not found" });
      return;
    }

    const upgradeInfo = {
      levelUpBase: serverConfig.upgrade.level_up_base,
      levelUpMultiplier: serverConfig.upgrade.level_up_multiplier,
      maxLevel: serverConfig.upgrade.star_max_level[hero.stars - 1],
      sacrifices: serverConfig.upgrade.sacrifices[hero.stars - 1],
    };

    res.status(200).json({ hero, upgradeInfo });
  } catch (error) {
    console.error("Error getting upgrade info", error);
    res.status(500).json({ error: "Failed to get upgrade info" });
  }
};
