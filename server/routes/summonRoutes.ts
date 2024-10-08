import express, { Router } from "express";
import { summonHeroes } from "../controllers/summonController";

const router: Router = express.Router();

router.post("/:amount", summonHeroes);

export default router;
