import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGuest } from "./interface";
import { ModalSheetBottomRef } from "../../components/ModalSheetBottom";
import { ILocation } from "../../hooks/interface/IAddress";

const createTempSlice = createSlice({
    name: 'temp',
    initialState: {
        isforget: false,
        isRegisterCard: false,
        navigate: null as string | null,
        tempAuth: null as IGuest | null,
        personalChange: false,
        ref: null as ModalSheetBottomRef | null,
        addressSeleted: null as ILocation | null
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
        },
        setBottomSheetRef(state, action: PayloadAction<ModalSheetBottomRef | null>) {
            state.ref = action.payload;
        },
        locationSeleted: (state, action: PayloadAction<ILocation | null>) => {
            state.addressSeleted = action.payload
        }
    }
})

export const {
    actionForgetPassword,
    actionCreateCard,
    actionNavigate,
    actionStoreTempAuth,
    actionChangePersonalInfor,
    setBottomSheetRef,
    locationSeleted
} = createTempSlice.actions

export default createTempSlice.reducer