import { NavigateStyle } from '../util/style/NavigateStyle'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks'
import { assets } from '../../assets'
import React from 'react'
import i18n from '../localization'
import { Ionicons } from '@expo/vector-icons'

const image = assets.img
const HeaderLeftProfile = () => {
    const { theme, auth } = useAppSelector((state) => state.cache)
    const nav = useAppNavigation()
    return (
        <TouchableOpacity style={NavigateStyle.container} onPress={() => nav.navigate('Account')}>
            {auth?.avatar ? <Image source={{ uri: auth?.avatar }} style={NavigateStyle.profile} /> :
                <Ionicons name='person-circle-outline' style={NavigateStyle.profile} size={42} color={theme.colorText} />}

            <View>
                <Text style={[NavigateStyle.textName, { color: theme.color }]}>{auth?.full_name}</Text>
                <Text style={[NavigateStyle.wellcome, { color: theme.color }]}>{i18n.t('Wellcome Back!')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HeaderLeftProfile
