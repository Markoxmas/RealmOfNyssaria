import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Hero } from "../heroes/heroesSlice";
import { RootState } from "../../app/store";
import axios from "axios";

export interface UpgradeState {
  hero: Hero | null;
}

const initialState: UpgradeState = {
  hero: null,
};

export const levelUp = createAsyncThunk(
  "upgrade/levelUp",
  async ({
    heroId,
    amount,
    inventoryId,
  }: {
    heroId: string;
    amount: number;
    inventoryId: string;
  }) => {
    const response = await axios.patch(
      `/api/upgrade/levelup/${heroId}/${amount}/${inventoryId}`
    );
    return response.data;
  }
);

const upgradeSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    selectHero: (state, action) => {
      state.hero = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(levelUp.fulfilled, (state, action) => {
        if (state.hero) {
          state.hero.level = action.payload.hero.level;
          state.hero.cp = action.payload.hero.cp;
        }
      })
      .addCase(levelUp.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { selectHero } = upgradeSlice.actions;

export const hero = (state: RootState) => state.upgrade.hero;

export default upgradeSlice.reducer;
