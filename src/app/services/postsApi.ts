import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TPost } from "../schema";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, // For Vite
  }),
  endpoints: ({ query }) => ({
    getPosts: query<TPost[], void>({
      query: () => "/posts",
    }),
    getPostById: query<TPost, number>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
