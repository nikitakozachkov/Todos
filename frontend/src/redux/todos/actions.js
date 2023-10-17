import { createAsyncThunk } from "@reduxjs/toolkit";
import * as todoAPI from "services/todo-api";

export const getTodos = createAsyncThunk(
  "todos/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const todos = await todoAPI.getTodos();
      return todos;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todo, { rejectWithValue }) => {
    try {
      const todos = await todoAPI.addTodo(todo);
      return todos;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteById",
  async (id, { rejectWithValue }) => {
    try {
      const todos = await todoAPI.deleteTodo(id);
      return todos;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateById",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const todos = await todoAPI.updateTodo(data);
      return todos;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodoStatus = createAsyncThunk(
  "todos/updateTodoStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const todos = await todoAPI.updateTodoStatus(id, status);
      return todos;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
