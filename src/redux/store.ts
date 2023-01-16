import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import todosReducer from "./todos/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
