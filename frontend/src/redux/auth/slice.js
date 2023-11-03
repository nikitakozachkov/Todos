import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, logoutUser, refreshUser } from "./actions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { username: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isError: false,
  },
  extraReducers: {
    [signupUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [signupUser.rejected](state) {
      state.isError = true;
      return state;
    },
    [loginUser.fulfilled](state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected](state) {
      state.isError = true;
      return state;
    },
    [logoutUser.fulfilled](state) {
      state.isLoggedIn = false;
      state.user = { username: null, email: null };
      state.token = null;
    },
    [refreshUser.fulfilled](state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
