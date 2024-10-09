import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type BattleMilestone = {
  monsterHp: number;
  startTime: number;
  collectiveCp: number;
  heroesIds: string[];
};

export type Battle = {
  id: string;
  battleMilestones: BattleMilestone[];
};

export interface BattleState {
  battle: Battle;
}

const initialState: BattleState = {
  battle: {
    id: "initial",
    battleMilestones: [
      {
        monsterHp: 100,
        startTime: Date.now(),
        collectiveCp: 0,
        heroesIds: [],
      },
    ],
  },
};

export const fetchBattle = createAsyncThunk("battle/fetchBattle", async () => {
  const response = await axios.get("/api/battle");
  return response.data;
});

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBattle.fulfilled, (state, action) => {
        state.battle = action.payload[0];
      })
      .addCase(fetchBattle.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const {} = battleSlice.actions;

export default battleSlice.reducer;
