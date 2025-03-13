import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { View, Text, ScrollView, Image } from 'react-native'
import history_style from '../util/style/HistoryStyle'
import { MenuNavigation } from '../components'
import { loginAction } from '../redux/cache'
import { StatusBar } from 'expo-status-bar'
import { assets } from '../../assets'
import i18n from '../localization'
import React from 'react'

const profile = assets.img.profile
const AccountScreen = () => {
    const { theme, currentTheme, locale } = useAppSelector((state) => state.cache)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()

    return (
        <ScrollView style={[history_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <View style={{ marginHorizontal: 16, paddingBottom: 20 }}>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <Image source={profile} style={history_style.profile} />
                    <Text style={[history_style.name_text, { color: theme.color }]}>Toeu Ty</Text>
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Personal information' icon='person-outline' />
                    <MenuNavigation text='Change password' icon='key-outline' disabledborderBottom={true} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Dark mode' icon='moon-outline' option={currentTheme == 'dark' ? i18n.t('On') : i18n.t('Off')} onPress={() => navigation.navigate('DarkMode')} />
                    <MenuNavigation text='Change language' icon='language-outline' option={locale == 'kh' ? i18n.t('Khmer') : i18n.t('English')} disabledborderBottom={true} onPress={() => navigation.navigate('Language')} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Aperture' icon='aperture-outline' disabledborderBottom={true} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Baseball' icon='baseball-outline' />
                    <MenuNavigation text='Basket' icon='basket-outline' disabledborderBottom={true} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Share contact' icon='arrow-undo-circle-outline' disabledborderBottom={true} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Battery charging' icon='battery-charging-outline' disabledborderBottom={true} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text='Logout' icon='exit-outline' disabledborderBottom={true} onPress={() => dispatch(loginAction(null))} />
                </View>
            </View>
        </ScrollView>
    )
}

export default AccountScreen