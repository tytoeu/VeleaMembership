import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../hooks/interface/ISignin";
import { initialStateInferface } from "./interface";
import { IMenu } from "../../hooks/interface/IMenu";
import themeConfig from "../../util/theme";
import i18n from "../../localization";
import { Alert } from "react-native";

interface IUpdateQuality {
    keyIncrease: number;
    symbol: string;
}

const initialState: initialStateInferface = {
    locale: 'en',
    mode: false,
    currentTheme: 'light',
    theme: themeConfig.light,
    onBoading: false,
    auth: null,
    cartList: [],
    keyIncrease: 0,
    incorrectCode: 0,
    countNotify: 0,
    totalPrice: 0
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
        },
        setIncorrectCodeAction: (state, action: PayloadAction<number>) => {
            state.incorrectCode = action.payload
        },
        setNotificationCount: (state, action: PayloadAction<number>) => {
            if (action.payload == 0) state.countNotify = 0
            else state.countNotify = action.payload + state.countNotify
        }
    }
});

export const {
    changeLanguageAction,
    changeDarkModeAction,
    loginAction,
    onBoardingDoneAction,
    setIncorrectCodeAction,
    setNotificationCount
} = createCacheSlice.actions

export default createCacheSlice.reducer

export * from './interface'