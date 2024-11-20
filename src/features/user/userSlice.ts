import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ChangeEvent } from "react";

export interface UserState {
  userId: string | null;
  isLogin: boolean;
  username: string;
  password: string;
  repeatPassword: string;
}

const initialState: UserState = {
  userId: localStorage.getItem("userId")
    ? (localStorage.getItem("userId") as string)
    : null,
  isLogin: true,
  username: "",
  password: "",
  repeatPassword: "",
};

export const register = createAsyncThunk(
  "user/register",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post("/api/auth/register", {
      username,
      password,
    });

    localStorage.setItem("userId", response.data.userId);

    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post("/api/auth/login", {
      username,
      password,
    });

    localStorage.setItem("userId", response.data.userId);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    goToLogin: (state) => {
      state.isLogin = true;
      state.username = "";
      state.password = "";
      state.repeatPassword = "";
    },
    goToRegister: (state) => {
      state.isLogin = false;
      state.username = "";
      state.password = "";
      state.repeatPassword = "";
    },
    onUpdateField: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      switch (action.payload.id) {
        case "username":
          state.username = action.payload.value;
          break;
        case "password":
          state.password = action.payload.value;
          break;
        case "repeatPassword":
          state.repeatPassword = action.payload.value;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { goToLogin, goToRegister, onUpdateField } = userSlice.actions;

export default userSlice.reducer;
