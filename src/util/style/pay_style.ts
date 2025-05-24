import { Dimensions, StyleSheet } from "react-native"

const WIDTH = Dimensions.get('screen').width

const pay_style = StyleSheet.create({
    card: {
        width: '90%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginHorizontal: 16
    },
    wallet_ballance: {
        fontFamily: 'R500',
        fontSize: 16,
        lineHeight: 25
    },
    balance_value: {
        fontSize: 18,
        fontFamily: 'R900'
    },
    pay_content: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        borderRadius: 8,
        flexDirection: 'row'
    },
    pay_text: {
        color: '#000',
        fontSize: 32,
        fontFamily: 'R900',
        opacity: 0.9,
        marginBottom: 5,
        position: 'relative',
        paddingLeft: WIDTH * 0.1
    },
    pay_value: {
        backgroundColor: 'red',
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        paddingBottom: 2,
        borderRadius: 3,
        fontSize: 12,
        fontFamily: 'R900',
        color: 'white'
    },
    swip_content: {
        backgroundColor: '#fff',
        width: '85%',
        height: 60,
        justifyContent: 'center',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        position: 'relative'
    },
    swipe_text: {
        position: 'absolute',
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: 'R700'
    },
    swipe_icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    title: {
        fontFamily: 'R700',
        marginTop: 8,
        fontSize: 18,
        opacity: 0.8
    },
    modal_container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    contain_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_balance: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'R700'
    },
    balance_container: {
        backgroundColor: 'red',
        paddingHorizontal: 8,
        justifyContent: 'center',
        borderRadius: 8,
        position: 'relative'
    }
})

export default pay_style