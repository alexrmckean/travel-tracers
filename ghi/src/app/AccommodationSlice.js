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
        accommodationsById: builder.query({
            query: (accommodation_id) => `api/accommodations/${accommodation_id}`,
            providesTags: (result, error, accommodation_id) => [{ type: 'Accommodation', accommodation_id }],
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
                method: "PUT",
                credentials: "include",
            }},
        }),
        deleteAccommodations: builder.mutation({
            query: (accommodaiton_id) => ({
                url: `/api/accommodations/${accommodaiton_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (response, error, arg) => {
                console.log({response, error, arg})
                return [
                    {type: 'accommodations', id: 'MINE'},
                    {type: 'accommodaitons', id: accommodaiton_id}
                ]
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
        })
export const { useAccommodationsQuery, useAccommodationsByIdQuery, useLoginMutation, useCreateAccommodationsMutation, useUpdateAccommodationsMutation, useDeleteAccommodationsMutation, } = accommodationsApi
