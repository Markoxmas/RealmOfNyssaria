import express from "express";
import { getUser, restartUser } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getUser);
router.post("/restart", restartUser);

export default router;
