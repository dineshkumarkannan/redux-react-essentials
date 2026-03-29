import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshAccessToken, logoutUser } from "./authThunks";
import type { RootState } from "../../app/hooks";

// LocalStorage persistence helpers
const AUTH_KEY = "authState";

export function persistAuthState(state: AuthState) {
  try {
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    );
  } catch {}
}

export function rehydrateAuthState(): Partial<AuthState> {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export type AuthState = {
  accessToken: string | null;
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Used by interceptor after refresh
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REFRESH TOKEN
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isAuthenticated = true;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { setAccessToken } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
