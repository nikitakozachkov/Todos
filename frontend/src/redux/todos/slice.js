import { createSlice } from "@reduxjs/toolkit";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  updateTodoStatus,
} from "./actions";

const todosSlice = createSlice({
  name: "todos",
  initialState: { items: [], isLoading: false, filter: "" },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getTodos.pending](state) {
      state.isLoading = true;
    },
    [getTodos.fulfilled](state, action) {
      state.items = action.payload;
      state.isLoading = false;
    },
    [addTodo.pending](state) {
      state.isLoading = true;
    },
    [addTodo.fulfilled](state, action) {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    [deleteTodo.pending](state) {
      state.isLoading = true;
    },
    [deleteTodo.fulfilled](state, action) {
      state.items = state.items.filter(({ _id }) => _id !== action.payload._id);
      state.isLoading = false;
    },
    [updateTodo.pending](state) {
      state.isLoading = true;
    },
    [updateTodo.fulfilled](state, action) {
      state.items.splice(
        state.items.findIndex(({ _id }) => _id === action.payload._id),
        1,
        action.payload
      );
      state.isLoading = false;
    },
    [updateTodoStatus.pending](state) {
      state.isLoading = true;
    },
    [updateTodoStatus.fulfilled](state, action) {
      state.items.splice(
        state.items.findIndex(({ _id }) => _id === action.payload._id),
        1,
        action.payload
      );
      state.isLoading = false;
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const { setFilter } = todosSlice.actions;
