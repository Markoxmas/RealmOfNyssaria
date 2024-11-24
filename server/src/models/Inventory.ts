import mongoose, { Schema, Document } from "mongoose";
import {
  Currency,
  Equipment,
  Stackable,
  Unstackable,
} from "../types/itemSystem/itemSystem";

export interface IInventory extends Document {
  items: Array<Equipment | Stackable | Unstackable | Currency>;
}

const InventorySchema: Schema = new Schema({
  items: { type: Array, required: true },
});

const Inventory = mongoose.model<IInventory>("Inventory", InventorySchema);
export default Inventory;
