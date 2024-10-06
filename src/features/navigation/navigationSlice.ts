import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum NavigationTabs {
  BATTLE = 0,
  HEROES = 1,
  SUMMON = 2,
  UPGRADE = 3,
}

export interface NavigationState {
  tab: NavigationTabs;
}

const initialState: NavigationState = {
  tab: NavigationTabs.HEROES,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<NavigationTabs>) => {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("upgrade/selectHero", (state) => {
      state.tab = NavigationTabs.UPGRADE;
    });
  },
});

export const { setTab } = navigationSlice.actions;

export const tab = (state: RootState) => state.navigation.tab;

export default navigationSlice.reducer;
