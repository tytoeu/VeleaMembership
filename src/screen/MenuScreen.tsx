import { View, Text, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import HomeStyle from '../util/style/HomeStyle'
import useMenu from '../hooks/useMenu'
import { CategoryCard, ItemCard, SubCategoryCard } from '../components'

const MenuScreen = () => {
    const {
        infiniteQuery,
        categoryQuery,
        subCategoryQuery,
        setSelectedCategoryId,
        setSelectedSubCategoryId,
        setSelectedCategory,
        selectedCategoryId,
        selectedSubCategoryId
    } = useMenu()

    const all = {
        categoryId: '',
        name: "All",
        image: null,
        itemCount: 0
    };

    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page.response?.data) ?? [];
    const [refreshed, setRefreshed] = useState(false)

    const categories = categoryQuery.data?.data || [];

    const appendAllToCategories = [all, ...categories];

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

            <FlatList
                data={appendAllToCategories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<CategoryCard
                    item={item}
                    setSelectedCategoryId={setSelectedCategoryId}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubCategoryId={setSelectedSubCategoryId}
                    seleted={selectedCategoryId == item.categoryId?.toString()}
                />)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 16, paddingHorizontal: 10 }}
            />

            <FlatList
                data={subCategoryQuery.data?.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<SubCategoryCard
                    item={item}
                    setSelectedSubCategoryId={setSelectedSubCategoryId}
                    selected={selectedSubCategoryId == item.subId?.toString()}
                />)}
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
                contentContainerStyle={{ paddingTop: 10 }}
                renderItem={({ item, index }) => (<ItemCard items={item} />)}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (<ActivityIndicator size={'small'} color={'#ddd'} />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshed} />}
                numColumns={2}
                columnWrapperStyle={{ gap: 12, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default MenuScreen