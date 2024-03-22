import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const packingListApi = createApi({
    reducerPath: 'packingList',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    tagTypes: ['PackingList'],
    endpoints: (builder) => ({
        packingList: builder.query({
            query: () => 'api/packing_list',
            providesTags: ['PackingList'],
            credentials: 'include',
        }),
        packingListById: builder.query({
            query: (packingList_id) => `api/packing_list/${packingList_id}`,
            providesTags: (result, error, packingList_id) => [{ type: 'PackingList', packingList_id }],
            credentials: 'include',
        }),
        createPackingList: builder.mutation({
            query: (body) => ({
                url: '/api/packing_list',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['PackingList'],
        }),
        updatePackingList: builder.mutation({
            query: ({ packingList_id, ...body }) => {
                return {
                    url: `/api/packing_list/${packingList_id}`,
                    body,
                    method: 'PUT',
                    credentials: 'include',
                };
            },
            invalidatesTags: (result, error, args) => {
                if (!error && result) {
                    return [{ type: 'PackingList' }];
                }
                return null;
            },
        }),
        deletePackingList: builder.mutation({
            query: (packingList_id) => ({
                url: `/api/packing_list/${packingList_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, args) => {
                if (!error && result) {
                    return [{ type: 'PackingList' }];
                }
                return null;
            },
        }),
    }),
});

export const {
    usePackingListQuery,
    useCreatePackingListMutation,
    useUpdatePackingListMutation,
    useDeletePackingListMutation,
    usePackingListByIdQuery,
} = packingListApi;
export default packingListApi.reducer;
