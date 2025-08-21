import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPaymentMethodsBySellerId = createAsyncThunk(
  "payment/fetchPaymentMethodsBySellerId",
  async ({ sellerId }, { rejectWithValue }) => {
    try {
      const formData = {
        module_action: "getPaymentMethodsBySellerId",
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
        return rejectWithValue(
          response.data.message || "Failed to fetch payment methods"
        );
      }

      console.log("Payment methods response:", response.data.result);
      return response.data.result || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payment methods"
      );
    }
  }
);

export const addPaymentMethodBySellerId = createAsyncThunk(
  "payment/addPaymentMethodBySellerId",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://berrybazaar.co.in/admin/Application-API/admin-apis.php",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );
      if (response.data.status === "0") {
        return rejectWithValue(
          response.data.message || "Failed to add payment method"
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add payment method"
      );
    }
  }
);

export const updatePaymentMethodBySellerId = createAsyncThunk(
  "payment/updatePaymentMethodBySellerId",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://berrybazaar.co.in/admin/Application-API/admin-apis.php",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );
      if (response.data.status === "0") {
        return rejectWithValue(
          response.data.message || "Failed to update payment method"
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update payment method"
      );
    }
  }
);

export const deletePaymentMethodBySellerId = createAsyncThunk(
  "payment/deletePaymentMethodBySellerId",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://berrybazaar.co.in/admin/Application-API/admin-apis.php",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );
      if (response.data.status === "0") {
        return rejectWithValue(
          response.data.message || "Failed to delete payment method"
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete payment method"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentMethods: [],
    loading: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Payment Methods
      .addCase(fetchPaymentMethodsBySellerId.pending, (state) => {
        state.loading.getPaymentMethodsBySellerId = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethodsBySellerId.fulfilled, (state, action) => {
        state.loading.getPaymentMethodsBySellerId = false;
        console.log("Payment methods fetched successfully:", action.payload);
        state.paymentMethods = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchPaymentMethodsBySellerId.rejected, (state, action) => {
        state.loading.getPaymentMethodsBySellerId = false;
        state.error = action.payload;
      })
      // Add Payment Method
      .addCase(addPaymentMethodBySellerId.pending, (state) => {
        state.loading.addPaymentMethodBySellerId = true;
        state.error = null;
      })
      .addCase(addPaymentMethodBySellerId.fulfilled, (state) => {
        state.loading.addPaymentMethodBySellerId = false;
      })
      .addCase(addPaymentMethodBySellerId.rejected, (state, action) => {
        state.loading.addPaymentMethodBySellerId = false;
        state.error = action.payload;
      })
      // Update Payment Method
      .addCase(updatePaymentMethodBySellerId.pending, (state) => {
        state.loading.updatePaymentMethodBySellerId = true;
        state.error = null;
      })
      .addCase(updatePaymentMethodBySellerId.fulfilled, (state) => {
        state.loading.updatePaymentMethodBySellerId = false;
      })
      .addCase(updatePaymentMethodBySellerId.rejected, (state, action) => {
        state.loading.updatePaymentMethodBySellerId = false;
        state.error = action.payload;
      })
      // Delete Payment Method
      .addCase(deletePaymentMethodBySellerId.pending, (state) => {
        state.loading.deletePaymentMethodBySellerId = true;
        state.error = null;
      })
      .addCase(deletePaymentMethodBySellerId.fulfilled, (state) => {
        state.loading.deletePaymentMethodBySellerId = false;
      })
      .addCase(deletePaymentMethodBySellerId.rejected, (state, action) => {
        state.loading.deletePaymentMethodBySellerId = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
