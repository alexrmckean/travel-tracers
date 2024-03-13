import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const packingListApi = createApi({
    reducerPath: 'packingList',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    tagTypes: ['PackingList'],
    endpoints: (builder) => ({
        packingList: builder.query({
            query: () => 'api/packing_list',
            providesTags: ['PackingList'],
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
                    url: `/api/packing_list/${packing_list_id}`,
                    body,
                    method: 'PUT',
                    credentials: 'include',
                }},
                invalidatesTags: ['PackingList'],
        }),
        deletePackingList: builder.mutation({
            query: (packingList_id) => ({
                url: 'api/packing_list/${packingList_id}',
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, args) => {
                console.log(result, error, args)
                return [
                    {type: 'packing_list', id: 'MINE'},
                    {type: 'packing_list', id: packing_list_id}
                ]
            }
        }),
    }),
});

export const {
    usePackingListQuery,
    useCreatePackingListMutation,
    useUpdatePackingListMutation,
    useDeletePackingListMutation,
} = packingListApi
export default packingListApi.reducer;
