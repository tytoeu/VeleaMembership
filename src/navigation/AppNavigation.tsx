import StackNavigation from './StackNavigation'
import AuthNavigation from './AuthNavigation';
import { useAppSelector } from '../hooks'
import i18n from '../localization'
import React from 'react'

const AppNavigation = () => {

    const { locale, auth } = useAppSelector((state) => state.cache)
    i18n.locale = locale || 'kh'

    // authentication here
    return (auth ? <StackNavigation /> : <AuthNavigation />)
}

export default AppNavigation