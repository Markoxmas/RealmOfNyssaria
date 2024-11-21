import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Hero } from "../heroes/heroesSlice";
import { RootState } from "../../app/store";
import axios from "axios";

export type Sacrifice = {
  stars: number;
  amount: number;
  same: boolean;
};

export type UpgradeInfo = {
  levelUpBase: number;
  levelUpMultiplier: number;
  maxLevel: number;
  sacrifices: Sacrifice[] | null[];
};

export interface UpgradeState {
  hero: Hero | null;
  upgradeInfo: UpgradeInfo;
  chosenSacrifices: Hero[][];
  starUpModalOpen: boolean;
  starUpModalSlot: number;
}

const initialState: UpgradeState = {
  hero: null,
  upgradeInfo: {
    levelUpBase: 0,
    levelUpMultiplier: 0,
    maxLevel: 0,
    sacrifices: [null],
  },
  chosenSacrifices: [[]],
  starUpModalOpen: false,
  starUpModalSlot: -1,
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
  async ({ heroId, amount }: { heroId: string; amount: number }) => {
    const response = await axios.patch(
      `/api/upgrade/levelup/${heroId}/${amount}`
    );
    return response.data;
  }
);

export const starUp = createAsyncThunk(
  "upgrade/starUp",
  async ({
    heroId,
    sacrificeIds,
  }: {
    heroId: string;
    sacrificeIds: string[];
  }) => {
    const response = await axios.put(`/api/upgrade/starup/${heroId}`, {
      sacrificeIds,
    });
    return response.data;
  }
);

const upgradeSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    openStarUpModal: (state, action: PayloadAction<number>) => {
      state.starUpModalOpen = true;
      state.starUpModalSlot = action.payload;
    },
    closeStarUpModal: (state) => {
      state.starUpModalOpen = false;
      state.starUpModalSlot = -1;
    },
    toggleSacrificeChoice: (state, action: PayloadAction<Hero>) => {
      const slot = state.starUpModalSlot;
      if (slot !== -1) {
        const index = state.chosenSacrifices[slot].findIndex(
          (hero) => hero._id === action.payload._id
        );
        if (index === -1) {
          if (
            state.chosenSacrifices[slot].length ===
            state.upgradeInfo.sacrifices[slot]?.amount
          ) {
            return;
          }
          state.chosenSacrifices[slot].push(action.payload);
        } else {
          state.chosenSacrifices[slot].splice(index, 1);
        }
      }
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
      })
      .addCase(selectHero.fulfilled, (state, action) => {
        state.hero = action.payload.hero;
        state.upgradeInfo = action.payload.upgradeInfo;
        state.chosenSacrifices = new Array(
          action.payload.upgradeInfo.sacrifices.length
        ).fill([]);
      })
      .addCase(selectHero.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(starUp.fulfilled, (state, action) => {
        state.hero = action.payload.hero;
        state.upgradeInfo = action.payload.upgradeInfo;
        state.chosenSacrifices = new Array(
          action.payload.upgradeInfo.sacrifices.length
        ).fill([]);
      })
      .addCase(starUp.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { openStarUpModal, closeStarUpModal, toggleSacrificeChoice } =
  upgradeSlice.actions;

export const hero = (state: RootState) => state.upgrade.hero;

export default upgradeSlice.reducer;
