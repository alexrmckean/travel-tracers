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
        login: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                formData = new FormData(info);
                } else {
                formData = new FormData();
                formData.append('username', info.username);
                formData.append('password', info.password);
                }
                return {
                url: '/token',
                method: 'POST',
                body: formData,
                credentials: 'include',
                };
            },
            invalidatesTags: result => {
                return (result && ['Account']) || [];
            },
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',

                credentials: 'include',
            }),
            providesTags: ['Account'],
            }),
        }),
        })
export const { useAccommodationsQuery, useLoginMutation} = accommodationsApi
