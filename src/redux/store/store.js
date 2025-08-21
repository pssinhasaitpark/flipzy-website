import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../slices/apiSlice";
import orderReducer from "../slices/orderSlice";
import paymentReducer from "../slices/paymentSlice";
export const store = configureStore({
  reducer: {
    api: apiReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});
