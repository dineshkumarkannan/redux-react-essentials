import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/hooks";
import * as api from "./api";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostsState = {
  items: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPostsThunk = createAsyncThunk("posts/fetchAll", async () => {
  return await api.fetchPosts();
});

export const fetchPostThunk = createAsyncThunk(
  "posts/fetchOne",
  async (id: number) => {
    return await api.fetchPost(id);
  },
);

export const createPostThunk = createAsyncThunk(
  "posts/create",
  async (data: { title: string; body: string }) => {
    return await api.createPost(data);
  },
);

export const updatePostThunk = createAsyncThunk(
  "posts/update",
  async ({
    id,
    data,
  }: {
    id: number;
    data: { title: string; body: string };
  }) => {
    return await api.updatePost(id, data);
  },
);

export const deletePostThunk = createAsyncThunk(
  "posts/delete",
  async (id: number) => {
    await api.deletePost(id);
    return id;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
