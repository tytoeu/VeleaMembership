import { Dimensions } from "react-native";

export const formatNumber = (value: string) => {
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parseFloat(value));
}

export const formCurrency = (numberString: string) => {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const WIDTH = Dimensions.get('screen').width
export const HEIGHT = Dimensions.get('screen').height

export const SPACING = 10
export const FONT_SIZE = 14