import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountsApi = createApi({
    reducerPath: 'accounts',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => '/api/accounts',
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: '/api/accounts',
                body: data,
                method: 'POST',
            }),
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
            }),
            providesTags: ['Account']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE'
            }),
            invalidatesTags: ['Account']
        }),
        signup: builder.mutation({
            query: body => ({
                url: '/api/accounts'
                // body,
                // method: 'POST',
            }),
            invalidatesTags: ['Account']
        }),
            login: builder.mutation({
                query: () => ({
                    url: '/token'
                })
        })
    }),
})

export const {
    useGetAccountsQuery,
    useCreateAccountMutation,
    useGetTokenQuery,
    useLogoutMutation,
    useSignupMutation,
    useLoginMutation,
} = accountsApi;
