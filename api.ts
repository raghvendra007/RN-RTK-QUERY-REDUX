import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const myPost = createApi({
  reducerPath: 'myPost',
  baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.2.2:3000/'}),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], string>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),

    newPost: builder.mutation<Post, Post>({
      query: post => ({
        method: 'POST',
        url: 'posts',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {useGetPostsQuery, useNewPostMutation} = myPost;
