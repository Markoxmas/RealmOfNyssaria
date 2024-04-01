import express, { Router } from "express";
import { levelUp } from "../controllers/upgradeController";

const router: Router = express.Router();

router.patch("/:heroId/:amount/:inventoryId", levelUp);

export default router;
