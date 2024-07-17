import apiSlice from "./apiSlice";
import { PRODUCT_URL } from "./constantURL";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
        method: "GET",
      }),
    }),
    fetchProductBySlug: builder.query({
      query: (slug) => ({
        url: `${PRODUCT_URL}/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAllProductsQuery, useFetchProductBySlugQuery } =
  productApi;
