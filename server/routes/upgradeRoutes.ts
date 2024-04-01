import express, { Router } from "express";
import { levelUp, starUp } from "../controllers/upgradeController";

const router: Router = express.Router();

router.patch("/levelup/:hero_id/:amount/:inventoryId", levelUp);
router.put("/starup/:hero_id", starUp);

export default router;
