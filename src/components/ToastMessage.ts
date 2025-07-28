import Toast from 'react-native-root-toast';

export const ToastMessage = (message: string, color?: string, bgColor?: string): string => {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: bgColor || 'black',
        textColor: color || '#fff',
        textStyle: { fontSize: 12, paddingHorizontal: 8, lineHeight: 22 }
    });
    return toast;
}