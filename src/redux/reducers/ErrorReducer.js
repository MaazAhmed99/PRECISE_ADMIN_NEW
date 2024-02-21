import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const ErrorReducer = createSlice({
  name: "ErrorReducer",
  initialState: {
    error: [],
  },
  reducers: {
    SetError: (state, action) => {
      console.log("from error reducer action payload", [action.payload]);
      state.error = [...action.payload];
    },
    RemoveError: (state) => {
      state.error = [];
    },
  },
});

export const { SetError, RemoveError } = ErrorReducer.actions;

export default ErrorReducer.reducer;
