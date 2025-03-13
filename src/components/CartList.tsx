import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { updateQualityAction } from '../redux/cache'
import { IMenu } from '../hooks/interface/IMenu'
import { Ionicons } from '@expo/vector-icons'
import styles from '../util/style/Style'
import { assets } from '../../assets'
import React from 'react'

type IProp = {
    item: IMenu,
    index: number
}
const CartList = (prop: IProp) => {
    const { theme, locale } = useAppSelector(state => state.cache)
    const dispatch = useAppDispatch()
    const image = prop.item?.package == 1 ? `${assets.config.prxxy}${assets.config.imagePath}item-package/${prop.item.image}` : `${assets.config.prxxy}${assets.config.imagePath}item/${prop.item.image}`
    return (
        <View style={[styles.item_card, { backgroundColor: theme.bgDark }]}>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
            <View style={styles.content_text}>
                <Text numberOfLines={1} style={[{ color: theme.color }, styles.cart_title]}>{locale === 'kh' ? prop.item.itemNameKh : prop.item.itemNameEn}</Text>
                <Text style={[{ color: theme.color }, styles.sub_title]}>{prop.item.subCategoryName}</Text>
                <View style={styles.footer_cart}>
                    <Text style={[{ color: theme.color }]}>{prop.item.price} x {prop.item.qty} ({prop.item.size})</Text>
                    <View style={styles.action}>
                        <TouchableOpacity style={[styles.btn_action, { marginRight: 10, backgroundColor: theme.bgDark }]} onPress={() => dispatch(updateQualityAction({ symbol: '-', keyIncrease: prop.item.increaseKey }))}>
                            <Ionicons name='remove-outline' color={theme.color} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn_action, { backgroundColor: theme.bgDark }]} onPress={() => dispatch(updateQualityAction({ symbol: '+', keyIncrease: prop.item.increaseKey }))}>
                            <Ionicons name='add' color={theme.color} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartList