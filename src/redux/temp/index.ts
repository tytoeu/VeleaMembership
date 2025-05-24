import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const createTempSlice = createSlice({
    name: 'temp',
    initialState: {
        isforget: false,
    },
    reducers: {
        actionForgetPassword: (state, action: PayloadAction<boolean>) => {
            state.isforget = action.payload
        }
    }
})

export const {
    actionForgetPassword
} = createTempSlice.actions

export default createTempSlice.reducer