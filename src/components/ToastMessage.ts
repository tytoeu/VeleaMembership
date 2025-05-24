import Toast from 'react-native-root-toast';

export const ToastMessage = (message: string, color?: string, bgColor?: string): string => {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: bgColor || 'green',
        textColor: color || '#fff',
        textStyle: { fontSize: 14, paddingHorizontal: 8 }
    });
    return toast;
}