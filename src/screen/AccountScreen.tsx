import { View, Text, Button } from 'react-native'
import React from 'react'
import HomeStyle from '../util/style/HomeStyle'
import { useAppDispatch, useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import { changeDarkModeAction, changeLanguageAction, loginAction } from '../redux/cache'
import i18n from '../localization'

const AccountScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const dispatch = useAppDispatch()

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Text style={{ color: theme.color, fontFamily: 'R900' }}>Account Screen</Text>
            <View style={{ height: 16 }} />
            <Button title='Change mode' onPress={() => dispatch(changeDarkModeAction())} />
            <View style={{ height: 16 }} />
            <Button title={i18n.t('Logout')} onPress={() => dispatch(loginAction(null))} />
            <View style={{ height: 16 }} />
            <Button title={i18n.t('Khmer')} onPress={() => dispatch(changeLanguageAction('kh'))} />
            <View style={{ height: 16 }} />
            <Button title={i18n.t('English')} onPress={() => dispatch(changeLanguageAction('en'))} />
        </View>
    )
}

export default AccountScreen