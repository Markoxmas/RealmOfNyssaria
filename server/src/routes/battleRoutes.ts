import express, { Router } from "express";
import {
  getAllBattles,
  getBattleById,
  updateBattle,
  claimBattleLoot,
} from "../controllers/battleController";

const router: Router = express.Router();

router.get("/", getAllBattles);
router.get("/:battleId", getBattleById);
router.patch("/update", updateBattle); // body: heroes_ids string[]

router.patch("/claim", claimBattleLoot);

export default router;
