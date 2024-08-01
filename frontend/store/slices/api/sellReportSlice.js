// store/slices/api/sellReportApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SELL_REPORT_URL } from './constantURL'; 

const sellReportApiSlice = createApi({
  reducerPath: 'sellReportApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),  
  endpoints: (builder) => ({
    fetchSellReport: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `${SELL_REPORT_URL}?startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchSellReportQuery } = sellReportApiSlice;
export default sellReportApiSlice;
