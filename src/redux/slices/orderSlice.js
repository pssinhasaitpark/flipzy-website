import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import qs from "qs";

// export const fetchOrderByUserAndSellerId = createAsyncThunk(
//   "order/fetchOrderByUserAndSellerId",
//   async ({ userId, sellerId }, { rejectWithValue }) => {
//     try {
//     //   const formData = qs.stringify({
//         // module_action: "fetchOrderByUserAndSellerId",
//         // user_id: userId,
//         // seller_id: sellerId,

//         const formData = "fetchOrderByUserAndSellerId";
      
//       const response = await axios.post(
//         "https://berrybazaar.co.in/admin/Application-API/admin-apis.php",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
//           },
//         }
//       );
//       console.log("Order response:", response);
//       return response.data.result || []; // Return the 'result' array from the API response
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch orders"
//       );
//     }
//   }
// );


export const fetchOrderByUserAndSellerId = createAsyncThunk(
  "order/fetchOrderByUserAndSellerId",
  async ({ userId, sellerId }, { rejectWithValue }) => {
    try {
      const formData = {
        module_action: "fetchOrderByUserAndSellerId",
        user_id: userId,
        seller_id: sellerId,
      };

      const response = await axios.post(
        "https://berrybazaar.co.in/admin/Application-API/admin-apis.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );

      if (response.data.status === "0") {
        return rejectWithValue(response.data.message || "Failed to fetch orders");
      }

      return response.data.result || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserAndSellerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByUserAndSellerId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchOrderByUserAndSellerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
