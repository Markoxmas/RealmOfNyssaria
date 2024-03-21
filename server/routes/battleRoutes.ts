import express, { Router } from "express";
import {
  initializeBattle,
  getAllBattles,
  getBattleById,
  updateBattle,
  deleteAllBattles,
} from "../controllers/battleController";

const router: Router = express.Router();

router.post("/", initializeBattle);
router.get("/", getAllBattles);
router.get("/:battleId", getBattleById);
router.patch("/update/:battleId", updateBattle);
router.delete("/", deleteAllBattles);

export default router;
