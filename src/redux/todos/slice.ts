import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination, Todo } from "../../types";
import { fetchAllTodos } from "./thunk";
import { RootState } from "../store";

interface TodosState {
  items: Todo[];
  pagination: Pagination;
  error: string | null;
}

interface TodoToggleCompleted {
  id: number;
  completed: boolean;
}

const initialState: TodosState = {
  items: [],
  pagination: {
    page: 0,
    rowsPerPage: 5,
  },
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    changeRowsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.rowsPerPage = action.payload;
    },
    toggleCompleted: (state, action: PayloadAction<TodoToggleCompleted>) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);

      if (index !== undefined) {
        state.items[index] = { ...state.items[index], completed };
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((todo) => todo.id === action.payload);

      state.items.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.fulfilled, (state, { payload }) => {
      state.items = payload;
    });
    builder.addCase(fetchAllTodos.rejected, (state) => {
      state.error = "Error fetching Todos";
    });
    builder.addCase(fetchAllTodos.pending, (state) => {
      state.error = null;
    });
  },
});

export const selectItemsPage = (state: RootState) => {
  const { items, pagination } = state.todos;
  const { page, rowsPerPage } = pagination;
  const start = page === 0 ? 0 : page * rowsPerPage;
  const end = start + rowsPerPage;
  return {
    items: items.slice(start, end),
    total: items.length,
  };
};

export const selectPagination = (state: RootState) => state.todos.pagination;

export const { changePage, changeRowsPerPage, toggleCompleted, deleteTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
