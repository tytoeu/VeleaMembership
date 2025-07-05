import { View, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import { ItemCard } from '../components'
import { useAppSelector } from '../hooks'
import { IMenu } from '../hooks/interface/IMenu'
import HomeStyle from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import useMenu from '../hooks/useMenu'

const SearchItemScreen = () => {
    const { infiniteQuery } = useMenu()

    // use redux for action state
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    // Extracts all data arrays from pages and merges them into a single array
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page?.response?.data as IMenu[]) || [];

    // load pagination page
    const onEndReached = () => !infiniteQuery.isFetchingNextPage && infiniteQuery.fetchNextPage()

    // reload data
    const onRefresh = useCallback(() => { infiniteQuery.refetch() }, []);

    const ListFooterComponent = () => {
        if (!infiniteQuery.isFetchingNextPage) return null;
        return <ActivityIndicator size={'small'} color={'#ddd'} />;
    }

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />

            <FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
                renderItem={({ item, index }) => (<ItemCard items={item} />)}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={infiniteQuery.isRefetching} />}
                numColumns={2}
                key={2}
                columnWrapperStyle={{ gap: 12, justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                keyboardShouldPersistTaps="handled"
                initialNumToRender={10}
                windowSize={4}
            />
        </View>
    )
}

export default SearchItemScreen