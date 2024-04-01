import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface Hero {
  _id: string;
  name: string;
  stars: number;
  level: number;
  cp: number;
  image: string;
  in_battle: boolean;
}

interface HeroesState {
  heroes: Hero[];
}

const initialState: HeroesState = {
  heroes: [],
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await axios.get("/api/heroes");
  return response.data;
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const heroes = (state: RootState) => state.heroes.heroes;

export default heroesSlice.reducer;
