import { Request, Response } from "express";
import Inventory from "../models/Inventory";
import User from "../models/User";

export const getInventory = async (
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

      let inventory = await Inventory.findById(user.inventoryId);

      res.status(200).json(inventory);
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error retrieving inventories:", error);
    res.status(500).json({ error: "Failed to retrieve inventories" });
  }
};
