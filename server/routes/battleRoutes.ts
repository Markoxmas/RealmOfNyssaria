import express, { Router } from "express";
import {
  initializeBattle,
  getAllBattles,
  getBattleById,
  updateBattle,
  deleteAllBattles,
  claimBattleLoot,
} from "../controllers/battleController";

const router: Router = express.Router();

router.post("/", initializeBattle);
router.get("/", getAllBattles);
router.get("/:battleId", getBattleById);
router.patch("/update/:battleId", updateBattle);
router.delete("/", deleteAllBattles);

router.patch("/claim/:battleId/:inventoryId", claimBattleLoot);

export default router;
