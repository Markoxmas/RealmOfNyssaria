import mongoose, { Schema, Document } from "mongoose";

export interface BattleMilestone {
  monster_hp: number;
  start_time: number;
  collective_cp: number;
  heroes: {
    name: string;
    stars: number;
    level: number;
    cp: number;
    image: string;
  }[];
}

export interface IBattle extends Document {
  registryId: string;
  battleMilestones: BattleMilestone[];
}

const BattleSchema: Schema = new Schema({
  registryId: { type: String, required: true },
  battleMilestones: [
    {
      monster_hp: { type: Number, required: true },
      start_time: { type: Number, required: true },
      collective_cp: { type: Number, required: true },
      heroes: [
        {
          name: { type: String, required: true },
          stars: { type: Number, required: true },
          level: { type: Number, required: true },
          cp: { type: Number, required: true },
          image: { type: String, required: true },
        },
      ],
    },
  ],
});

const Battle = mongoose.model<IBattle>("Battle", BattleSchema);
export default Battle;
