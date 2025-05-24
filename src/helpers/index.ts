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

export const formatDate = (today: Date) => {

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate // Output: "17-05-2024"
}

export function formatPhoneNumber(number: string) {
    return number?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Output: 088-650-8240
}

export const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');