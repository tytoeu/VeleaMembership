import { View, Text, ActivityIndicator, RefreshControl, ListRenderItem } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import HomeStyle from '../util/style/HomeStyle'
import menuStyle from '../util/style/MenuStyle'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import useMenu from '../hooks/useMenu'
import { IMenu } from '../hooks/interface/IMenu'
import { ItemCard } from '../components'

const MenuScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery } = useMenu()
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page.response?.data) ?? [];
    const [refreshed, setRefreshed] = useState(false)
    const scrollY = useSharedValue(0);

    useFocusEffect(
        useCallback(() => {
            scrollY.value = 0;
        }, [])
    );

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const onEndReached = () => {
        if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
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
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <Animated.FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onScroll={scrollHandler}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                contentContainerStyle={{ paddingTop: 10 }}
                renderItem={({ item, index }) => (<ItemCard items={item} />)}
                ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshed} />}
                numColumns={2}
                columnWrapperStyle={{ gap: 12, justifyContent: 'center' }}
            />
        </View>
    )
}

export default MenuScreen