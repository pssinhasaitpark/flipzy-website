import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching pincode data
export const fetchPincodeData = createAsyncThunk(
  "shipping/fetchPincodeData",
  async (pincode, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pincode data");
      }

      const data = await response.json();

      // Check if the response contains valid data
      if (data && data.length > 0 && data[0].Status === "Success") {
        return data[0];
      } else {
        throw new Error("Invalid pincode or no data found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  pincodeData: null,
  isLoading: false,
  error: null,
  cityOptions: [],
  selectedCity: "",
  selectedState: "",
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    clearPincodeData: (state) => {
      state.pincodeData = null;
      state.cityOptions = [];
      state.selectedCity = "";
      state.selectedState = "";
      state.error = null;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPincodeData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPincodeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pincodeData = action.payload;

        // Extract unique post office names (Name) from post offices
        const uniqueCities = [
          ...new Set(action.payload.PostOffice.map((office) => office.Name)),
        ];

        state.cityOptions = uniqueCities;

        // Auto-select first city and state if available
        if (action.payload.PostOffice.length > 0) {
          state.selectedCity = action.payload.PostOffice[0].Name;
          state.selectedState = action.payload.PostOffice[0].State;
        }
      })
      .addCase(fetchPincodeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.pincodeData = null;
        state.cityOptions = [];
        state.selectedCity = "";
        state.selectedState = "";
      });
  },
});

export const {
  clearPincodeData,
  setSelectedCity,
  setSelectedState,
  clearError,
} = shippingSlice.actions;

export default shippingSlice.reducer;
