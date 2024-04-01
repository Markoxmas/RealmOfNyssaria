import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import heroRoutes from "./routes/heroRoutes";
import summonRoutes from "./routes/summonRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import battleRoutes from "./routes/battleRoutes";
import upgradeRoutes from "./routes/upgradeRoutes";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL!);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.use("/api/heroes", heroRoutes);
app.use("/api/summon", summonRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/battle", battleRoutes);
app.use("/api/upgrade", upgradeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
