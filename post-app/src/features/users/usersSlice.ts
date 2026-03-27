import { createSlice } from "@reduxjs/toolkit";

import { selectCurrentUser } from "../auth/authSlice";
import type { RootState } from "../../app/store";
import { createAppAsyncThunk } from "../../app/withTypes";
import { client } from "../../api/client";

interface User {
  id: string;
  name: string;
}

export const fetchUsers = createAppAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get<User[]>("/fakeApi/users");
  return response.data;
});

const initialState: User[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;

export const selectCurrentUserName = (state, RootState) => {
  const currentUsername = selectCurrentUser(state);
  return selectUserById(state, currentUsername);
};

export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find((user) => user.id === userId);
