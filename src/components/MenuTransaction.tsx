import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import home_style from '../util/style/HomeStyle'
import React from 'react'
import i18n from '../localization'
import { actionNavigate } from '../redux/temp'

const MenuTransaction = () => {
    const { theme, auth } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()

    return (
        <View style={home_style.menu_content}>
            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]} onPress={() => {
                if (!auth) {
                    dispatch(actionNavigate(null))
                    nav.navigate('Login')
                } else {
                    nav.navigate('top-up')
                }
            }}>
                <MaterialCommunityIcons name="arrow-bottom-left-bold-box-outline" color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>{i18n.t('Top-up')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]} onPress={() => {
                if (!auth) {
                    dispatch(actionNavigate(null))
                    nav.navigate('Login')
                } else {
                    nav.navigate('qr-scanner')
                }
            }}>
                <Ionicons name='qr-code-outline' color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>{i18n.t('Scan QR')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuTransaction
