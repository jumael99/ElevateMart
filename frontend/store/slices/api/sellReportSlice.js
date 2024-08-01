// store/slices/api/sellReportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

 const initialState = {
  data: { totalRevenue: 0, totalProductsSold: 0 },
  status: 'idle', 
  error: null,
};

 export const fetchSellReport = createAsyncThunk(
  'sellReport/fetchSellReport',
  async ({ startDate, endDate }) => {
    const response = await fetch(`/api/orders/sell/report?startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  }
);

// Create the slice
const sellReportSlice = createSlice({
  name: 'sellReport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSellReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default sellReportSlice.reducer;
