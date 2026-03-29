import { redirect } from "react-router-dom";
import { store } from "../store";
import { selectCurrentToken } from "../../features/auth/authSlice";

// Helper to also check isAuthenticated
import type { RootState } from "../hooks";
function selectIsAuthenticated(state: RootState) {
  return state.auth.isAuthenticated;
}

export async function requireAuth() {
  const state = store.getState();
  const accessToken = selectCurrentToken(state);
  const isAuthenticated = selectIsAuthenticated(state);

  // If not authenticated, redirect to login
  if (!accessToken || !isAuthenticated) {
    throw redirect("/auth");
  }
  // If authenticated, allow navigation
  return null;
}
