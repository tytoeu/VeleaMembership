import React from 'react'
import i18n from '../localization'
import { useAppSelector } from '../hooks'
import StackNavigation from './StackNavigation'
import AuthNavigation from './AuthNavigation';

const AppNavigation = () => {

    const { locale, auth } = useAppSelector((state) => state.cache)
    i18n.locale = locale || 'kh'

    // authentication here
    return (auth ? <StackNavigation /> : <AuthNavigation />)
}

export default AppNavigation