import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5001/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include', // Add this line to include credentials
});

export const reviewApiSlice = createApi({
  reducerPath: 'reviewApi',
  baseQuery,
  tagTypes: ['Review'],
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
      query: (productId) => `/reviews/product/${productId}`,
      providesTags: ['Review'],
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
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
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