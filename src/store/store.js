import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from "./slices/userSlice";
import {paymentSlice} from "./slices/paymentSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        payment: paymentSlice.reducer
    },
})