import { Dimensions, StyleSheet } from "react-native";

const home_style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    credit_card: {
        width: '90%',
        minHeight: 180,
        marginTop: 20,
        borderRadius: 8,
        paddingHorizontal: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    balance_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 25,
        resizeMode: 'contain'
    },
    code_card: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text_balance: {
        fontFamily: 'R700',
        opacity: 0.5
    },
    balance_number: {
        fontFamily: 'R900',
        fontSize: 18,
    },
    code: {
        fontFamily: 'R700',
        fontSize: 16,
        opacity: 0.5
    },
    hide_button: {
        padding: 8
    },
    menu_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 16,
        flexWrap: 'wrap'
    },
    menu_button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '48%',
        marginBottom: 20,
        height: 50,
        paddingHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    menu_btn_text: {
        paddingLeft: 12,
        fontFamily: 'R500',
        fontSize: 14
    },
    tran_history_text: {
        alignSelf: 'flex-start',
        marginLeft: '6%',
        fontFamily: 'R500',
        marginTop: 10,
        fontSize: 16,
        opacity: 0.8
    }
})

export default home_style