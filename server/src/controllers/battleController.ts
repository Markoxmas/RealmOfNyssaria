import { Request, Response } from "express";
import Battle from "../models/Battle";
import Hero from "../models/Hero";
import Inventory from "../models/Inventory";
import { serverConfig } from "../serverConfig";
import { calculateMonsterHp } from "../lib/calculateMonsterHp";
import { getDrops } from "../lib/getDrops";
import User from "../models/User";
import { calculateBattleKills } from "../lib/calculateBattleKills";
import addDropsToInventory from "../lib/addDropsToInventory";

export const getAllBattles = async (
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

      const { battleIds } = user;

      const battles = await Battle.find({ _id: { $in: battleIds } });

      if (!battles) {
        res.status(404).json({ error: "No battles found" });
        return;
      }

      res.status(200).json(battles);
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching battles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBattleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const battle = await Battle.findById(req.params.battleId);
    if (!battle) {
      res.status(404).json({ error: "Battle not found" });
      return;
    }
    res.json(battle);
  } catch (error) {
    console.error("Error fetching battle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBattle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { heroes_ids } = req.body;
    const userId = req.user?._id;

    if (userId) {
      const user = await User.findById(userId);
      const { battleId } = req.params;

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const { battleIds } = user;

      if (!battleIds.includes(battleId)) {
        res.status(401).json({ error: "Unauthorized for this battle" });
        return;
      }

      const heroes = await Hero.find({ _id: { $in: heroes_ids } });
      if (heroes.length !== heroes_ids.length) {
        res.status(400).json({ error: "Some heroes were not found" });
        return;
      }
      const collective_cp = heroes.reduce((acc, hero) => acc + hero.cp, 0);

      const battle = await Battle.findById(battleId);
      if (!battle) {
        res.status(404).json({ error: "Battle not found" });
        return;
      }

      if (battle.battleMilestones.length === 0) {
        const { max_monster_hp } = serverConfig.battle;

        battle.battleMilestones.push({
          monster_hp: max_monster_hp,
          start_time: Date.now(),
          collective_cp,
          heroes,
        });

        await battle.save();
        res.status(201).json(battle);
      } else {
        battle.battleMilestones.push({
          monster_hp: calculateMonsterHp(battle.battleMilestones),
          start_time: Date.now(),
          collective_cp,
          heroes,
        });

        await battle.save();
        res.status(200).json(battle);
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error updating battle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const claimBattleLoot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { battleId } = req.params;

    if (userId) {
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const { battleIds, inventoryId } = user;

      if (!battleIds.includes(battleId)) {
        res.status(401).json({ error: "Unauthorized for this battle" });
        return;
      }

      const battle = await Battle.findById(battleId);
      if (!battle) {
        res.status(404).json({ error: "Battle not found" });
        return;
      }
      if (!battle.battleMilestones.length) {
        res.status(400).json({ error: "No battle milestones to claim" });
        return;
      }

      const heroes =
        battle.battleMilestones[battle.battleMilestones.length - 1].heroes;

      const kills = calculateBattleKills(battle.battleMilestones);
      const drops = getDrops(kills, serverConfig.dropRolls);

      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        res.status(404).json({ error: "Inventory not found" });
        return;
      }

      const updatedInventory = addDropsToInventory(inventory, drops);
      inventory.items = updatedInventory.items;

      await inventory.save();

      battle.battleMilestones = [
        {
          monster_hp: calculateMonsterHp(battle.battleMilestones),
          start_time: Date.now(),
          collective_cp: heroes.reduce((acc, hero) => acc + hero.cp, 0),
          heroes,
        },
      ];

      await battle.save();
      res.status(200).json({ battle, drops, inventory });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error claiming battle loot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
