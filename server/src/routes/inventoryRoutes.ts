import express, { Router } from "express";
import { getInventory } from "../controllers/inventoryController";

const router: Router = express.Router();

router.get("/", getInventory);

export default router;
