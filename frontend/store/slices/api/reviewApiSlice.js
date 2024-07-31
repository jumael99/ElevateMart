import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewApiSlice = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),
    getReviews: builder.query({
      query: (productId) => `/reviews/${productId}`,
    }),
    canReviewProduct: builder.query({
      query: (productId) => `/reviews/can-review/${productId}`,
    }),
    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/reviews/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useCanReviewProductQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;

export default reviewApiSlice;
