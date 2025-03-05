import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../hooks'
import MyIconComponent from './MyIconComponent ';
import styles from '../util/style/Style';

interface IProp {
    icon?: string;
    text?: string;
    option?: string;
    disabledborderBottom?: boolean,
    onPress?: () => void
}

const MenuNavigation = (prop: IProp) => {
    const { theme } = useAppSelector(state => state.cache)
    return (
        <Pressable style={styles.menu_content} onPress={prop.onPress}>
            <View style={styles.icon}>
                <MyIconComponent name={prop.icon!} size={20} color={theme.color} />
            </View>
            <View style={[styles.menu_text_content, { borderBottomColor: prop.disabledborderBottom ? 'transparent' : theme.border }]}>
                <Text style={[{ color: theme.color }, styles.text_normal]}>{prop.text}</Text>
                <View style={styles.menu_icon_content}>
                    {prop.option && <Text style={[styles.text_normal, { color: theme.color }]}>{prop.option}</Text>}
                    <Ionicons name='chevron-forward-outline' size={22} color={theme.colorText} />
                </View>
            </View>
        </Pressable>
    )
}

export default MenuNavigation
