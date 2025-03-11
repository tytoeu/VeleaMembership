import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { CartList } from '../components'

const CartListScreen = () => {
    const { cartList, theme } = useAppSelector(state => state.cache)
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})