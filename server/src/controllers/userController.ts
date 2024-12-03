import { Request, Response } from "express";
import User from "../models/User";
import Inventory from "../models/Inventory";
import Battle, { IBattle } from "../models/Battle";
import Hero from "../models/Hero";
import { getInitialItems } from "../lib/getInitialItems";
import { battleRegistry } from "../battleRegistry";

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

  const { inventoryId, battleIds, heroIds } = user;

  Inventory.findByIdAndDelete(inventoryId);
  Battle.deleteMany({ _id: { $in: battleIds } });
  Hero.deleteMany({ _id: { $in: heroIds } });

  const newInventory = {
    items: getInitialItems(),
  };

  const inventory = await Inventory.create(newInventory);

  const battles = await Promise.all(
    battleRegistry.passive.map(async (passiveBattle) => {
      const battle = await Battle.create({
        registryId: passiveBattle.registryId,
        battleMilestones: [],
      });

      return battle;
    })
  );

  user.inventoryId = inventory._id as string;
  user.battleIds = battles.map((battle) => battle._id) as string[];
  user.heroIds = [];

  await user.save();

  res.status(200).json({ userId });
};

export { getUser, restartUser };
