// store/slices/api/reviewApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApiSlice = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (productId) => `/reviews/${productId}`,
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewApiSlice;

export default reviewApiSlice;
