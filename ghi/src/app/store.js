import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import authReducer from './features/auth/authSlice'
import { accommodationsApi } from './accommodationApi';


export const store = configureStore({
    reducer:{
        [accommodationsApi.reducerPath]: accommodationsApi.reducer,
        // auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(accommodationsApi.middleware),
});

setupListeners(store.dispatch)
export default store
