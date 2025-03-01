import { View, Text, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import HomeStyle from '../util/style/HomeStyle'
import menuStyle from '../util/style/MenuStyle'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import useMenu from '../hooks/useMenu'
import { IMenu } from '../hooks/interface/IMenu'

const MenuScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery } = useMenu()
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page);
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
                renderItem={({ item, index }) => (<View style={[menuStyle.card, { backgroundColor: theme.bgDark, shadowColor: '#000' }]} >
                    <Text style={[menuStyle.textTitle, { color: theme.color }]}>{item.title}</Text>
                    <Text style={[menuStyle.text, { color: theme.color }]}>{item.title}</Text>
                </View>)}
                ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshed} />}
            />
        </View>
    )
}

export default MenuScreen