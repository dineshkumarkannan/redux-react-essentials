import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  persistAuthState,
  rehydrateAuthState,
} from "../features/auth/authSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";

import type { AuthState } from "../features/auth/authSlice";
const rehydrated = rehydrateAuthState();
const preloadedState: { auth: AuthState } = {
  auth: {
    accessToken: rehydrated.accessToken ?? null,
    user: rehydrated.user ?? null,
    isAuthenticated: rehydrated.isAuthenticated ?? false,
    loading: false,
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
  preloadedState,
});

// Subscribe to store changes and persist auth state
store.subscribe(() => {
  persistAuthState(store.getState().auth);
});
