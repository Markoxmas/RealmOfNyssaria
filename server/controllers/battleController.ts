import { Request, Response } from "express";
import Battle, { BattleMilestone } from "../models/Battle";
import Hero from "../models/Hero";
import { serverConfig } from "../serverConfig";

function calculateMonsterHp(battleMilestones: BattleMilestone[]) {
  const { max_monster_hp } = serverConfig.battle;
  const lastMilestone = battleMilestones[battleMilestones.length - 1];
  const timeElapsed = Date.now() - lastMilestone.start_time;
  return Math.abs(
    (lastMilestone.monster_hp -
      lastMilestone.collective_cp * Math.floor(timeElapsed / 1000)) %
      max_monster_hp
  );
}

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
