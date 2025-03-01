import { View, Text, Button } from 'react-native'
import React from 'react'
import HomeStyle from '../util/style/HomeStyle'
import { useAppDispatch, useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import { changeDarkModeAction, loginAction } from '../redux/cache'

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
            <Button title='Logout' onPress={() => dispatch(loginAction(null))} />
        </View>
    )
}

export default AccountScreen