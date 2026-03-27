import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface AuthState {
  username: string | null;
}

const initialState: AuthState = {
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.username = action.payload;
    },
    userLoggedOut(state) {
      state.username = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.username;

export default authSlice.reducer;
