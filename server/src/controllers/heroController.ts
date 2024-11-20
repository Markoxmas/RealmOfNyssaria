import { Request, Response } from "express";
import Hero from "../models/Hero";
import User from "../models/User";

export const getAllHeroes = async (
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

      const heroes = await Hero.find({ _id: { $in: user.heroIds } });

      res.json(heroes);
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching heroes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHeroById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      res.status(404).json({ error: "Hero not found" });
      return;
    }
    res.json(hero);
  } catch (error) {
    console.error("Error fetching hero:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
