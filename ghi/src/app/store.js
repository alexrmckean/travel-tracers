import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accommodationsApi } from './accommodationApi';
import  accountReducer  from './AccountSlice';
import { packingListApi } from './packingListApi';
import { budgetApi } from './budgetApi';


export const store = configureStore({
    reducer: {
        [accommodationsApi.reducerPath]: accommodationsApi.reducer,
        [packingListApi.reducerPath]: packingListApi.reducer,
        [budgetApi.reducerPath]: budgetApi.reducer,
        // [AccountSlice.reducerPath]: AccountSlice.reducer,
        account: accountReducer,
        // auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accommodationsApi.middleware)
            .concat(packingListApi.middleware)
            .concat(budgetApi.middleware)
})

setupListeners(store.dispatch)
export default store
