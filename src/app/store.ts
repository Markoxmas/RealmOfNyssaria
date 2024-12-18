import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationSlice from "../features/navigation/navigationSlice";
import heroesSlice from "../features/heroes/heroesSlice";
import summonSlice from "../features/summon/summonSlice";
import upgradeSlice from "../features/upgrade/upgradeSlice";
import inventorySlice from "../features/inventory/inventorySlice";
import battleSlice from "../features/battle/battleSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    heroes: heroesSlice,
    summon: summonSlice,
    upgrade: upgradeSlice,
    inventory: inventorySlice,
    battle: battleSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
