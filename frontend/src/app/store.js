import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from './api/apiSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";

let devtoolsEnv;
if (process.env.NODE_ENV === 'development') {
    devtoolsEnv = true;
} else if (process.env.NODE_ENV === 'production') {
    devtoolsEnv = false;
}

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: devtoolsEnv
});

setupListeners(store.dispatch);