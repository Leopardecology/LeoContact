import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from './api/apiSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";

let devtoolsEnv;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    devtoolsEnv = true;
} else if (process.env.NODE_ENV === 'production') {
    devtoolsEnv = false;
} else {
    console.error('NODE_ENV not set');
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