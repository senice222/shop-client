import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    paymentType: "rub"
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        chooseType: (state, action) => {
            const variants = "rub" | "btc" | "usdt" | "ltc" | "xmr"
            state.paymentType = action.payload
        }
    }
})

export const {chooseType} = paymentSlice.actions

export default paymentSlice.reducer