import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginProps } from "../../types";

interface LoginError {
  errorMessage: string;
}

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const authLogin = createAsyncThunk<
  string,
  LoginProps,
  {
    rejectValue: LoginError;
  }
>("auth/login", async ({ email, password }, thunkApi) => {
  // Login wiht any backend endpoint:
  // const response = await fetch('https://authentication-server.com');
  // const { token } = await response.json();
  await timeout(3000);
  if (email === "test@test.com" && password === "123456") {
    const token = "any-jwt-token";

    return token;
  }
  return thunkApi.rejectWithValue({ errorMessage: "Authentication error" });
});
