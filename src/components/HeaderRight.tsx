import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks'
import React from 'react'

const HeaderRight = () => {
    const { theme } = useAppSelector((state) => state.cache)
    const nav = useAppNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15 }}>
            <Ionicons name='qr-code-outline' color={theme.color} size={22} style={{ padding: 5 }} onPress={() => nav.navigate('QR')} />
            <Ionicons name='notifications-outline' color={theme.color} size={24} style={{ padding: 5 }} onPress={() => alert(0)} />
        </View>
    )
}

export default HeaderRight