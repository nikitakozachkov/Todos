import { createSlice } from '@reduxjs/toolkit';
import { signupUser, loginUser, logoutUser, refreshUser } from './actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { username: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: {
    [signupUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      alert("Please verify your email");
    },
    [signupUser.rejected](state, action) {
      alert("Email already in use");
      return state;
    },
    [loginUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      alert('Login successful');
    },
    [loginUser.rejected](state) {
      alert('Incorrect email or password');
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