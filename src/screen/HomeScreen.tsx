import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import HomeStyle from '../util/style/HomeStyle'
import { useAppDispatch, useAppSelector } from '../hooks'
import { changeDarkModeAction } from '../redux/cache'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const dispatch = useAppDispatch()

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Text style={{ color: theme.color, fontFamily: 'R900' }}>Home Screen</Text>
            <Button title='Change mode' onPress={() => dispatch(changeDarkModeAction())} />
        </View>
    )
}

export default HomeScreen