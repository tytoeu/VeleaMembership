import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputStyle: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        marginBottom: 24,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    searchStyle: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 0,
        height: 35,
        width: '100%'
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', flex: 1
    },
    button: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'R700'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -15,
        marginBottom: 20,
        width: '94%'
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
    text_normal: {
        fontSize: 15,
        fontFamily: 'R700',
        opacity: 0.8
    },
    menu_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 0
    },
    menu_text_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 12,
        paddingRight: 12
    },
    menu_icon_content: {
        flexDirection: 'row',
        alignItems: "center"
    },
    icon: {
        width: '15%',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 12
    },
    menu_content_btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 14
    },
    tabContainer: {
        padding: 3,
        borderRadius: 20,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabBar: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        shadowColor: 'transparent'
    },
    indicator: {
        backgroundColor: '#b9770e',
        height: '80%',
        borderRadius: 20,
        marginVertical: 5
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#222',
    },
    iconButton: {
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        marginTop: 8,
        fontSize: 14,
    },
    topOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '25%',
        top: 0,
        left: 0
    },
    bottomOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '40%',
        bottom: 0,
        left: 0
    },
    leftOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '12%',
        height: '35%',
        bottom: '40%',
        left: 0
    },
    rightOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '12%',
        height: '35%',
        bottom: '40%',
        right: 0
    },
    item_card: {
        width: '92%',
        backgroundColor: 'red',
        marginHorizontal: 'auto',
        marginBottom: 16,
        borderRadius: 8,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 80,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 5
    },
    content_text: {
        width: '70%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    footer_cart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    btn_action: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    cart_title: {
        opacity: 0.9,
        fontFamily: 'R900',
        fontSize: 14
    },
    sub_title: {
        opacity: 0.7,
        fontFamily: 'R500',
        fontSize: 10
    }
})

export default styles