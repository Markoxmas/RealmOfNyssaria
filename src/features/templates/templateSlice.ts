import { createSlice } from "@reduxjs/toolkit";

export interface TemplateState {}

const initialState: TemplateState = {};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = templateSlice.actions;

export default templateSlice.reducer;
