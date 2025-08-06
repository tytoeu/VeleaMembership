import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppNavigation, useAppSelector } from '../hooks'
import MultiCheckbox from '../components/MultiCheckbox'
import { AlertBox, Layout, Loader, Size } from '../components'
import { TextInput } from 'react-native-paper'
import styles from '../util/style/Style'
import i18n from '../localization'
import { useRoute } from '@react-navigation/native'
import { IItemAdd, IMenu } from '../hooks/interface/IMenu'
import { assets } from '../../assets'
import { useItemQuantity } from '../hooks/useItemQuantity'
import useMenu from '../hooks/useMenu'
import { ToastMessage } from '../components/ToastMessage'

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginTop: 10
}

interface IProp {
    item: IMenu
}

const ItemDetail = () => {
    const router = useRoute();
    const { item } = router.params as IProp
    const { theme, locale, auth } = useAppSelector(state => state.cache)
    const [selected, setSelected] = React.useState<string[]>([]);
    const [remark, setRemark] = useState('')
    const { qty, total, increment, decrement, selectSize, selectedPrice } = useItemQuantity(item.itemPrices);
    const image = item?.package == 1 ? `${assets.config.prxxy}${assets.config.imagePath}item-package/${item?.image}` : `${assets.config.prxxy}${assets.config.imagePath}item/${item?.image}`
    const { postAddToCartMutation, listCartInfiniteQuery } = useMenu()
    const [state, setState] = useState({
        isAlert: false
    })

    const nav = useAppNavigation()

    const AddToCardAction = () => {
        const dataJson: IItemAdd = {
            customerId: auth?.id || 0,
            itemId: item.itemId,
            itemCode: item.itemCode,
            itemNameEn: item.itemNameEn,
            itemNameKh: item.itemNameKh,
            size: selectedPrice.size,
            unitPrice: selectedPrice.price,
            qty: qty,
            typeDis: selectedPrice.typeDis,
            discountRate: selectedPrice.discountRat,
            priceAfterDis: selectedPrice.priceAfterDis,
            total: total,
            package: item.package,
            itemDisType: selectedPrice.itemDisType,
            remark: remark,
            additionalNoted: selected.toString(),
            sku: item.skuSap
        }
        postAddToCartMutation.mutate(dataJson, {
            onSuccess: (data) => {
                if (data?.status) {
                    listCartInfiniteQuery.refetch();
                    setState({ ...state, isAlert: true })
                } else {
                    ToastMessage('Failed to add item to cart: ' + data?.message);
                }
            },
            onError: (error) => {
                console.error('Error adding item to cart:', error);
            }
        });

    }

    return (
        <View className='flex-1 dark:bg-black bg-white'>
            <AlertBox
                visible={state.isAlert}
                onPress={() => {
                    setState({ ...state, isAlert: false })
                    nav.navigate('cart-list')
                }}
                onReject={() => {
                    setState({ ...state, isAlert: false })
                    nav.navigate('Menu')
                }}
                onClose={() => setState({ ...state, isAlert: false })}
                message='Do you want to shopping or place now?'
                bottonText='Continue'
                rejectText='Shopping'
                title='Success'
            />
            <Layout>
                <View className='w-96 h-96 self-center items-center relative mb-3'>
                    {item.image ? <Image
                        source={{ uri: image }}
                        style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 300 }}
                    /> : <Image
                        source={assets.logo.login}
                        style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 300 }}
                    />}
                    <View className='bg-white dark:bg-white/10 flex-row items-center rounded-lg px-3' style={shadow}>
                        <TouchableOpacity className='w-11 h-11 items-center justify-center' onPress={decrement}>
                            <Ionicons name='remove-outline' size={24} color={theme.colorText} />
                        </TouchableOpacity>
                        <Text className='text-lg font-extrabold mx-3 color-black dark:color-slate-300'>{qty}</Text>
                        <TouchableOpacity className='w-11 h-11 items-center justify-center' onPress={increment}>
                            <Ionicons name='add-outline' size={24} color={theme.colorText} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='px-5'>
                    <View className='flex-row justify-between'>
                        <Text className='dark:color-slate-50 color-slate-900 font-bold text-lg'>{locale == 'en' ? item.itemNameEn : item.itemNameKh}</Text>
                        <Text className='bg-white dark:bg-white/10 px-4 py-1 color-black text-sm font-bold dark:color-orange-700 rounded-lg'>{item.itemCode}</Text>
                    </View>
                    <Text className='dark:color-slate-300 font-medium text-sm'>{item.categoryName}</Text>
                    <View className='mt-5'>
                        <Text className='color-slate-800 dark:color-slate-50 font-bold text-lg'>{i18n.t('Description')}</Text>
                        <Text className='bg-white dark:bg-white/10 mt-3 p-3 rounded-lg color-slate-900 dark:color-slate-300 leading-7 tracking-wider'>
                            {item.description}
                        </Text>
                    </View>

                    {item.itemPrices.length ?
                        <View className='mt-5'>
                            <Text className='color-slate-800 dark:color-slate-50 font-bold text-lg mb-3'>{i18n.t('Size')}</Text>
                            <Size
                                options={item.itemPrices.sort((a, b) => a.price - b.price)}
                                onChange={selectSize}
                            />
                        </View> : undefined}

                    {item.additionals.length ?
                        <View className='mt-5'>
                            <Text className='color-slate-800 dark:color-slate-50 font-bold text-lg'>{i18n.t('Additional')}</Text>
                            <MultiCheckbox
                                options={item.additionals}
                                onChange={setSelected}
                            />
                        </View> : undefined}

                    <View className='mt-5'>
                        <Text className='color-slate-800 dark:color-slate-50 font-bold text-lg mb-2'>{i18n.t('Remark')}</Text>
                        <TextInput
                            mode='outlined'
                            label={'Writing your noted'}
                            keyboardType='default'
                            textColor={theme.color}
                            outlineColor={theme.main}
                            theme={{ colors: { onSurfaceVariant: theme.main } }}
                            style={[
                                styles.inputStyle,
                                {
                                    backgroundColor: theme.bgInput,
                                    width: '100%',
                                    minHeight: 130,
                                    textAlignVertical: 'top',
                                    lineHeight: 24,
                                    fontSize: 14
                                }
                            ]}
                            returnKeyType='done'
                            onChangeText={setRemark}
                            multiline={true}
                        />
                    </View>

                </View>
            </Layout>
            <View style={{ height: 80 }} />

            <TouchableOpacity
                onPress={AddToCardAction}
                disabled={postAddToCartMutation.isPending}
                className='bg-orange-800 absolute w-[27.5rem] self-center bottom-5 h-14 items-center justify-center rounded-xl'>
                {postAddToCartMutation.isPending ?
                    <Loader barColor='#FFF' />
                    :
                    <Text className='font-bold text-lg color-slate-50'>{i18n.t('Add to cart for')} ${total}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default ItemDetail