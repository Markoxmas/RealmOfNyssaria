import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import heroRoutes from "./src/routes/heroRoutes";
import summonRoutes from "./src/routes/summonRoutes";
import inventoryRoutes from "./src/routes/inventoryRoutes";
import battleRoutes from "./src/routes/battleRoutes";
import upgradeRoutes from "./src/routes/upgradeRoutes";
import configRoutes from "./src/routes/configRoutes";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import { authenticate } from "./src/middleware/authMiddleware";
import { errorHandler } from "./src/middleware/errorMiddleware";

interface UserBasicInfo {
  _id: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL!);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.use("/api/auth", authRoutes);

app.use("/api/users", authenticate, userRoutes);
app.use("/api/heroes", authenticate, heroRoutes);
app.use("/api/summon", authenticate, summonRoutes);
app.use("/api/inventory", authenticate, inventoryRoutes);
app.use("/api/battle", authenticate, battleRoutes);
app.use("/api/upgrade", authenticate, upgradeRoutes);
app.use("/api/config", authenticate, configRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
