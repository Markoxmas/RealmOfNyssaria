import { Request, Response } from "express";
import Battle from "../models/Battle";
import Hero from "../models/Hero";
import Inventory from "../models/Inventory";
import { serverConfig } from "../serverConfig";
import { calculateMonsterHp } from "../lib/calculateMonsterHp";
import { getDrops } from "../lib/getDrops";

export const initializeBattle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newBattle = new Battle({
      battleMilestones: [],
    });

    await newBattle.save();
    res.status(201).json(newBattle);
  } catch (error) {
    console.error("Error initializing battle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBattles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const battles = await Battle.find();
    res.json(battles);
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
    const { battleId } = req.params;
    const { heroes_ids } = req.body;

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
        heroes_ids,
      });

      await battle.save();
      res.status(201).json(battle);
    } else {
      battle.battleMilestones.push({
        monster_hp: calculateMonsterHp(battle.battleMilestones),
        start_time: Date.now(),
        collective_cp,
        heroes_ids,
      });
      await battle.save();
      res.status(200).json(battle);
    }
  } catch (error) {
    console.error("Error updating battle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllBattles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Battle.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting battles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const claimBattleLoot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { battleId, inventoryId } = req.params;

    const battle = await Battle.findById(battleId);
    if (!battle) {
      res.status(404).json({ error: "Battle not found" });
      return;
    }
    if (!battle.battleMilestones.length) {
      res.status(400).json({ error: "No battle milestones to claim" });
      return;
    }

    const currentHeroesIds =
      battle.battleMilestones[battle.battleMilestones.length - 1].heroes_ids;
    const heroes = await Hero.find({ _id: { $in: currentHeroesIds } });
    if (heroes.length !== currentHeroesIds.length) {
      res.status(500).json({ error: "Some heroes were not found" });
      return;
    }

    const drops = getDrops(battle.battleMilestones);

    //Get inventory by id
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      res.status(404).json({ error: "Inventory not found" });
      return;
    }

    inventory.gold += drops.gold;
    inventory.scroll_of_summon += drops.scroll_of_summon;

    battle.battleMilestones = [
      {
        monster_hp: calculateMonsterHp(battle.battleMilestones),
        start_time: Date.now(),
        collective_cp: heroes.reduce((acc, hero) => acc + hero.cp, 0),
        heroes_ids: currentHeroesIds,
      },
    ];

    await battle.save();
    res.status(200).json({ battle, drops, inventory });
  } catch (error) {
    console.error("Error claiming battle loot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
