import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accommodationsApi } from './AccommodationSlice';
import accountReducer from './AccountSlice';
import { packingListApi } from './PackingSlice';
import { itineraryApi } from './ItinerarySlice';
import logoutReducer from './LogoutSlice';
import { authApi } from './AuthSlice';
import authReducer from './AuthSlice';
import { budgetApi } from './BudgetSlice';

export const store = configureStore({
    reducer: {
        [accommodationsApi.reducerPath]: accommodationsApi.reducer,
        [packingListApi.reducerPath]: packingListApi.reducer,
        [budgetApi.reducerPath]: budgetApi.reducer,
        [itineraryApi.reducerPath]: itineraryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        account: accountReducer,
        logout: logoutReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accommodationsApi.middleware)
            .concat(packingListApi.middleware)
            .concat(itineraryApi.middleware)
            .concat(authApi.middleware)
            .concat(budgetApi.middleware),
});

setupListeners(store.dispatch);

export default store;
