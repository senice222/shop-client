import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    paymentType: "ruCard"
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        chooseType: (state, action) => {
            state.paymentType = action.payload
        }
    }
})

export const {chooseType} = paymentSlice.actions

export default paymentSlice.reducer