import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const budgetApi = createApi({
    reducerPath: 'budgets',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        budgets: builder.query({
            query: () => 'api/budgets',
        }),
    })
})
export const { useBudgetsQuery } = budgetApi
