import { Request, Response } from "express";
import User from "../models/User";
import Inventory from "../models/Inventory";
import Battle from "../models/Battle";
import Hero from "../models/Hero";
import { getInitialItems } from "../lib/getInitialItems";
import { Inventory as InventoryType } from "../types/Inventory";

const getUser = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400).send({ message: "User not found" });
  }

  res.status(200).json(user);
};

const restartUser = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400).send({ message: "User not found" });
    return;
  }

  const { inventoryId, battleId, heroIds } = user;

  Inventory.findByIdAndDelete(inventoryId);
  Battle.findByIdAndDelete(battleId);
  Hero.deleteMany({ _id: { $in: heroIds } });

  const newInventory: InventoryType = {
    items: getInitialItems(),
  };

  const inventory = await Inventory.create(newInventory);

  const battle = await Battle.create({
    battleMilestones: [],
  });

  user.inventoryId = inventory._id as string;
  user.battleId = battle._id as string;
  user.heroIds = [];

  await user.save();

  res.status(200).json({ userId });
};

export { getUser, restartUser };
