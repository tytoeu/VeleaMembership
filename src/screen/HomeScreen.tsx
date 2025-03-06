import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import home_style from '../util/style/HomeStyle'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import { CriditCard, MenuTransaction, TransactionHistory } from '../components'

const HomeScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    const Footer = () => (<ActivityIndicator style={{ paddingBottom: 10 }} color={theme.color} />)
    return (
        <View style={[home_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <CriditCard code='5555 3333 555 777' balance={'$12,500.00'} />
            <MenuTransaction />
        </View>
    )
}

export default HomeScreen