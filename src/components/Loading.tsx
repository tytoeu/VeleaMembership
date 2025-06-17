import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../util/style/Style'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector } from '../hooks'

const Loading = () => {
    const { theme, currentTheme } = useAppSelector(state => state.cache)
    return (
        <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    )
}

export default Loading