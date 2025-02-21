import { View, Text } from 'react-native'
import React from 'react'
import HomeStyle from '../util/style/HomeStyle'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'

const AccountScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Text style={{ color: theme.color, fontFamily: 'R900' }}>Account Screen</Text>
        </View>
    )
}

export default AccountScreen