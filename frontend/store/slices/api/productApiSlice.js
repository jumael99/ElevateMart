import apiSlice from "./apiSlice";
import { PRODUCT_URL } from "./constantURL";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    fetchProductBySlug: builder.query({
      query: (slug) => ({
        url: `${PRODUCT_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    createNewProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCT_URL,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductBySlugQuery,
  useCreateNewProductMutation,
} = productApi;
