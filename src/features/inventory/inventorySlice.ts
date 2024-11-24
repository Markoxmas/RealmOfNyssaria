// src/features/inventory/inventorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { summonHeroes } from "../summon/summonSlice";
import { levelUp } from "../upgrade/upgradeSlice";
import { claimLoot } from "../battle/battleSlice";
import {
  Currency,
  Equipment,
  Stackable,
  Unstackable,
} from "./types/itemSystem";

export interface InventoryState {
  items: Array<Equipment | Stackable | Unstackable | Currency>;
}

const initialState: InventoryState = {
  items: [],
};

export const getInventory = createAsyncThunk(
  "inventory/getInventory",
  async () => {
    const response = await axios.get("/api/inventory");
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventory.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(getInventory.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(summonHeroes.fulfilled, (state, action) => {
        state.items = state.items.map((item) => {
          if (item.registryId === "scroll-of-summon") {
            return {
              ...item,
              quantity: action.payload.scrollOfSummon.quantity,
            };
          } else {
            return item;
          }
        });
      })
      .addCase(levelUp.fulfilled, (state, action) => {
        state.items = action.payload.inventory.items;
      })
      .addCase(claimLoot.fulfilled, (state, action) => {
        state.items = action.payload.inventory.items;
      });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
