import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accommodationsApi } from './accommodationApi';
import { accountsApi } from './accountsApi';
import { packingListApi } from './packingListApi';
import { budgetApi } from './budgetApi';


export const store = configureStore({
    reducer: {
        [accommodationsApi.reducerPath]: accommodationsApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
        [packingListApi.reducerPath]: packingListApi.reducer,
        [budgetApi.reducerPath]: budgetApi.reducer,
        // auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accommodationsApi.middleware)
            .concat(accountsApi.middleware)
            .concat(packingListApi.middleware)
            .concat(budgetApi.middleware)
})

setupListeners(store.dispatch)
export default store
