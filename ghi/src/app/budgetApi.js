import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const budgetApi = createApi({
    reducerPath: 'budgets',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        budgets: builder.query({
            query: () => 'api/budgets',
            providesTags: ['BudgetList']
        }),
        createBudget: builder.mutation({
            query: (body) => ({
                url: '/api/budgets',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['BudgetList']
        })
    })
})
export const { useBudgetsQuery, useCreateBudgetMutation } = budgetApi
export default budgetApi.reducer;
