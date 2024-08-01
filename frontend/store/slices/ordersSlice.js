import { createSlice } from "@reduxjs/toolkit";
import { orders } from "@/lib/orders";

const ordersSlice = createSlice({
  name: "orders",
  initialState: orders,
  reducers: {
    updatePaymentStatus: (state, action) => {
      const order = state.find((order) => order.id === action.payload.id);
      if (order) {
        order.paymentStatus = action.payload.status;
      }
    },
    updateDeliveryStatus: (state, action) => {
      const order = state.find((order) => order.id === action.payload.id);
      if (order) {
        order.delStatus = action.payload.status;
      }
    },
  },
});

export const { updatePaymentStatus, updateDeliveryStatus } = ordersSlice.actions;
export default ordersSlice.reducer;