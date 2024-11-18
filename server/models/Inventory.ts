import mongoose, { Schema, Document } from "mongoose";
import { Item } from "../types/Item";

export interface IInventory extends Document {
  items: Item[];
}

const InventorySchema: Schema = new Schema({
  items: { type: Array, required: true },
});

const Inventory = mongoose.model<IInventory>("Inventory", InventorySchema);
export default Inventory;
