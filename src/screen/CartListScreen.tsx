import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks'
import { CartList, Loader } from '../components'
import React, { useCallback, useState } from 'react'
import i18n from '../localization'
import useMenu from '../hooks/useMenu'
import { IItemInCart, IItemInCartUpdate } from '../hooks/interface/IMenu'
import { ToastMessage } from '../components/ToastMessage'
import { Ionicons } from '@expo/vector-icons'

type LoadingAction = { index: number; symbol: '+' | '-' } | null;

const CartListScreen = () => {
    const { theme } = useAppSelector(state => state.cache)
    const { addressSeleted } = useAppSelector(state => state.temp)
    const nav = useAppNavigation()
    const { listCartInfiniteQuery, updateQualityMutation, methodPaymentMutation } = useMenu();

    const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);

    const handleQtyChange = async (index: number, symbol: '+' | '-', item: IItemInCart) => {
        if (loadingAction !== null) return;
        setLoadingAction({ index, symbol });
        const qty = symbol === '+' ? item.qty + 1 : item.qty - 1

        const dataJson: IItemInCartUpdate = {
            itemId: item.itemId,
            appCartId: item.appCartId,
            qty
        }

        updateQualityMutation.mutateAsync(dataJson, {
            onSuccess: (res) => {
                listCartInfiniteQuery.refetch();
                setLoadingAction(null);
            },
            onError: (error) => {
                setLoadingAction(null);
                console.error('Error updating quantity:', error);
            }
        })
    };

    const { data } = listCartInfiniteQuery;

    const onRefresh = useCallback(() => { listCartInfiniteQuery.refetch() }, []);

    const priceCalulate = () => {

        if (!data || !data.length) return { totalPricesAfterDiscount: 0, totalPrices: 0 }

        const totalPricesAfterDiscount = data?.reduce((acc, item) => acc + (item.total), 0) || 0;
        const totalPrices = data?.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0) || 0;

        const discount = totalPrices !== totalPricesAfterDiscount ? true : false

        return { totalPricesAfterDiscount, totalPrices, discount };
    }

    const { totalPricesAfterDiscount, totalPrices, discount } = priceCalulate();

    const reviewPayment = () => {
        if (!data?.length) {
            return ToastMessage('Your cart is not exist')
        }

        if (addressSeleted?.addressId === 0) {
            return nav.navigate('location', { item: null })
        }

        methodPaymentMutation.mutateAsync(1, {
            onSuccess: (response) => {
                if (!response?.length) {
                    return ToastMessage('somethis went wrong !')
                }
                nav.navigate('review-payment', { data, methodList: response })
            }
        })
    }

    const ListEmptyComponent = () => {
        return <View className='h-96 justify-center items-center mt-10 mx-5 rounded-lg'>
            <Ionicons name='cart-outline' size={100} color={theme.colorText} />
            <Text className='font-extrabold color-slate-600 dark:color-slate-200 text-center text-lg'>Empty Cart</Text>
            <Text className='font-medium color-slate-500 text-center text-sm'>
                Look like you haven't added any item to your cart yet.
            </Text>
        </View>
    }

    return (
        <View style={[{ backgroundColor: theme.background, flex: 1 }]}>

            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <CartList
                    item={item}
                    isPlusLoading={loadingAction?.index === index && loadingAction.symbol === '+'}
                    isMinusLoading={loadingAction?.index === index && loadingAction.symbol === '-'}
                    onQtyChange={(symbol) => handleQtyChange(index, symbol, item)} />
                }
                removeClippedSubviews={true}
                keyboardShouldPersistTaps="handled"
                initialNumToRender={20}
                windowSize={20}
                onEndReachedThreshold={0.1}
                scrollEventThrottle={50}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={listCartInfiniteQuery.isRefetching} />}
                ListEmptyComponent={ListEmptyComponent}
            />
            {data?.length ? (<>
                <View style={{ height: 120, backgroundColor: theme.bgDark }}>
                    <View className=' w-[27.5rem] self-center justify-between rounded-xl flex-row mt-3 px-3'>
                        <Text className='text-[14px] -tracking-wide color-slate-950 dark:color-slate-300 font-medium'>{i18n.t('total-cart')}</Text>
                        <View>
                            <Text className='text-lg font-bold text-right dark:color-slate-50' style={{ textAlign: 'right' }}>${totalPricesAfterDiscount.toFixed(2)}</Text>
                            {discount && <Text className='text-sm font-normal dark:color-slate-300' style={{ textDecorationLine: 'line-through', textAlign: 'right' }}>${totalPrices.toFixed(2)}</Text>}
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={reviewPayment}
                    disabled={methodPaymentMutation.isPending}
                    className='bg-orange-800 absolute w-[27.5rem] self-center bottom-0 h-14 items-center justify-center rounded-xl'>
                    {methodPaymentMutation.isPending ? <Loader barColor='#FFF' /> :
                        <Text className='font-bold text-lg color-slate-50'>{i18n.t('Review & Pay')}</Text>}
                </TouchableOpacity>
            </>) : undefined}

        </View>
    )
}

export default CartListScreen