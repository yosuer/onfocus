import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { authLogin, authLogout } from "./thunk";

interface AuthState {
  token: string;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
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
    builder.addCase(authLogout.fulfilled, (state) => {
      state.token = "";
    });
  },
});

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
