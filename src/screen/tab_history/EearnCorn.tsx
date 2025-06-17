import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { TransactionHistory } from '../../components'
import { useAppSelector } from '../../hooks'
import React, { useCallback } from 'react'
import useHistoryTransaction from '../../hooks/useHistoryTransaction'
import i18n from '../../localization'

const EearnCorn = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery } = useHistoryTransaction('earn-point')
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page?.data) || [];

    const onEndReached = () => {
        if (infiniteQuery.hasNextPage && !infiniteQuery.isLoading) {
            infiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { infiniteQuery.refetch() }, []);

    const ListFooterComponent = () => {
        if (infiniteQuery.isFetchingNextPage) {
            return <View style={{ paddingBottom: 20 }}><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
        }
        return null
    }
    const ListEmptyComponent = () => {
        if (infiniteQuery.data?.pages?.length) {
            return <Text style={{ color: theme.color, textAlign: 'center', opacity: 0.7, marginTop: '10%' }}>{i18n.t('No avaliable data')}</Text>
        }
        return null
    }

    return (
        <FlatList
            data={daraArr}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={50}
            ListFooterComponent={ListFooterComponent}
            ListFooterComponentStyle={{ padding: 10 }}
            renderItem={({ item, index }) => <TransactionHistory item={item} index={index} data={daraArr} />}
            ListEmptyComponent={() => (<ListEmptyComponent />)}
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={infiniteQuery.isRefetching} />}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        />
    )
}

export default EearnCorn