import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Hero } from "../heroes/heroesSlice";
import axios from "axios";

export interface SummonState {
  scrollsOfSummon: number;
  summonedHeroes: Hero[];
  modalOpen: boolean;
}

const initialState: SummonState = {
  scrollsOfSummon: 0,
  summonedHeroes: [],
  modalOpen: false,
};

export const fetchScrollData = createAsyncThunk(
  "summon/fetchScrollData",
  async () => {
    const response = await axios.get("/api/inventory");
    return response.data;
  }
);

export const summonHeroes = createAsyncThunk(
  "summon/summonHeroes",
  async (amount: number) => {
    const response = await axios.post(`/api/summon/${amount}`);
    return response.data;
  }
);

export const summonSlice = createSlice({
  name: "summon",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modalOpen = false;
      state.summonedHeroes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScrollData.fulfilled, (state, action) => {
        //You should change the logic when more routes are developed for it
        state.scrollsOfSummon = action.payload[0].scroll_of_summon;
      })
      .addCase(fetchScrollData.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(summonHeroes.fulfilled, (state, action) => {
        state.summonedHeroes = action.payload.summonedHeroes;
        state.scrollsOfSummon = action.payload.scrollOfSummon;
        state.modalOpen = true;
      })
      .addCase(summonHeroes.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { closeModal } = summonSlice.actions;

export const scrolls = (state: RootState) => state.summon.scrollsOfSummon;

export default summonSlice.reducer;
