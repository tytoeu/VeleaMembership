import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { ModalLoading, TransactionHistory } from '../../components'
import { useAppNavigation, useAppSelector } from '../../hooks'
import React, { useCallback } from 'react'
import useHistoryTransaction from '../../hooks/useHistoryTransaction'
import i18n from '../../localization'
import { StatusBar } from 'expo-status-bar'
import styles from '../../util/style/Style'
import { ToastMessage } from '../../components/ToastMessage'

const Purchase = () => {

    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery, fetchOrderDetailMutation } = useHistoryTransaction('purchase')
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page?.data) || [];
    const nav = useAppNavigation()

    const onEndReached = () => {
        if (infiniteQuery.hasNextPage && !infiniteQuery.isLoading) {
            infiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { infiniteQuery.refetch() }, []);

    const fetchOrderDetail = (id: number) => {
        console.log(id)
        if (id == null) return ToastMessage('This purchase not exist detail!')

        fetchOrderDetailMutation.mutateAsync({ id }, {
            onSuccess: response => {
                if (response?.length) {
                    nav.navigate('review-order', { orderItem: response[0] })
                }
            }
        })
    }

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

    if (infiniteQuery.isLoading) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <>
            {fetchOrderDetailMutation.isPending && <ModalLoading isLoading={fetchOrderDetailMutation.isPending} />}
            <FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                renderItem={({ item, index }) => <TransactionHistory item={item} index={index} data={daraArr} onPress={id => fetchOrderDetail(id)} />}
                ListEmptyComponent={() => (<ListEmptyComponent />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={infiniteQuery.isRefetching} />}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </>
    )
}

export default Purchase