import apiSlice from "./apiSlice";
import { ORDER_URL } from "./constantURL";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: order,
      }),
    }),
    updatePaymentStatus: builder.mutation({
      query: ({ orderID, paymentData }) => ({
        url: `${ORDER_URL}/${orderID}/payment`,
        method: "PATCH",
        body: paymentData,
      }),
    }),
    fetchOrderById: builder.query({
      query: (orderID) => `${ORDER_URL}/${orderID}`,
    }),
    fetchAllOrders: builder.query({
      query: () => ORDER_URL,
    }),
    fetchMyOrders: builder.query({
      query: () => `${ORDER_URL}/myorders`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdatePaymentStatusMutation,
  useFetchAllOrdersQuery,
  useFetchMyOrdersQuery,
  useFetchOrderByIdQuery,
} = orderApiSlice;
