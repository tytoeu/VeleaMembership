import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { addToCartAction } from '../redux/cache'
import { IMenu } from '../hooks/interface/IMenu'
import menuStyle from '../util/style/MenuStyle'
import { assets } from '../../assets'
import React from 'react'

interface IProp {
    items: IMenu
}

const ItemCard = (prop: IProp) => {
    const nav = useAppNavigation()
    const { theme, locale } = useAppSelector((state) => state.cache)
    if (!prop.items) return null
    const image = prop.items?.package == 1 ? `${assets.config.prxxy}${assets.config.imagePath}item-package/${prop.items.image}` : `${assets.config.prxxy}${assets.config.imagePath}item/${prop.items.image}`
    let bgColor = ''

    if (prop.items.feature) {
        switch (prop.items.feature) {
            case 'Best selling':
                bgColor = '#28c76f';
                break;
            case 'Special':
                bgColor = '#ff9f43';
                break;
            default:
                bgColor = '#ff4c51';
                break;
        }
    }
    return (
        <TouchableOpacity style={[menuStyle.card, { backgroundColor: theme.bgDark, shadowColor: '#000' }]} onPress={() => nav.navigate('item-detail', { item: prop.items })}>
            {prop.items.feature &&
                <View style={[menuStyle.feature, { backgroundColor: bgColor }]}>
                    <Text style={menuStyle.featureText}>{prop.items.feature}</Text>
                </View>}
            {prop.items?.image ? <Image
                source={{ uri: image }}
                style={{ width: '100%', height: 150, resizeMode: 'cover' }}
            /> :
                <Image
                    source={assets.logo.login}
                    style={{ width: '90%', height: 150, resizeMode: 'contain', alignSelf: 'center' }}
                    blurRadius={8}
                />}
            <View style={menuStyle.contextText}>
                <Text style={[menuStyle.subText, { color: theme.color }]}>{prop.items.categoryName}</Text>
                <View style={menuStyle.priceContent}>
                    <Text style={[menuStyle.textTitle, { color: theme.color }]}>$ {prop.items.price}</Text>
                    <View style={[menuStyle.sapCode]}>
                        <Text style={[menuStyle.skuSapText, { color: theme.color }]}>{prop.items.skuSap}</Text>
                    </View>
                </View>
                <Text style={[menuStyle.text, { color: theme.color }]}>{locale == 'kh' ? prop.items.itemNameKh : prop.items.itemNameEn}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCard