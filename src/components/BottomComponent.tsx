import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../hooks'
import styles from '../util/style/Style'
import Checkbox from 'expo-checkbox'
import React from 'react'

interface IProp {
    disabledborderBottom?: boolean,
    text: string,
    onPress?: () => void,
    isChecked?: boolean,
    isCheckBox?: boolean,
    isTicked?: boolean
}

const BottomComponent = (prop: IProp) => {
    const { theme } = useAppSelector(state => state.cache)
    return (
        <Pressable onPress={prop.onPress} style={[styles.menu_content_btn, { borderBottomColor: prop.disabledborderBottom ? 'transparent' : theme.border }]}>
            <Text style={[{ color: theme.color }, styles.text_normal]}>{prop.text}</Text>
            {prop.isCheckBox && <Checkbox
                value={prop.isChecked}
                color={prop.isChecked ? '#4630EB' : undefined}
            />}
            {prop.isTicked && <Ionicons name='checkmark-outline' color={theme.color} size={24} />}
        </Pressable>
    )
}

export default BottomComponent
