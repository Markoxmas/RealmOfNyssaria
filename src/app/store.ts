import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import navigationSlice from "../features/navigation/navigationSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    navigation: navigationSlice,
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
