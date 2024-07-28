import { createSlice } from "react-redux";

const initialState = {
  cart: [],
  cartTotal: 0,
  discount: 0,
  totalPayableAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1, itemPrice: item.updatedPrice });
      }
      state.cartTotal += item.price;
      state.totalPayableAmount += item.updatedPrice;
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i._id === item._id);
      state.cart = state.cart.filter((i) => i._id != item._id);
      state.cartTotal -= item.price * item.quantity;
      state.totalPayableAmount -=
        existingItem.itemPrice * existingItem.quantity;
    },
    deleteFromCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i._id === item._id);
      const totalPrice = existingItem.itemPrice * existingItem.quantity;
      state.cartTotal -= totalPrice;
    },
    increaseQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i._id === item._id);
      existingItem.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i._id === item._id);
      if (existingItem.quantity === 1) {
        return;
      }
      existingItem.quantity -= 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
