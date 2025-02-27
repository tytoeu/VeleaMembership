import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateInferface } from "./interface";

const initialState: initialStateInferface = {
    heightTab: 0
}
const createMenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateHeightTab: (state, action: PayloadAction<number>) => {
            state.heightTab = action.payload
        },
    }
});

export const { updateHeightTab } = createMenuSlice.actions

export default createMenuSlice.reducer

export * from './interface'