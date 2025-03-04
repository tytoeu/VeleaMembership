import { StyleSheet } from "react-native";

export const NavigateStyle = StyleSheet.create({
    container: {
        marginLeft: 16,
        flexDirection: 'row'
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10
    },
    textName: {
        fontSize: 15,
        fontFamily: 'R700',
        textTransform: 'capitalize',
        opacity: 0.8,
        paddingBottom: 5
    },
    wellcome: {
        fontSize: 12,
        opacity: 0.6
    }
})