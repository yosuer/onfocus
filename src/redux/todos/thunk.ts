import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../types";

export const fetchAllTodos = createAsyncThunk<Todo[]>(
  "auth/login",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();

    return data as Todo[];
  }
);
