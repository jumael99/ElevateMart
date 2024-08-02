import apiSlice from "./apiSlice";

const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data,
      }),
    }),
    getMessages: builder.query({
      query: () => '/contact',
      providesTags: ['Contact'],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
} = contactApiSlice;

export default contactApiSlice;