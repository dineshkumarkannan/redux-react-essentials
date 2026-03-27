import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

import type { RootState } from "../../app/store";
import { userLoggedOut } from "../auth/authSlice";
import { client } from "../../api/client";
import { createAppAsyncThunk } from "../../app/withTypes";

export const fetchPosts = createAppAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await client.get<Post[]>("/fakeApi/posts");
    console.log("response", response);
    return response.data;
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState());
      if (postsStatus !== "idle") {
        return false;
      }
    },
  },
);

export const addNewPost = createAppAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await client.post<Post>("/fakeApi/posts", initialPost);
    return response.data;
  },
);

export interface Reactions {
  likes: number;
  dislikes: number;
}

export type ReactionName = keyof Reactions;

export interface Post {
  id: string;
  title: string;
  content: string;
  user?: string;
  date: string;
  reactions: Reactions;
}

interface PostsState {
  posts: Post[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    postDeleted: (state, action) => {},
    reactionsAdded: (state, action) => {
      const { postId, reaction } = action.payload as {
        postId: string;
        reaction: keyof Reactions;
      };
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, (state) => {
        return initialState;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts.push(...action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.posts.push(action.payload);
      });
  },
});

export const { postUpdated, reactionsAdded } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post: Post) => post.id === postId);

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
