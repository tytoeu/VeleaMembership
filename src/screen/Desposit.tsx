import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../hooks'
import QRCode from 'react-native-qrcode-svg'
import { useRoute } from '@react-navigation/native'
import i18n from '../localization'
const WIDTH = Dimensions.get('screen').width

interface IProp {
    balance: number
}

const Desposit = () => {

    const { theme } = useAppSelector(state => state.cache)
    const { tempAuth } = useAppSelector(state => state.temp)
    const router = useRoute()
    const { balance } = router.params as IProp

    const ThemeTextDescrription = ({ description, symbol }: { description: string, symbol?: boolean }) => {
        return (<View className='flex-row' style={{ width: '100%', marginBottom: 8 }}>
            {!symbol && <Ionicons name='radio-button-on-outline' color={theme.colorText} size={12} style={{ marginRight: 10, marginTop: 4 }} />}
            <Text className='text-[14px] leading-6 -tracking-wide font-normal color-black dark:color-slate-300'>{description}</Text>
        </View>)
    }

    return (
        <ScrollView className='dark:bg-black flex-1'>
            <View className='p-6'>
                <View className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                    <ThemeTextDescrription description={i18n.t('des-top-1')} symbol />
                    <ThemeTextDescrription description={i18n.t('des-top-2')} symbol />
                </View>
                <View style={[_styles.qr_container, { backgroundColor: theme.bgDark }]}>
                    <View style={{ height: 50, backgroundColor: '#ca6f1e', alignItems: "center", justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'R700', color: 'white' }}>QR Code</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderStyle: 'dashed', paddingHorizontal: 16, paddingVertical: 20, borderBottomColor: theme.colorText }}>
                        <Text style={{ fontFamily: 'R700', color: theme.color }}>{tempAuth?.name}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={{ width: '80%', height: '80%', borderRadius: 8, alignSelf: 'center', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <QRCode value={tempAuth?.phone} size={200} logoBackgroundColor='transparent' />
                        </View>
                    </View>
                </View>
                <View className=' p-3 mb-5 mt-5' style={{ width: '100%', marginLeft: 20 }}>
                    <ThemeTextDescrription description={`${i18n.t('ID')} ${tempAuth?.phone}`} symbol />
                    <ThemeTextDescrription description={`${i18n.t('Current Balance')} $ ${balance}`} symbol />
                </View>
            </View>
        </ScrollView>
    )
}

export default Desposit
const _styles = StyleSheet.create({

    qr_container: {
        width: WIDTH - 100,
        height: WIDTH,
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
        alignSelf: 'center',
        marginTop: 10
    }
})