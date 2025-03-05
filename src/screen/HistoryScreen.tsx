import { View, Text, TextInput, Button, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useAppSelector } from '../hooks'
import HomeStyle from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'
import useInputText from '../hooks/useInputText'
import HistoryStyle from '../util/style/HistoryStyle'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import useGetPost from '../hooks/useGetPost'
import { useFocusEffect } from '@react-navigation/native'
import menuStyle from '../util/style/MenuStyle'

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
                renderItem={({ item, index }) => (<View style={[menuStyle.card, { backgroundColor: theme.bgDark, shadowColor: theme.background, width: '98%', alignSelf: 'center', padding: 10 }]} >
                    <Text style={[menuStyle.textTitle, { color: theme.color }]}>{item.title}</Text>
                    <Text style={[menuStyle.text, { color: theme.colorText }]}>{item.body}</Text>
                </View>)}
                ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshed} />}
            />
        </View>
    )
}

export default HistoryScreen