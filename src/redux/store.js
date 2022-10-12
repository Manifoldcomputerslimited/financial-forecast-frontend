import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/auth"
import zohoReducer from "./slices/zoho"
import userReducer from "./slices/user"
import forecastReducer from "./slices/forecast"

const store = configureStore({
    reducer: {
        auth: authReducer,
        zoho: zohoReducer,
        user: userReducer,
        forecast: forecastReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export { store }