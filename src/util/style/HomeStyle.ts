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
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 25,
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
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 25,
        resizeMode: 'contain'
    },
    code_card: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text_balance: {
        fontFamily: 'R700',
        opacity: 0.5
    },
    balance_number: {
        fontFamily: 'R900',
        fontSize: 22,
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
        flexWrap: 'wrap',
        alignSelf: 'center'
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
        position: 'relative'
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
    },
    redom: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginBottom: 10
    },
    coming_soon: {
        position: 'absolute',
        color: 'white',
        backgroundColor: 'rgba(255, 0, 0,0.8)',
        fontFamily: 'R900',
        fontSize: 10,
        padding: 5,
        borderRadius: 5,
        top: 32,
        overflow: 'hidden',
        paddingHorizontal: 10
    }
})

export default home_style