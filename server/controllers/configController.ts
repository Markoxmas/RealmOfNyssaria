import { Request, Response } from "express";
import { serverConfig } from "../serverConfig";

export const getConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const { upgrade } = serverConfig;

    res.status(200).json({ upgrade });
  } catch (error) {
    console.error("Error fetching config:", error);
    res
      .status(500)
      .json({ error: "Internal server error when fetching config" });
  }
};
