import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useAppSelector } from '../hooks'
import home_style from '../util/style/HomeStyle'

const MenuTransaction = () => {
    const { theme } = useAppSelector(state => state.cache)
    return (
        <View style={home_style.menu_content}>
            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]}>
                <Octicons name="diff-added" color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>Add Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]}>
                <MaterialCommunityIcons name="arrow-top-right-bold-box-outline" color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>Send Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]}>
                <MaterialCommunityIcons name="arrow-bottom-left-bold-box-outline" color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[home_style.menu_button, { backgroundColor: theme.bgDark }]}>
                <Ionicons name='cash-outline' color={theme.color} size={22} />
                <Text style={[home_style.menu_btn_text, { color: theme.color }]}>Withdrow</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuTransaction
