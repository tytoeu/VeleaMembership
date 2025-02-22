import { View, Text, Button } from 'react-native'
import React from 'react'
import HomeStyle from '../util/style/HomeStyle'
import { useAppDispatch, useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import { changeDarkModeAction } from '../redux/cache'

const AccountScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const dispatch = useAppDispatch()

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Text style={{ color: theme.color, fontFamily: 'R900' }}>Account Screen</Text>
            <Button title='Change mode' onPress={() => dispatch(changeDarkModeAction())} />
        </View>
    )
}

export default AccountScreen