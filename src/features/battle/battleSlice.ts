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
  _id: string;
  registryId: string;
  battleMilestones: BattleMilestone[];
};

export interface BattleState {
  battles: Battle[];
  battleModalOpen: boolean;
  modalBattleHeroes: Hero[];
  modalAvailableHeroes: Hero[];
  dropsModalOpen: boolean;
  drops: Array<Equipment | Stackable | Unstackable | Currency>;
}

const initialState: BattleState = {
  battles: [
    {
      _id: "",
      registryId: "",
      battleMilestones: [],
    },
  ],
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
  async ({
    battle_id,
    heroes_ids,
  }: {
    battle_id: string;
    heroes_ids: string[];
  }) => {
    const response = await axios.patch(`/api/battle/update/${battle_id}`, {
      heroes_ids,
    });
    return response.data;
  }
);

export const claimLoot = createAsyncThunk(
  "battle/claimLoot",
  async (battle_id: string) => {
    const response = await axios.patch(`/api/battle/claim/${battle_id}`);
    return response.data;
  }
);

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
        state.battles = action.payload;
      })
      .addCase(fetchBattle.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateBattleHeroes.fulfilled, (state, action) => {
        state.battles = state.battles.map((battle) =>
          battle._id === action.payload._id ? action.payload : battle
        );
      })
      .addCase(updateBattleHeroes.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(claimLoot.fulfilled, (state, action) => {
        state.battles = state.battles.map((battle) =>
          battle._id === action.payload.battle._id
            ? action.payload.battle
            : battle
        );
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
