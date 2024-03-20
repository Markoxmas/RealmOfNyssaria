import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  scroll_of_summon: number;
  gold: number;
}

const InventorySchema: Schema = new Schema({
  scroll_of_summon: { type: Number, required: true },
  gold: { type: Number, required: true },
});

const Inventory = mongoose.model<IInventory>("Inventory", InventorySchema);
export default Inventory;
