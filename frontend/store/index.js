// frontend/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import apiSlice from './slices/api/apiSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import orderApiSlice from './slices/api/orderApiSlice';
import reviewApiSlice from './slices/api/reviewApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, reviewApiSlice.middleware),
  devTools: true,
});

export default store;
