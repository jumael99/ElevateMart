import apiSlice from "./apiSlice";
import { subcatagory_URL } from "./constantURL";  

export const subcatagoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllSubCategories: builder.query({
      query: () => ({
        url: subcatagory_URL,  
        method: "GET",
      }),
    }),
    fetchSubCategoryBySlug: builder.query({
      query: (slug) => ({
        url: `${subcatagory_URL}/${slug}`,
        method: "GET",
      }),
    }),
    createNewSubCategory: builder.mutation({
      query: (subCategory) => ({
        url: subcatagory_URL,
        method: "POST",
        body: subCategory,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, ...subCategory }) => ({
        url: `${subcatagory_URL}/${id}`,
        method: "PATCH",
        body: subCategory,
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `${subcatagory_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchAllSubCategoriesQuery,
  useFetchSubCategoryBySlugQuery,
  useCreateNewSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subcatagoriesApi;
