import React from 'react'
import i18n from '../localization'
import { useAppSelector } from '../hooks'
import StackNavigation from './StackNavigation'

const AppNavigation = () => {
    const { locale } = useAppSelector((state) => state.cache)
    i18n.locale = locale || 'kh'

    return (<StackNavigation />)
}

export default AppNavigation