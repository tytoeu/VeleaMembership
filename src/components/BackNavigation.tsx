import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface props {
    color: string,
    background: string,
    backText?: string,
    onPress?: () => void
}

const BackNavigation = (props: props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[_style.button_back, { backgroundColor: props.background }]}>
            <Ionicons name='chevron-back-outline' color={props.color} size={24} />
        </TouchableOpacity>
    )
}

export default BackNavigation

const _style = StyleSheet.create({
    button_back: {
        position: 'absolute',
        left: 20,
        top: 55,
        zIndex: 99,
        width: 50,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})