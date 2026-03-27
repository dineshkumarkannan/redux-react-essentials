import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { sub } from "date-fns";

export interface Post {
  id: string;
  title: string;
  content: string;
  user?: string;
  date: string;
}

const initialState: Post[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    user: "0",
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    user: "1",
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
  },
});

export const { postAdded, postDeleted, postUpdated } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post: Post) => post.id === postId);

export default postsSlice.reducer;
