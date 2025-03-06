import { StyleSheet } from "react-native";

const history_style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    profile: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 16
    },
    card: {
        borderRadius: 8,
        marginTop: 20
    },
    name_text: {
        textAlign: 'center',
        fontFamily: 'R900',
        paddingTop: 12,
        opacity: 0.9,
        fontSize: 16,
        paddingBottom: 12
    }
})

export default history_style