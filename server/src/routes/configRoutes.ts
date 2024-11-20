import express, { Router } from "express";
import { getConfig } from "../controllers/configController";

const router: Router = express.Router();

router.get("/", getConfig);

export default router;
