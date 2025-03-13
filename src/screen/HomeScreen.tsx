import { CriditCard, MenuTransaction } from '../components'
import home_style from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector } from '../hooks'
import { View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    return (
        <View style={[home_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <CriditCard code='5555 3333 555 777' balance={'$12,500.00'} />
            <MenuTransaction />
        </View>
    )
}

export default HomeScreen