import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { CartList } from '../components'
import React from 'react'

const CartListScreen = () => {
    const { cartList, theme } = useAppSelector(state => state.cache)
    return (
        <View style={[{ backgroundColor: theme.background, flex: 1 }]}>
            <FlatList
                data={cartList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <CartList item={item} index={index} />}
                removeClippedSubviews={true}
                keyboardShouldPersistTaps="handled"
                initialNumToRender={4}
                windowSize={4}
                onEndReachedThreshold={0.1}
                scrollEventThrottle={50}
            />
        </View>
    )
}

export default CartListScreen