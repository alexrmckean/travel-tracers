import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const budgetApi = createApi({
    reducerPath: 'budgets',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        budgets: builder.query({
            query: () => 'api/budgets',
            providesTags: ['BudgetList'],
        }),
        budgetById: builder.query({
            query: (budget_id) => `api/budgets/${budget_id}`,
            providesTags: (result, error, budget_id) => [{ type: 'Budget', budget_id }],
            credentials: "include",
        }),
        createBudget: builder.mutation({
            query: (body) => ({
                url: '/api/budgets',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['BudgetList'],
            onSuccess: (data, variables, api) => {
                api.invalidateQueries('BudgetList');
            }
        }),
        updateBudget: builder.mutation({
            query: ({ budget_id, ...body }) => {
                return {
                    url: `api/budgets/${budget_id}`,
                    body,
                    method: "PUT",
                    credentials: "include",
                };
            },
            invalidatesTags: ['BudgetList'],
            onSuccess: (data, variables, api) => {
                api.invalidateQueries('BudgetList');
            }
        }),
        deleteBudget: builder.mutation({
            query: (budget_id) => ({
                url: `/api/budgets/${budget_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return [{ type: 'BudgetList' }];
                }
                return null;
            }
        }),
    }),
});

export const { useBudgetsQuery, useBudgetByIdQuery, useCreateBudgetMutation, useUpdateBudgetMutation, useDeleteBudgetMutation } = budgetApi;
export default budgetApi.reducer;
