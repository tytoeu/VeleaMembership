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
    locale: 'kh',
    mode: false,
    currentTheme: 'dark',
    theme: themeConfig.dark,
    onBoading: false,
    auth: null,
    cartList: [],
    keyIncrease: 0,
    incorrectCode: 0
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
        addToCartAction: (state, action: PayloadAction<IMenu>) => {
            const food = action.payload
            const foodList = state.cartList
            if (food) {
                const index = foodList.findIndex(x => x.itemId == food.itemId)
                if (index !== -1) {
                    foodList[index].qty += 1;
                    state.cartList = foodList;
                } else {
                    const newItem: IMenu = { ...food, increaseKey: state.keyIncrease, qty: 1 };
                    state.cartList = [newItem, ...state.cartList];
                    state.keyIncrease += 1
                }
                return
            }
            Alert.alert('Warning !', 'Item is not found.')
        },
        updateQualityAction: (state, action: PayloadAction<IUpdateQuality>) => {
            const symbol = action.payload.symbol
            const key = action.payload.keyIncrease
            const foods = state.cartList
            const index = foods.findIndex(x => x.increaseKey === key)
            if (symbol === '+') {
                foods[index].qty += 1
            } else {
                if (foods[index].qty === 1) {
                    foods.splice(index, 1);
                } else {
                    foods[index].qty -= 1
                }
            }
            foods.length == 0 ? state.keyIncrease = 0 : undefined

            state.cartList = foods
        },
        setIncorrectCodeAction: (state, action: PayloadAction<number>) => {
            state.incorrectCode = action.payload
        }
    }
});

export const {
    changeLanguageAction,
    changeDarkModeAction,
    loginAction,
    onBoardingDoneAction,
    addToCartAction,
    updateQualityAction,
    setIncorrectCodeAction } = createCacheSlice.actions

export default createCacheSlice.reducer

export * from './interface'