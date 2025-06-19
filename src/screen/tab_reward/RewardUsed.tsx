import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { Authorization, Loading, RewardItem } from '../../components'
import useRedeem from '../../hooks/useRedeem'
import { useAppSelector } from '../../hooks'
import React, { useCallback } from 'react'
import i18n from '../../localization'

const RewardUsed = () => {
    const { theme, auth } = useAppSelector((state) => state.cache)
    const { usedItemsInfiniteQuery } = useRedeem()
    const daraArr = usedItemsInfiniteQuery.data?.pages.flatMap(page => page) || [];

    const onEndReached = () => {
        if (usedItemsInfiniteQuery.hasNextPage && !usedItemsInfiniteQuery.isLoading) {
            usedItemsInfiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { usedItemsInfiniteQuery.refetch() }, []);

    if (usedItemsInfiniteQuery.isLoading) return <Loading />

    const ListFooterComponent = () => {
        if (usedItemsInfiniteQuery.isFetchingNextPage) {
            return <View style={{ paddingBottom: 20 }}><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
        }
        return null
    }

    const ListEmptyComponent = () => {
        if (usedItemsInfiniteQuery.data?.pages?.length) {
            return <Text style={{ color: theme.color, textAlign: 'center', opacity: 0.7, marginTop: '10%' }}>{i18n.t('No avaliable data')}</Text>
        }
        return null
    }

    if (!auth) {
        return <View className='flex-1 justify-center items-center dark:bg-black'>
            <Authorization navigate={null} />
        </View>
    }

    return (
        <View>
            <FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                renderItem={({ item, index }) => <RewardItem type='USED' item={item} index={index} data={daraArr} />}
                ListEmptyComponent={() => (<ListEmptyComponent />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={usedItemsInfiniteQuery.isRefetching} />}
                contentContainerStyle={{ paddingHorizontal: 16, marginTop: 10 }}
                key={2}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default RewardUsed

