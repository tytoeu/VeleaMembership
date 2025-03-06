import { StyleSheet } from "react-native";

const menuStyle = StyleSheet.create({
    card: {
        marginBottom: 12,
        borderRadius: 8,
        shadowOffset:
        {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        width: '47%',
        overflow: 'hidden',
        position: 'relative'
    },
    textTitle: {
        fontSize: 16,
        fontFamily: 'R900',
        textTransform: 'capitalize',
        lineHeight: 24
    },
    text: {
        opacity: 0.9,
        fontFamily: 'R700',
        lineHeight: 22,
        fontSize: 14
    },
    subText: {
        fontSize: 12,
        fontFamily: 'R700',
        textTransform: 'capitalize',
        paddingBottom: 5,
        opacity: 0.7
    },
    contextText: {
        padding: 10
    },
    feature: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 12,
        zIndex: 2,
        paddingHorizontal: 10
    },
    featureText: {
        fontFamily: 'R700',
        fontSize: 12,
        color: '#fff'
    },
    priceContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sapCode: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    skuSapText: {
        fontFamily: 'R700',
        fontSize: 12,
        color: '#fff'
    },
    category: {
        marginRight: 8,
        height: 30,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    cate_text: {
        fontFamily: 'R700',
        fontSize: 14
    }
})

export default menuStyle