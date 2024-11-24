import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Hero } from "../heroes/heroesSlice";
import {
  Currency,
  Equipment,
  Stackable,
  Unstackable,
} from "../inventory/types/itemSystem";

export type BattleMilestone = {
  monster_hp: number;
  start_time: number;
  collective_cp: number;
  heroes: Hero[];
};

export type Battle = {
  battleMilestones: BattleMilestone[];
};

export interface BattleState {
  battle: Battle;
  battleModalOpen: boolean;
  modalBattleHeroes: Hero[];
  modalAvailableHeroes: Hero[];
  dropsModalOpen: boolean;
  drops: Array<Equipment | Stackable | Unstackable | Currency>;
}

const initialState: BattleState = {
  battle: {
    battleMilestones: [],
  },
  battleModalOpen: false,
  modalBattleHeroes: [],
  modalAvailableHeroes: [],
  dropsModalOpen: false,
  drops: [],
};

export const fetchBattle = createAsyncThunk("battle/fetchBattle", async () => {
  const response = await axios.get("/api/battle");
  return response.data;
});

export const updateBattleHeroes = createAsyncThunk(
  "battle/updateBattleHeroes",
  async (heroes_ids: string[]) => {
    const response = await axios.patch("/api/battle/update", {
      heroes_ids,
    });
    return response.data;
  }
);

export const claimLoot = createAsyncThunk("battle/claimLoot", async () => {
  const response = await axios.patch("/api/battle/claim");
  return response.data;
});

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    openBattleModal: (state) => {
      state.battleModalOpen = true;
    },
    closeBattleModal: (state) => {
      state.battleModalOpen = false;
    },
    initModalBattleHeroes: (state, action: PayloadAction<Hero[]>) => {
      state.modalBattleHeroes = action.payload;
    },
    initModalAvailableHeroes: (state, action: PayloadAction<Hero[]>) => {
      state.modalAvailableHeroes = action.payload;
    },
    addHeroToBattle: (state, action: PayloadAction<Hero>) => {
      if (state.modalBattleHeroes.length < 5) {
        state.modalBattleHeroes = [...state.modalBattleHeroes, action.payload];
        state.modalAvailableHeroes = state.modalAvailableHeroes.filter(
          (hero) => hero._id !== action.payload._id
        );
      }
    },
    removeHeroFromBattle: (state, action: PayloadAction<Hero>) => {
      state.modalBattleHeroes = state.modalBattleHeroes.filter(
        (hero) => hero._id !== action.payload._id
      );
      state.modalAvailableHeroes = [
        ...state.modalAvailableHeroes,
        action.payload,
      ];
    },
    openDropsModal: (state) => {
      state.dropsModalOpen = true;
    },
    closeDropsModal: (state) => {
      state.dropsModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBattle.fulfilled, (state, action) => {
        state.battle = action.payload;
      })
      .addCase(fetchBattle.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateBattleHeroes.fulfilled, (state, action) => {
        state.battle = action.payload;
      })
      .addCase(updateBattleHeroes.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(claimLoot.fulfilled, (state, action) => {
        state.battle = action.payload.battle;
        state.drops = action.payload.drops;
      })
      .addCase(claimLoot.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const {
  openBattleModal,
  closeBattleModal,
  initModalBattleHeroes,
  initModalAvailableHeroes,
  addHeroToBattle,
  removeHeroFromBattle,
  openDropsModal,
  closeDropsModal,
} = battleSlice.actions;

export default battleSlice.reducer;
