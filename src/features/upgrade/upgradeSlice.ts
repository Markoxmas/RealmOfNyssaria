import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Hero } from "../heroes/heroesSlice";
import { RootState } from "../../app/store";
import axios from "axios";

export type UpgradeInfo = {
  levelUpBase: number;
  levelUpMultiplier: number;
  maxLevel: number;
  sacrifices: {
    stars: number;
    amount: number;
    same: boolean;
  } | null;
};

export interface UpgradeState {
  hero: Hero | null;
  upgradeInfo: UpgradeInfo;
}

const initialState: UpgradeState = {
  hero: null,
  upgradeInfo: {
    levelUpBase: 0,
    levelUpMultiplier: 0,
    maxLevel: 0,
    sacrifices: null,
  },
};

export const selectHero = createAsyncThunk(
  "upgrade/selectHero",
  async (hero: Hero) => {
    const response = await axios.get(`/api/upgrade/info/${hero._id}`);
    return response.data;
  }
);

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
  reducers: {},
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
      })
      .addCase(selectHero.fulfilled, (state, action) => {
        state.hero = action.payload.hero;
        state.upgradeInfo = action.payload.upgradeInfo;
      });
  },
});

export const hero = (state: RootState) => state.upgrade.hero;

export default upgradeSlice.reducer;
