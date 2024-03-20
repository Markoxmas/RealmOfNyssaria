import express, { Router } from "express";
import {
  initializeInventory,
  getAllInventories,
} from "../controllers/inventoryController";

const router: Router = express.Router();

router.get("/", getAllInventories);
router.post("/", initializeInventory);

export default router;
