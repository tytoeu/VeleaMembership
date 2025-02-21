import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'
import HomeStyle from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'

const HistoryScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Text style={{ color: theme.color, fontFamily: 'R900' }}>History Screen</Text>
        </View>
    )
}

export default HistoryScreen