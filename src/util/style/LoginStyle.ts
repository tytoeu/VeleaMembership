import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        textAlign: 'left',
        fontSize: 22,
        fontFamily: 'R900',
        lineHeight: 35,
        opacity: 0.9
    },
    textConainter: {
        width: '90%',
        marginVertical: 30
    },
    text: {
        fontSize: 16,
        fontFamily: 'R500',
        paddingBottom: 24
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        marginTop: 16
    },
    icon: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%'
    }
});

export default LoginStyle