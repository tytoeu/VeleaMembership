import { View, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import { AddToCard, CategoryCard, ItemCard, SubCategoryCard } from '../components'
import { useAppNavigation, useAppSelector } from '../hooks'
import { IMenu } from '../hooks/interface/IMenu'
import HomeStyle from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import useMenu from '../hooks/useMenu'

const MenuScreen = () => {
    const nav = useAppNavigation()
    // use custom hook for data action state
    const { infiniteQuery, categoryQuery, subCategoryQuery } = useMenu()

    // use redux for action state
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    // Extracts all data arrays from pages and merges them into a single array
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page?.response?.data as IMenu[]) || [];

    // data declearation object
    const all = { categoryId: '', name: "All", image: null, itemCount: 0 };

    // app one object to array
    const appendAllToCategories = !categoryQuery.isFetching ? [all, ...categoryQuery.data?.data || []] : []

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
                data={appendAllToCategories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (<CategoryCard item={item} />)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 16, paddingHorizontal: 10 }}
            />

            <FlatList
                data={subCategoryQuery.data?.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<SubCategoryCard item={item} />)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 8, paddingHorizontal: 10 }}
            />

            <FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 16 }}
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

            <AddToCard onPress={() => nav.navigate('cart-list')} />
        </View>
    )
}

export default MenuScreen