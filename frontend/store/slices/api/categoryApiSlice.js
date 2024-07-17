import apiSlice from "./apiSlice";
import { CATEGORY_URL } from "./constantURL";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
        method: "GET",
      }),
    }),
    fetchCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
    }),
    createNewCategory: builder.mutation({
      query: (category) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: category,
      }),
    }),
  }),
});

export const {
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
  useCreateNewCategoryMutation,
} = categoryApi;
