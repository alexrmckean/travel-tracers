import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const accommodationsApi = createApi({
    reducerPath: 'accommodations',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
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
        accommodations: builder.query({
            query: () => 'api/accommodations',
        }),
        accommodationsById: builder.query({
            query: (accommodation_id) => `api/accommodations/${accommodation_id}`,
            providesTags: (result, error, accommodation_id) => [{ type: 'Accommodation', accommodation_id }],
        }),
        createAccommodations: builder.mutation({
            query: (body) => ({
                url: '/api/accommodations',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['AccommodationsList']
        }),
        updateAccommodations: builder.mutation({
            query: ({ accommodation_id, ...body }) => {
                return {
                    url: `api/accommodations/${accommodation_id}`,
                    body,
                    method: 'PUT',
                    credentials: 'include',
                };
            },
            invalidatesTags: ['AccommodationsList'],
             onSuccess: (data, variables, api) => {
                api.invalidateQueries('AccomomodationsList');
             }
        }),
        deleteAccommodations: builder.mutation({
            query: (accommodation_id) => ({
                url: `/api/accommodations/${accommodation_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return [{ type: 'AccommodationsList' }];
                }
                // If there's an error or no result, return null to prevent cache invalidation
                return null;
            }
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            providesTags: ['Account'],
        }),
    }),
});

export const {
    useAccommodationsQuery,
    useAccommodationsByIdQuery,
    useLoginMutation,
    useCreateAccommodationsMutation,
    useUpdateAccommodationsMutation,
    useDeleteAccommodationsMutation,
} = accommodationsApi;
