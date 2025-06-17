import { View, Text } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import styles from '../util/style/Style'
import i18n from '../localization'
import { StatusBar } from 'expo-status-bar'
import { Button } from 'react-native-paper'
import { actionNavigate } from '../redux/temp'

const Authorization = ({ navigate }: { navigate: string | null }) => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    return <View style={[{ backgroundColor: theme.background }, styles.container]}>
        <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
        <Text style={{ color: theme.color, fontSize: 16 }}>{i18n.t('Please login to view your account')}</Text>
        <Button
            mode='contained'
            onPress={() => {
                dispatch(actionNavigate(navigate))
                navigation.navigate('Login')
            }}
            style={{ marginTop: 20, backgroundColor: theme.main }}
            textColor={'white'}
        >{i18n.t('Login')}</Button>
    </View>
}

export default Authorization