import { Request, Response } from "express";
import Inventory, { IInventory } from "../models/Inventory";
import { Inventory as InventoryType } from "../types/Inventory";

export const getAllInventories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventories: Array<IInventory> = await Inventory.find();

    res.status(200).json(inventories);
  } catch (error) {
    console.error("Error retrieving inventories:", error);
    res.status(500).json({ error: "Failed to retrieve inventories" });
  }
};

export const initializeInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newInventory: InventoryType = {
      scroll_of_summon: 1000,
      gold: 250000,
    };

    const createdInventory = await Inventory.create(newInventory);

    res.status(201).json(createdInventory);
  } catch (error) {
    console.error("Error initializing inventory:", error);
    res.status(500).json({ error: "Failed to initialize inventory" });
  }
};

export const deleteAllInventories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Inventory.deleteMany({});
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting inventories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
