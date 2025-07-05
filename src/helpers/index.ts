import { Animated, Dimensions } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as DocumentPicker from 'expo-document-picker';
import { useRef } from "react";

const MAX_WIDTH = 800; // Max width for resizing
const MAX_HEIGHT = 800; // Max height for resizing

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

export const formatDataDB = (today: Date) => {

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate // Output: "2025-06-25"
}

export function formatPhoneNumber(number: string) {
    return number?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Output: 088-650-8240
}

export const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');

export const formatDateBirthDay = (text: string) => {
    // Remove any non-digit characters first
    const cleaned = text.replace(/\D/g, '');

    // If user types full 8 digits
    if (cleaned.length >= 8) {
        const day = cleaned.slice(0, 2).padStart(2, '0');
        const month = cleaned.slice(2, 4).padStart(2, '0');
        const year = cleaned.slice(4, 8);
        return `${day}-${month}-${year}`;
    }

    // If user types partial date, format progressively
    if (cleaned.length >= 4) {
        const day = cleaned.slice(0, 2);
        const month = cleaned.slice(2, 4);
        const rest = cleaned.slice(4);
        return `${day}-${month}${rest ? '-' + rest : ''}`;
    }

    if (cleaned.length > 2) {
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    }

    return cleaned;
};

export function formatDecimal(input: number | string | undefined | null): string {
    const value = Number(input);

    if (isNaN(value)) {
        return '';
    }

    const rounded = Number(value.toFixed(2));
    return Number.isInteger(rounded) ? String(rounded) : value.toFixed(2);
}

export const convertToBase64 = async (fileUri: string) => {
    const base64Content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    return base64Content
}

export const resizeImage = async (mimeType: string, uri: string) => {
    // Resize the image if it's an image file
    if (mimeType && mimeType.startsWith('image/')) {
        const resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: MAX_WIDTH, height: MAX_HEIGHT } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
        return resizedImage.uri
    }
}

export const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        type: ['image/*'],

    });
    if (!result.canceled) {
        const mimeType = result.assets[0].mimeType!
        let urlImage = result.assets[0].uri

        urlImage = await resizeImage(mimeType, urlImage) as string

        const base64 = await convertToBase64(urlImage)

        return base64
    }
};
