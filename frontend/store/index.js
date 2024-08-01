// frontend/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import apiSlice from './slices/api/apiSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import orderApiSlice from './slices/api/orderApiSlice';
import sellReportReducer from './slices/api/sellReportSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    sellReport: sellReportReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
