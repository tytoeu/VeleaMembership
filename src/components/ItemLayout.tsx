import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppNavigation, useAppSelector } from '../hooks'
import { IMenu } from '../hooks/interface/IMenu'
import { assets } from '../../assets'

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
}

interface IProp {
    data: IMenu[]
}

const ItemLayout: FC<IProp> = ({ data }) => {
    const { theme, locale } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()

    return (
        <View className='mt-3'>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const image = item?.package == 1 ? `${assets.config.prxxy}${assets.config.imagePath}item-package/${item.image}` : `${assets.config.prxxy}${assets.config.imagePath}item/${item.image}`
                    return (<Pressable
                        onPress={() => nav.navigate('item-detail', { item })}
                        className="bg-white dark:bg-white/10 min-h-60 w-52 rounded-lg mr-3 overflow-hidden">

                        {item.image ? <Image
                            source={{ uri: image }}
                            style={{ height: 128, objectFit: 'cover', width: '100%' }}
                        /> : <Image
                            source={assets.logo.login}
                            style={{ height: 128, objectFit: 'cover', width: '100%' }}
                        />}

                        <Text className='ps-3 pt-2 color-slate-900 dark:color-white font-semibold text-[16px] -tracking-wide' numberOfLines={1}>{locale == 'en' ? item.itemNameEn : item.itemNameKh}</Text>
                        <Text className='ps-3 color-slate-900 dark:color-slate-300 font-semibold text-sm -tracking-tighter'>{item.categoryName}</Text>

                        <View className='ps-3 pt-2 flex-row items-center'>
                            <Text className='color-slate-800 dark:color-white font-extrabold'>${item.price}</Text>
                            <Text className='color-slate-800 dark:color-slate-400 ms-3'>{item.size}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => nav.navigate('item-detail', { item })}
                            style={[{ position: 'absolute', bottom: 12, right: 10, borderRadius: 50, width: 30, height: 30, backgroundColor: theme.bgDark }, shadow]}>
                            <Ionicons name='add' size={28} color={theme.colorText} />
                        </TouchableOpacity>

                    </Pressable>)
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    )
}

export default ItemLayout