import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { sub } from "date-fns";
import { userLoggedOut } from "../auth/authSlice";

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

const initialState: Post[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    user: "0",
    reactions: {
      likes: 1,
      dislikes: 1,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    user: "1",
    reactions: {
      likes: 1,
      dislikes: 1,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        console.log("prepate", title, content);
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            user: userId,
            reactions: {
              likes: 0,
              dislikes: 0,
            },
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
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
    builder.addCase(userLoggedOut, (state) => {
      return [];
    });
  },
});

export const { postAdded, postDeleted, postUpdated, reactionsAdded } =
  postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post: Post) => post.id === postId);

export default postsSlice.reducer;
