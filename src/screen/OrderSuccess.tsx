import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { assets } from '../../assets'
import { useAppNavigation, useAppSelector, useBackHandler } from '../hooks'
import Animated, { Easing, FadeInDown } from 'react-native-reanimated'
import { useRoute } from '@react-navigation/native'
import useHistoryTransaction from '../hooks/useHistoryTransaction'
import { Loader } from '../components'

const img = assets.img

interface IProp {
    orderId: string,
    status: string
}

export default function OrderSuccess() {
    const router = useRoute()
    const { orderId, status } = router.params as IProp
    const { } = useBackHandler()
    const { theme } = useAppSelector(state => state.cache)
    const { fetchOrderDetailMutation } = useHistoryTransaction('purchase')
    const nav = useAppNavigation()

    const viewDetail = async () => {
        fetchOrderDetailMutation.mutateAsync({ id: Number(orderId) }, {
            onSuccess: response => {
                if (response?.length) {
                    nav.navigate('review-order', { orderItem: response[0] })
                }
            }
        })
    }

    return (
        <View className='flex-1 justify-around items-center bg-white dark:bg-black'>
            <Animated.View entering={FadeInDown.duration(800).delay(100).easing(Easing.ease)} className='items-center mt-5'>
                <View className='bg-orange-700 items-center justify-center' style={{ width: 70, height: 70, borderRadius: 50 }}>
                    <Ionicons name='checkmark-outline' size={50} color={'white'} />
                </View>
                <Text className='text-3xl font-extrabold leading-10 mt-3 color-orange-700'>Thank You</Text>
                <Text className='text-sm font-medium color-black dark:color-slate-300'>You has been placed order foods successed.</Text>
                <Image
                    source={img.orderSuccess}
                    style={{ width: 150, height: 150, objectFit: 'contain', marginTop: 60 }}
                />
                <View className='items-center mt-16'>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className='bg-orange-700 px-20 py-3 rounded-lg'
                        onPress={() => nav.navigate('Home')}
                    >
                        <Text className='color-white font-bold'>Go Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={viewDetail} className='flex-row items-center p-5'>
                        {fetchOrderDetailMutation.isPending ? <Loader /> : <>
                            <Ionicons name='log-out-outline' size={18} color={theme.colorText} />
                            <Text className='text-lg ml-2 color-black dark:color-slate-300'>View Detail</Text>
                        </>}
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}