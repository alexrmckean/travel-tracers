import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

export const authApi = createApi({
  reducerPath: 'authentication',
  tagTypes: ['Token'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_HOST,
  }),
  endpoints: builder => ({
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

          method: 'post',
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
});


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});



export const { setToken } = authSlice.actions;
export default authSlice.reducer;
export const {
useLoginMutation,
useGetTokenQuery,
} = authApi;
