import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itineraryApi = createApi({
    reducerPath: 'itinerary',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        itinerary: builder.query({
            query: () => 'api/itinerary',
        }),
        itineraryById: builder.query({
            query: (itinerary_id) => `api/itinerary/${itinerary_id}`,
            providesTags: (result, error, itinerary_id) => [{ type: 'itinerary', itinerary_id }],
        }),
        createItinerary: builder.mutation({
            query: (body) => ({
                url: '/api/itinerary',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['ItineraryList']
        }),
        updateItinerary: builder.mutation({
            query: ({ itinerary_id, ...body }) => {
                return {
                url: `api/itinerary/${itinerary_id}`,
                body,
                method: "PUT",
                credentials: "include",
            }},
        }),
        deleteItinerary: builder.mutation({
            query: (itinerary_id) => ({
                url: `/api/itinerary/${itinerary_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (response, error, arg) => {
                console.log({response, error, arg})
                return [
                    {type: 'itinerary', id: 'MINE'},
                    {type: 'itinerary', id: itinerary_id}
                ]
            }
        }),
    }),
})



export const { useItineraryQuery, useItineraryByIdQuery, useCreateItineraryMutation, useUpdateItineraryMutation, useDeleteItineraryMutation } = itineraryApi
export default itineraryApi.reducer;
