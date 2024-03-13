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
        }),
        updateBudget: builder.mutation({
            query: ({ budget_id, ...body }) => {
                return {
                url: `api/budgets/${budget_id}`,
                body,
                method: "PUT",
                credentials: "include",
            }},
        }),
        deleteBudget: builder.mutation({
            query: (budget_id) => ({
                url: `/api/budgets/${budget_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (response, error, arg) => {
                console.log({response, error, arg})
                return [
                    {type: 'budgets', id: 'MINE'},
                    {type: 'budgets', id: budget_id}
                ]
            }
        }),
    }),
})

export const { useBudgetsQuery, useCreateBudgetMutation, useUpdateBudgetMutation, useDeleteBudgetMutation } = budgetApi
export default budgetApi.reducer;
