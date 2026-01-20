import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: ({ query }) => ({
    getPosts: query<any[], void>({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
