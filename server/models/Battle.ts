import mongoose, { Schema, Document } from "mongoose";

export interface BattleMilestone {
  monster_hp: number;
  start_time: number;
  collective_cp: number;
  heroes_ids: string[];
}

export interface IBattle extends Document {
  battleMilestones: BattleMilestone[];
}

const BattleSchema: Schema = new Schema({
  battleMilestones: [
    {
      monster_hp: { type: Number, required: true },
      start_time: { type: Number, required: true },
      collective_cp: { type: Number, required: true },
      heroes_ids: [{ type: String, required: true }],
    },
  ],
});

const Battle = mongoose.model<IBattle>("Battle", BattleSchema);
export default Battle;
