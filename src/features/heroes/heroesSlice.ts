import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { levelUp } from "../upgrade/upgradeSlice";
import { summonHeroes } from "../summon/summonSlice";
import { starUp } from "../upgrade/upgradeSlice";

export interface Hero {
  _id: string;
  name: string;
  stars: number;
  level: number;
  cp: number;
  image: string;
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
      })
      .addCase(levelUp.fulfilled, (state, action) => {
        if (action.payload.hero) {
          state.heroes = [...state.heroes].map((hero) => {
            if (hero._id === action.payload.hero._id) {
              return action.payload.hero;
            }
            return hero;
          });
        }
      })
      .addCase(summonHeroes.fulfilled, (state, action) => {
        state.heroes = [...state.heroes, ...action.payload.summonedHeroes];
      })
      .addCase(starUp.fulfilled, (state, action) => {
        state.heroes = [...state.heroes]
          .map((hero) => {
            if (hero._id === action.payload.hero._id) {
              return action.payload.hero;
            }
            return hero;
          })
          .filter((hero) => !action.payload.deletedHeroes.includes(hero._id));
      });
  },
});

export const heroes = (state: RootState) => state.heroes.heroes;

export default heroesSlice.reducer;
