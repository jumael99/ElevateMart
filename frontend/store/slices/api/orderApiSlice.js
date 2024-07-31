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
    getMyOrders: builder.query({
      query: () => `${ORDER_URL}/myOrders`,  
    }),
    getOrderById: builder.query({
      query: (id) => `${ORDER_URL}/${id}`,
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useUpdatePaymentStatusMutation, 
  useGetMyOrdersQuery,  
  useGetOrderByIdQuery 
} = orderApiSlice;

export default orderApiSlice;
