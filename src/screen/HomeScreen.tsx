import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import HomeStyle from '../util/style/HomeStyle'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Text style={{ color: theme.color, fontFamily: 'R900' }}>Home Screen</Text>
        </View>
    )
}

export default HomeScreen