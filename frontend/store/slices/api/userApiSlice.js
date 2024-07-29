import apiSlice from "./apiSlice";
import { USER_URL } from "./constantURL";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMyProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateMyProfile: builder.mutation({
      query: (profileData) => ({
        url: `${USER_URL}/`,
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useFetchMyProfileQuery, useUpdateMyProfileMutation } = userApi;
