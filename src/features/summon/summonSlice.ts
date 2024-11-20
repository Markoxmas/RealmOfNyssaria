import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Hero } from "../heroes/heroesSlice";
import axios from "axios";

export interface SummonState {
  summonedHeroes: Hero[];
  modalOpen: boolean;
}

const initialState: SummonState = {
  summonedHeroes: [],
  modalOpen: false,
};

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
      .addCase(summonHeroes.fulfilled, (state, action) => {
        state.summonedHeroes = action.payload.summonedHeroes;
        state.modalOpen = true;
      })
      .addCase(summonHeroes.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { closeModal } = summonSlice.actions;

export default summonSlice.reducer;
