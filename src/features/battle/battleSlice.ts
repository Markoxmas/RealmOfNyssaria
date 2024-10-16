import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Hero } from "../heroes/heroesSlice";

export type BattleMilestone = {
  monster_hp: number;
  start_time: number;
  collective_cp: number;
  heroes: Hero[];
};

export type Battle = {
  _id: string;
  battleMilestones: BattleMilestone[];
};

export type Drops = {
  [key: string]: number;
};

export interface BattleState {
  battle: Battle;
  battleModalOpen: boolean;
  modalBattleHeroes: Hero[];
  modalAvailableHeroes: Hero[];
  dropsModalOpen: boolean;
  drops: Drops;
}

const initialState: BattleState = {
  battle: {
    _id: "",
    battleMilestones: [],
  },
  battleModalOpen: false,
  modalBattleHeroes: [],
  modalAvailableHeroes: [],
  dropsModalOpen: false,
  drops: {
    gold: 0,
    scrollOfSummon: 0,
  },
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
  async ({
    battle_id,
    inventory_id,
  }: {
    battle_id: string;
    inventory_id: string;
  }) => {
    const response = await axios.patch(
      `/api/battle/claim/${battle_id}/${inventory_id}`
    );
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
        state.battle = action.payload[0];
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
        state.drops.gold = action.payload.drops.gold;
        state.drops.scrollOfSummon = action.payload.drops.scroll_of_summon;
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
