import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { authLogin } from "./thunk";

interface AuthState {
  token: string;
  error: string | null;
}

const initialState: AuthState = {
  token: "",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, { payload }) => {
      state.token = payload;
    });
    builder.addCase(authLogin.rejected, (state, { payload }) => {
      state.error = payload?.errorMessage || "Login error default";
      state.token = "";
    });
    builder.addCase(authLogin.pending, (state) => {
      state.error = null;
    });
  },
});

export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
