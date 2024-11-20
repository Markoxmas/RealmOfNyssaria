import express, { Router } from "express";
import {
  levelUp,
  starUp,
  getUpgradeInfo,
} from "../controllers/upgradeController";

const router: Router = express.Router();

router.patch("/levelup/:hero_id/:amount/", levelUp);
router.put("/starup/:hero_id", starUp); // body: sacrifice_ids string[]
router.get("/info/:hero_id", getUpgradeInfo);

export default router;
