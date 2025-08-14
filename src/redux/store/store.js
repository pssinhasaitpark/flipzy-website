import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../slices/apiSlice";
import orderReducer from "../slices/orderSlice";
export const store = configureStore({
  reducer: {
    api: apiReducer,
     order: orderReducer,
  },
});
