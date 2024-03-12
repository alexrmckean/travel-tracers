import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accommodationsApi } from './accommodationApi';
import  accountReducer  from './AccountSlice';
import { packingListApi } from './packingListApi';
import { budgetApi } from './budgetApi';
import { itineraryApi } from './itineraryApi';
import logoutReducer from './logoutSlice';


export const store = configureStore({
    reducer: {
        [accommodationsApi.reducerPath]: accommodationsApi.reducer,
        [packingListApi.reducerPath]: packingListApi.reducer,
        [budgetApi.reducerPath]: budgetApi.reducer,
        [itineraryApi.reducerPath]: itineraryApi.reducer,
        account: accountReducer,
        logout: logoutReducer,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accommodationsApi.middleware)
            .concat(packingListApi.middleware)
            .concat(budgetApi.middleware)
            .concat(itineraryApi.middleware)
})

setupListeners(store.dispatch)
export default store
