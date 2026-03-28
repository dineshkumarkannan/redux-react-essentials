import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  persistAuthState,
  rehydrateAuthState,
} from "../features/auth/authSlice";

// Load persisted auth state from localStorage
const preloadedState = {
  auth: rehydrateAuthState(),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

// Subscribe to store changes and persist auth state
store.subscribe(() => {
  persistAuthState(store.getState().auth);
});
