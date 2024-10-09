import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type BattleMilestone = {
  monster_hp: number;
  start_time: number;
  collective_cp: number;
  heroes_ids: string[];
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
        monster_hp: 100,
        start_time: Date.now(),
        collective_cp: 0,
        heroes_ids: [],
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
