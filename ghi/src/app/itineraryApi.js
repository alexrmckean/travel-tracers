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
    })
})
export const { useItineraryQuery } = itineraryApi
