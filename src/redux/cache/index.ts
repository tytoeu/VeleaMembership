import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateInferface } from "./interface";
import i18n from "../../localization";
import themeConfig from "../../util/theme";
import { IUser } from "../../hooks/interface/ISignin";

const initialState: initialStateInferface = {
    locale: 'kh',
    mode: false,
    currentTheme: 'dark',
    theme: themeConfig.dark,
    onBoading: false,
    auth: null
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
        },
        loginAction: (state, action: PayloadAction<IUser | null>) => {
            state.auth = action.payload
        },
        onBoardingDoneAction: (state, action: PayloadAction<boolean>) => {
            state.onBoading = action.payload
        }
    }
});

export const { changeLanguageAction, changeDarkModeAction, loginAction, onBoardingDoneAction } = createCacheSlice.actions

export default createCacheSlice.reducer

export * from './interface'