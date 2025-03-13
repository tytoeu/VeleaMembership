import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../hooks'
import React from 'react'

type IProp = {
    onPress?: () => void
}

const AddToCard = (prop: IProp) => {
    const { theme, cartList } = useAppSelector(state => state.cache)
    return (
        <TouchableOpacity style={[styles.add_container, { backgroundColor: theme.bgDark }]} onPress={prop.onPress}>
            <Ionicons name='cart' size={24} color={theme.color} />
            <Text style={[styles.count_items]}>{cartList.length}</Text>
        </TouchableOpacity>
    )
}

export default AddToCard

const styles = StyleSheet.create({
    add_container: {
        position: 'absolute',
        width: 45,
        height: 45,
        bottom: 10,
        right: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000'
    },
    count_items: {
        position: 'absolute',
        top: 0,
        right: 2,
        fontFamily: 'R900',
        fontSize: 10,
        width: 18,
        height: 18,
        backgroundColor: 'red',
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        zIndex: 999
    }
})