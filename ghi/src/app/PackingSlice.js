import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const packingListApi = createApi({
    reducerPath: 'packingList',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        packingList: builder.query({
            query: () => 'api/packing_list',
        }),
    }),
})

export const { usePackingListQuery } = packingListApi
