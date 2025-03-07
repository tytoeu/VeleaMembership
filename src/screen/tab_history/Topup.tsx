import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useCallback } from 'react'
import { useAppSelector } from '../../hooks'
import useGetPost from '../../hooks/useGetPost'
import { TransactionHistory } from '../../components'

const Topup = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery } = useGetPost()
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page) || [];

    const onEndReached = () => {
        if (infiniteQuery.hasNextPage && !infiniteQuery.isLoading) {
            infiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { infiniteQuery.refetch() }, []);

    const ListFooterComponent = () => {
        if (infiniteQuery.isFetchingNextPage) {
            return <ActivityIndicator size={'small'} color={'#ddd'} />;
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
            renderItem={({ item, index }) => <TransactionHistory index={index} />}
            ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={infiniteQuery.isRefetching} />}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        />
    )
}

export default Topup