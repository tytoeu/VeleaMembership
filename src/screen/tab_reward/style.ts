import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal_overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_content: {
        width: '80%',
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    modal_close: {
        position: 'absolute',
        top: -15,
        right: -15,
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#fee1e1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_image: {
        width: '100%',
        height: '50%',
        backgroundColor: '#f2f4f4',
        borderRadius: 5
    },
    button: {
        marginTop: 16,
        position: 'absolute',
        width: '100%',
        bottom: 16,
        alignSelf: 'center',
        backgroundColor: '#955440'
    },
    item_name: {
        fontSize: 14,
        fontFamily: 'R700',
        marginTop: 12
    },
    item_type: {
        fontSize: 12,
        fontFamily: 'R500',
        opacity: 0.8,
    },
    description: {
        paddingVertical: 10,
        lineHeight: 20,
        fontSize: 14,
        fontFamily: 'R500'
    },
    qrcode: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 12
    }
})