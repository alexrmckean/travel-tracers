import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accommodationsApi = createApi({
    reducerPath: 'accommodations',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        accommodations: builder.query({
            query: () => 'api/accommodations',
        }),
    }),
})

export const { useAccommodationsQuery } = accommodationsApi
