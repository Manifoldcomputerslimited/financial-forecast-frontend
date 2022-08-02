import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/auth"
import zohoReducer from "./slices/zoho"

const store = configureStore({
    reducer: {
        auth: authReducer,
        zoho: zohoReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export { store }