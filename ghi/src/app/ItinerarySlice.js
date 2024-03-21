import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itineraryApi = createApi({
    reducerPath: 'itinerary',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        itinerary: builder.query({
            query: () => 'api/itinerary',
            providesTags: ['ItineraryList'],
            credentials: 'include',
        }),
        itineraryById: builder.query({
            query: (itinerary_id) => `api/itinerary/${itinerary_id}`,
            providesTags: (result, error, itinerary_id) => [{ type: 'itinerary', itinerary_id }],
            credentials: 'include',
        }),
        createItinerary: builder.mutation({
            query: (body) => ({
                url: '/api/itinerary',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['ItineraryList'],
            // Add `onSuccess` handler to automatically update cache
            onSuccess: (data, variables, api) => {
                api.invalidateQueries('ItineraryList');
            }
        }),
        updateItinerary: builder.mutation({
            query: ({ itinerary_id, ...body }) => {
                return {
                    url: `api/itinerary/${itinerary_id}`,
                    body,
                    method: "PUT",
                    credentials: "include",
                };
            },
            invalidatesTags: ['ItineraryList'],
            onSuccess: (data, variables, api) => {
                api.invalidateQueries('ItineraryList');
            }
        }),
        deleteItinerary: builder.mutation({
            query: (itinerary_id) => ({
                url: `/api/itinerary/${itinerary_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return [{ type: 'ItineraryList' }];
                }
                // If there's an error or no result, return null to prevent cache invalidation
                return null;
            }
        }),
    }),
});

export const { useItineraryQuery, useItineraryByIdQuery, useCreateItineraryMutation, useUpdateItineraryMutation, useDeleteItineraryMutation } = itineraryApi;
export default itineraryApi.reducer;
