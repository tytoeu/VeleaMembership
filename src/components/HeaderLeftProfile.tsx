import { NavigateStyle } from '../util/style/NavigateStyle'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import React from 'react'
import i18n from '../localization'
import { Ionicons } from '@expo/vector-icons'
import { actionNavigate } from '../redux/temp'

const HeaderLeftProfile = () => {
    const { theme, auth } = useAppSelector((state) => state.cache)
    const { tempAuth } = useAppSelector((state) => state.temp)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch();
    return (
        <TouchableOpacity style={NavigateStyle.container} onPress={() => {
            if (!auth) {
                nav.navigate('Login')
                dispatch(actionNavigate(null))
            } else {
                nav.navigate('Account')
            }
        }}>
            {tempAuth?.avatar ? <Image source={{ uri: tempAuth?.avatar }} style={NavigateStyle.profile} /> :
                <Ionicons name='person-circle-outline' style={NavigateStyle.profile} size={42} color={theme.colorText} />}

            <View>
                <Text style={[NavigateStyle.textName, { color: theme.color }]}>{tempAuth?.name}</Text>
                <Text style={[NavigateStyle.wellcome, { color: theme.color }]}>{i18n.t('Wellcome Back!')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HeaderLeftProfile
