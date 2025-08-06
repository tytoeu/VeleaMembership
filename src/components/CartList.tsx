import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { IItemInCart } from '../hooks/interface/IMenu'
import { Ionicons } from '@expo/vector-icons'
import styles from '../util/style/Style'
import { assets } from '../../assets'
import React from 'react'

type IProp = {
    item: IItemInCart;
    isPlusLoading: boolean;
    isMinusLoading: boolean;
    onQtyChange: (symbol: '+' | '-') => void;
};

const CartList: React.FC<IProp> = ({
    item,
    isPlusLoading,
    isMinusLoading,
    onQtyChange,
}) => {
    const { theme, locale } = useAppSelector(state => state.cache)
    const image = item?.package == 1 ? `${assets.config.prxxy}${assets.config.imagePath}item-package/${item.image}` : `${assets.config.prxxy}${assets.config.imagePath}item/${item.image}`

    return (
        <View style={[styles.item_card]}>
            <View style={{
                width: 90,
                height: 80,
                backgroundColor: theme.bgDark,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>

            <View style={styles.content_text}>
                <Text numberOfLines={1} style={[{ color: theme.color }, styles.cart_title]}>{locale === 'kh' ? item.itemNameKh : item.itemNameEn}</Text>
                <Text style={[{ color: theme.color }, styles.sub_title]}>{item.additionalName !== ' ' ? item.additionalName : 'No description'}</Text>
                <View style={styles.footer_cart}>
                    <Text style={[{ color: theme.color }]}>{item.unitPrice} x {item.qty} ({item.size})</Text>
                    <View style={styles.action}>
                        <TouchableOpacity style={[styles.btn_action, { marginRight: 10, backgroundColor: theme.bgDark }]} onPress={() => onQtyChange('-')}>
                            {isMinusLoading ? <ActivityIndicator size={'small'} color={theme.colorText} /> :
                                <Ionicons name='remove' color={theme.color} size={20} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn_action, { backgroundColor: theme.bgDark }]} onPress={() => onQtyChange('+')}>
                            {isPlusLoading ? <ActivityIndicator size={'small'} color={theme.colorText} /> :
                                <Ionicons name='add' color={theme.color} size={20} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartList