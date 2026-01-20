import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TPost } from "../schema";

interface LocalPostsState {
  posts: TPost[];
}

// Load initial state from localStorage
const loadFromStorage = (): TPost[] => {
  try {
    const stored = localStorage.getItem("localPosts");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: LocalPostsState = {
  posts: loadFromStorage(),
};

const localPostsSlice = createSlice({
  name: "localPosts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<TPost>) => {
      state.posts.unshift(action.payload);
      localStorage.setItem("localPosts", JSON.stringify(state.posts));
    },
    getPostById: (state) => {
      return state;
    },
  },
  selectors: {
    selectAllLocalPosts: (state) => state.posts,
    selectLocalPostById: (state, id: number) =>
      state.posts.find((post) => post.id === id),
  },
});

export const { addPost } = localPostsSlice.actions;
export const { selectAllLocalPosts, selectLocalPostById } =
  localPostsSlice.selectors;
export default localPostsSlice.reducer;
