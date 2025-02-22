import React from 'react'
import i18n from '../localization'
import { useAppSelector } from '../hooks'
import StackNavigation from './StackNavigation'
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import {
    Roboto_400Regular as R400,
    Roboto_500Medium as R500m,
    Roboto_700Bold as R700,
    Roboto_900Black as R900
} from '@expo-google-fonts/roboto'

const AppNavigation = () => {
    const { locale } = useAppSelector((state) => state.cache)
    i18n.locale = locale || 'kh'
    const [fontsLoaded] = useFonts({ R400, R500m, R700, R900 });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} color={'red'} />
    }

    return (<StackNavigation />)
}

export default AppNavigation