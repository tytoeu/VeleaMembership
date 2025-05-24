import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useAppSelector } from '../hooks'
import QRCode from 'react-native-qrcode-svg'

const WIDTH = Dimensions.get('screen').width

const QRScreen = () => {
    const { theme } = useAppSelector(state => state.cache)

    return (
        <View style={[{ backgroundColor: theme.background }, _styles.concontainer]}>
            <View style={[_styles.qr_container, { backgroundColor: theme.bgDark }]}>
                <View style={{ height: 50, backgroundColor: '#ca6f1e', alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'R700', color: 'white' }}>QR Code</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderStyle: 'dashed', paddingHorizontal: 16, paddingVertical: 20, borderBottomColor: theme.colorText }}>
                    <Text style={{ fontFamily: 'R700', color: theme.color }}>TOEU TY</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                    <View style={{ width: '80%', height: '80%', borderRadius: 8, alignSelf: 'center', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <QRCode value={`PTC-0886508240`} size={200} logoBackgroundColor='transparent' />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QRScreen

const _styles = StyleSheet.create({
    concontainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    qr_container: {
        width: WIDTH - 90,
        height: WIDTH,
        marginTop: WIDTH * 0.3,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})