import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/hooks";
import * as api from "./api";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk("users/fetchAll", async () => {
  return await api.fetchUsers();
});

export const fetchUserThunk = createAsyncThunk(
  "users/fetchOne",
  async (id: number) => {
    return await api.fetchUser(id);
  },
);

export const createUserThunk = createAsyncThunk(
  "users/create",
  async (data: { firstName: string; lastName: string; email: string }) => {
    return await api.createUser(data);
  },
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async ({
    id,
    data,
  }: {
    id: number;
    data: { firstName: string; lastName: string; email: string };
  }) => {
    return await api.updateUser(id, data);
  },
);

export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (id: number) => {
    await api.deleteUser(id);
    return id;
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
