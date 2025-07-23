import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import qs from "qs";
export const fetchModuleData = createAsyncThunk(
  "api/fetchModuleData",
  async ({ module_action, params = {} }, { rejectWithValue }) => {
    try {
      const formData = qs.stringify({
        module_action,
        ...params,
      });
      const response = await axiosInstance.post("", formData);
      console.log("slidceResponces", response.data, module_action);
      return { data: response.data, module_action };
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data || error.message,
        module_action,
      });
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: {},
    data: {},
    error: {},
  },
  reducers: {
    clearApiState: (state) => {
      state.loading = {};
      state.data = {};
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModuleData.pending, (state, action) => {
        const { module_action } = action.meta.arg;
        state.loading[module_action] = true;
        state.error[module_action] = null;
      })
      .addCase(fetchModuleData.fulfilled, (state, action) => {
        const { module_action, data } = action.payload;
        state.loading[module_action] = false;
        state.data[module_action] = data;
        state.error[module_action] = null;
      })
      .addCase(fetchModuleData.rejected, (state, action) => {
        const { module_action, error } = action.payload || {};
        state.loading[module_action] = false;
        state.error[module_action] = error || "Something went wrong";
      });
  },
});

export const { clearApiState } = apiSlice.actions;
export default apiSlice.reducer;
