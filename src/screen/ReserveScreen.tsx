import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useAppNavigation, useAppSelector } from '../hooks'
import useReserve from '../hooks/useReserve'
import { Loading, ReserveItem } from '../components'
import i18n from '../localization'

/// booking-date status cover and time arrived

const ReserveScreen = () => {
    const nav = useAppNavigation()
    const { usedItemsInfiniteQuery } = useReserve()

    const { bookings } = usedItemsInfiniteQuery.data || []

    const onRefresh = useCallback(() => { usedItemsInfiniteQuery.refetch() }, []);

    if (usedItemsInfiniteQuery.isLoading) return <Loading />

    const ListEmptyComponent = () => {
        if (!bookings?.length) {
            return <Text className='color-slate-600 dark:color-slate-300 pt-10 font-semibold text-center tracking-wide'>{i18n.t('No avaliable data')}</Text>
        }
        return null
    }

    return (
        <View className="flex-1 dark:bg-black p-3">
            <FlatList
                showsVerticalScrollIndicator={false}
                data={bookings}
                contentContainerStyle={{ padding: 8 }}
                renderItem={({ item, index }) => <ReserveItem item={item} />}
                ListEmptyComponent={ListEmptyComponent}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={usedItemsInfiniteQuery.isRefetching} />}
            />
            <TouchableOpacity
                onPress={() => nav.navigate('form-reserve')}
                className='w-14 h-14 rounded-full bg-[#975542] absolute bottom-14 right-6 justify-center items-center'>
                <Ionicons name='add-outline' size={30} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}

export default ReserveScreen