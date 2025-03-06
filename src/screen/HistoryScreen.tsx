import { View, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import useGetPost from '../hooks/useGetPost'
import { useFocusEffect } from '@react-navigation/native'
import { TransactionHistory } from '../components'
import history_style from '../util/style/HistoryStyle'

const HistoryScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery } = useGetPost()
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page) || [];
    const [refreshed, setRefreshed] = useState(false)
    const scrollY = useSharedValue(0);

    useFocusEffect(
        useCallback(() => {
            scrollY.value = 0; // Reset scroll position when navigating to this screen
        }, [])
    );

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const onEndReached = () => {
        if (infiniteQuery.hasNextPage && !infiniteQuery.isLoading) {
            infiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshed(true)
        infiniteQuery.refetch().finally(() => setRefreshed(false))
    }, []);

    const ListFooterComponent = () => {
        if (infiniteQuery.isFetchingNextPage) {
            return <ActivityIndicator size={'small'} color={'#ddd'} />;
        }
        return null
    }

    return (
        <View style={[history_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Animated.FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onScroll={scrollHandler}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                renderItem={({ item, index }) => <TransactionHistory index={index} />}
                ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshed} />}
            />
        </View>
    )
}

export default HistoryScreen