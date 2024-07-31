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
  }),
});

export const { useCreateOrderMutation, useUpdatePaymentStatusMutation } =
  orderApiSlice;
