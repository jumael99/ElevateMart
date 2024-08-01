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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProductById: builder.mutation({
      query: (product) => ({
        url: `${PRODUCT_URL}/${product.id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    fetchCartProductsQuantity: builder.query({
      query: (products) => ({
        url: `${PRODUCT_URL}/quantity`,
        method: "GET",
        body: products,
      }),
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductBySlugQuery,
  useCreateNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductByIdMutation,
  useFetchCartProductsQuantityQuery,
} = productApi;
