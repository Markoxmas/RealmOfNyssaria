import express, { Router } from "express";
import {
  initializeInventory,
  getAllInventories,
  deleteAllInventories,
} from "../controllers/inventoryController";

const router: Router = express.Router();

router.get("/", getAllInventories);
router.post("/", initializeInventory);
router.delete("/", deleteAllInventories);

export default router;
