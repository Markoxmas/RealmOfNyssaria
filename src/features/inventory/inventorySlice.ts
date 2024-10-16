// src/features/inventory/inventorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { summonHeroes } from "../summon/summonSlice";
import { levelUp } from "../upgrade/upgradeSlice";
import { claimLoot } from "../battle/battleSlice";

export type Inventory = {
  _id: string;
  scroll_of_summon: number;
  gold: number;
};

export interface InventoryState {
  _id: string;
  scrollOfSummon: number;
  gold: number;
}

const initialState: InventoryState = {
  _id: "",
  scrollOfSummon: 0,
  gold: 0,
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
        if (action.payload[0]) {
          state._id = action.payload[0]._id;
          state.scrollOfSummon = action.payload[0].scroll_of_summon;
          state.gold = action.payload[0].gold;
        }
      })
      .addCase(getInventory.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(summonHeroes.fulfilled, (state, action) => {
        state.scrollOfSummon = action.payload.scrollOfSummon;
      })
      .addCase(levelUp.fulfilled, (state, action) => {
        state.gold = action.payload.inventory.gold;
      })
      .addCase(claimLoot.fulfilled, (state, action) => {
        state.gold = action.payload.inventory.gold;
        state.scrollOfSummon = action.payload.inventory.scroll_of_summon;
      });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
