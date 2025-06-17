import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGuest } from "./interface";

const createTempSlice = createSlice({
    name: 'temp',
    initialState: {
        isforget: false,
        isRegisterCard: false,
        navigate: null as string | null,
        tempAuth: null as IGuest | null,
        personalChange: false
    },
    reducers: {
        actionForgetPassword: (state, action: PayloadAction<boolean>) => {
            state.isforget = action.payload
        },
        actionCreateCard: (state, action: PayloadAction<boolean>) => {
            state.isRegisterCard = action.payload
        },
        actionNavigate: (state, action: PayloadAction<string | null>) => {
            state.navigate = action.payload
        },
        actionStoreTempAuth: (state, action: PayloadAction<IGuest>) => {
            state.tempAuth = action.payload;
        },
        actionChangePersonalInfor: (state, action: PayloadAction<boolean>) => {
            state.personalChange = action.payload
        }
    }
})

export const {
    actionForgetPassword,
    actionCreateCard,
    actionNavigate,
    actionStoreTempAuth,
    actionChangePersonalInfor
} = createTempSlice.actions

export default createTempSlice.reducer