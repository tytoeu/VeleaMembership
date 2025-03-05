import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateInferface } from "./interface";

const initialState: initialStateInferface = {
    heightTab: 0,
    cateId: '',
    subCateId: ''
}
const createMenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateHeightTab: (state, action: PayloadAction<number>) => { state.heightTab = action.payload },
        categorySeleted: (state, action: PayloadAction<string>) => { state.cateId = action.payload },
        subCategorySeleted: (state, action: PayloadAction<string>) => { state.subCateId = action.payload },
    }
});

export const {
    updateHeightTab,
    categorySeleted,
    subCategorySeleted
} = createMenuSlice.actions

export default createMenuSlice.reducer

export * from './interface'