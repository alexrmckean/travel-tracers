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
        createItinerary: builder.mutation({
            query: (body) => ({
                url: '/api/itinerary',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['ItineraryList']
        })
    })
})









export const { useItineraryQuery, useCreateItineraryMutation } = itineraryApi
export default itineraryApi.reducer;
