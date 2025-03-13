import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { useAppSelector } from '../hooks'
import React from 'react'

const HeaderLeft = () => {
    const { theme } = useAppSelector((state) => state.cache)
    return (
        <View style={{ flexDirection: 'row' }}>
            <Ionicons name='search' color={theme.color} size={22} style={{ padding: 15 }} onPress={() => alert(0)} />
            <Ionicons name='notifications-outline' color={theme.color} size={22} style={{ padding: 15 }} onPress={() => alert(0)} />
        </View>
    )
}

export default HeaderLeft