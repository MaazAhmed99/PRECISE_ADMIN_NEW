import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState: {
    loading: false,
    error: null,
    success: false,
    logoutSuccess: false,
    user: null,
  },
  reducers: {
    loginSubmit: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
      state.error = false;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    signupSubmit: (state, action) => {
      state.loading = true;
    },
    signupSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
      state.error = false;
    },
    signupError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logoutSubmit: (state, action) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.logoutSuccess = true;
    },
    forgetPasswordSubmit: (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    },
    forgetPasswordSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    resetPasswordSubmit: (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    ClearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.logoutSuccess = false;
    },
  },
});

export const {
  loginSubmit,
  loginSuccess,
  loginError,
  signupSubmit,
  signupSuccess,
  signupError,
  logoutSubmit,
  logoutSuccess,
  forgetPasswordSubmit,
  forgetPasswordSuccess,
  resetPasswordSubmit,
  resetPasswordSuccess,
  ClearState,
} = AuthReducer.actions;

export default AuthReducer.reducer;
