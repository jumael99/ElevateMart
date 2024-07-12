import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constantURL";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth", "User", "Product"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
