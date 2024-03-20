import express, { Router } from "express";
import { getAllHeroes, getHeroById } from "../controllers/heroController";

const router: Router = express.Router();

router.get("/", getAllHeroes);
router.get("/:id", getHeroById);

export default router;
