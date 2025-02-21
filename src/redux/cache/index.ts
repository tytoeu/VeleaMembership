import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateInferface } from "./interface";
import i18n from "../../localization";
import themeConfig from "../../util/theme";

const initialState: initialStateInferface = {
    locale: 'kh',
    mode: false,
    currentTheme: 'light',
    theme: themeConfig.light
}
const createCacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        changeLanguageAction: (state, action: PayloadAction<string>) => {
            state.locale = action.payload
            i18n.locale = action.payload
        },
        changeDarkModeAction: (state) => {
            state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
            state.theme = themeConfig[state.currentTheme];
        }
    }
});

export const { changeLanguageAction, changeDarkModeAction } = createCacheSlice.actions

export default createCacheSlice.reducer

export * from './interface'