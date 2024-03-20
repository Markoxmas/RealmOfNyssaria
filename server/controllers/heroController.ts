import { Request, Response } from "express";
import Hero from "../models/Hero";

export const getAllHeroes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
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
