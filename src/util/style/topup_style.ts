import { Dimensions, StyleSheet } from "react-native";
const WIDTH = Dimensions.get('window').width
const topup_style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 25
    },
    item: {
        padding: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 10,
        width: WIDTH / 3 - 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    input_text: {
        height: 50,
        width: WIDTH - 80,
        marginTop: 0,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    payment: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10,
        width: WIDTH - 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    pay_now: {
        backgroundColor: '#ca6f1e',
        width: WIDTH - 40,
        marginBottom: 20,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1
    }
});

export default topup_style;