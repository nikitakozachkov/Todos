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
      return state;
    },
    [loginUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [loginUser.rejected](state) {
      state.isError = true;
      return state;
    },
    [logoutUser.fulfilled](state) {
      state.user = { username: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const authReducer = authSlice.reducer;
