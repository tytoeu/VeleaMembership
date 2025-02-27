import { StyleSheet } from "react-native";

const menuStyle = StyleSheet.create({
    card: {
        marginBottom: 12,
        padding: 8,
        marginHorizontal: 12,
        borderRadius: 3,
        shadowOffset:
        {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    textTitle: {
        fontSize: 16,
        fontFamily: 'R900',
        marginBottom: 8,
        textTransform: 'capitalize',
        lineHeight: 24
    },
    text: {
        opacity: 0.8,
        fontFamily: 'R500',
        lineHeight: 22,
        fontSize: 15
    }
})

export default menuStyle