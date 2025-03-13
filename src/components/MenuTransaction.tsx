import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks'
import home_style from '../util/style/HomeStyle'
import React from 'react'

const MenuTransaction = () => {
    const { theme } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()

    return (
        <View style={home_style.menu_content}>
            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]} onPress={() => nav.navigate('payment')}>
                <MaterialCommunityIcons name="arrow-bottom-left-bold-box-outline" color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>Top-Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]} onPress={() => nav.navigate('qr-scanner')}>
                <Ionicons name='qr-code-outline' color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>Scan QR</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuTransaction
