import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputStyle: {
        width: '90%',
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
    }
})

export default styles