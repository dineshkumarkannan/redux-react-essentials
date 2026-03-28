/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../app/api/apiClient";

/**
 * LOGIN
 * Server sets refresh cookie + returns access token
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await apiClient.post("/auth/login", credentials, {
        withCredentials: false, // send/receive cookies
      });

      return res.data; // { accessToken, user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed",
      );
    }
  },
);

/**
 * REFRESH ACCESS TOKEN (uses httpOnly cookie automatically)
 */
export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.post(
        "/auth/refresh",
        {},
        {
          withCredentials: false,
        },
      );

      return res.data.accessToken;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Session expired");
    }
  },
);

/**
 * LOGOUT
 * Server clears cookie
 */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await apiClient.post("/auth/logout", {}, { withCredentials: false });
});
