import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateInferface } from "./interface";

const initialState: initialStateInferface = {
    heightTab: 0,
    cateId: 0,
    subCateId: 0,
    search: null
}
const createMenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateHeightTab: (state, action: PayloadAction<number>) => { state.heightTab = action.payload },
        categorySeleted: (state, action: PayloadAction<number>) => { state.cateId = action.payload },
        subCategorySeleted: (state, action: PayloadAction<number>) => { state.subCateId = action.payload },
        searchAction: (state, action: PayloadAction<string | null>) => { state.search = action.payload }
    }
});

export const {
    updateHeightTab,
    categorySeleted,
    subCategorySeleted,
    searchAction
} = createMenuSlice.actions

export default createMenuSlice.reducer

export * from './interface'