import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const accommodationsApi = createApi({
    reducerPath: 'accommodations',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        accommodations: builder.query({
            query: () => 'api/accommodations',
            providesTags: ['AccommodationsList']
        }),
        accommodationsById: builder.query({
            query: (accommodation_id) => `api/accommodations/${accommodation_id}`,
            providesTags: (result, error, accommodation_id) => [{ type: 'Accommodation', accommodation_id }],
            credentials: "include",
        }),
        createAccommodations: builder.mutation({
            query: (body) => ({
                url: '/api/accommodations',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['AccommodationsList']
        }),
        updateAccommodations: builder.mutation({
            query: ({ accommodation_id, ...body }) => ({
                url: `api/accommodations/${accommodation_id}`,
                body,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, { accommodation_id }) => [
                { type: 'AccommodationsList' },
                { type: 'Accommodation', accommodation_id }
            ],
            onSuccess: (data, { accommodation_id }, api) => {
                api.invalidateQueries('AccommodationsList');
                api.invalidateQueries(['Accommodation', accommodation_id]);
            }
        }),
        deleteAccommodations: builder.mutation({
            query: (accommodation_id) => ({
                url: `/api/accommodations/${accommodation_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return [{ type: 'AccommodationsList' }];
                }
                // If there's an error or no result, return null to prevent cache invalidation
                return null;
            }
        }),
    }),
});

export const {
    useAccommodationsQuery,
    useAccommodationsByIdQuery,
    useCreateAccommodationsMutation,
    useUpdateAccommodationsMutation,
    useDeleteAccommodationsMutation,
} = accommodationsApi;
