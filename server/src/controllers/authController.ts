import { Request, Response } from "express";
import User from "../models/User";
import { generateToken, clearToken } from "../lib/auth";
import { v4 as uuidv4 } from "uuid";
import Battle from "../models/Battle";
import { getInitialItems } from "../lib/getInitialItems";
import Inventory from "../models/Inventory";

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({ message: "The user already exists" });
  }

  const inventoryId = uuidv4();
  const battleId = uuidv4();
  const heroIds = [] as string[];

  const user = await User.create({
    username,
    password,
    inventoryId,
    battleId,
    heroIds,
  });

  await Battle.create({
    _id: battleId,
    battleMilestones: [],
  });

  const newInventory = {
    items: getInitialItems(),
  };

  await Inventory.create(newInventory);

  if (user) {
    generateToken(res, user._id as string);
    res.status(201).json({
      userId: user._id,
    });
  } else {
    res.status(400).json({ message: "An error occurred in creating the user" });
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id as string);
    res.status(201).json({
      userId: user._id,
    });
  } else {
    res.status(401).json({ message: "User not found / password incorrect" });
  }
};

const logoutUser = (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out" });
};

export { registerUser, authenticateUser, logoutUser };
