import express, { Router } from "express";
import {
  getAllHeroes,
  getHeroById,
  deleteAllHeroes,
} from "../controllers/heroController";

const router: Router = express.Router();

router.get("/", getAllHeroes);
router.get("/:id", getHeroById);
router.delete("/", deleteAllHeroes);

export default router;
