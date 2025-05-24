import { CriditCard, MemberCard, MenuTransaction, Promotion, PromotionCard } from '../components'
import { useAppSelector, useBackHandler } from '../hooks'
import home_style from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Dimensions, FlatList, Modal, RefreshControl, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import useDashbaord from '../hooks/useDashbaord'
import styles from '../util/style/Style'

const WIDTH = Dimensions.get('screen').width

const HomeScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const backAction = useBackHandler()
    const { fetchMemberInfoMutation, infiniteQuery } = useDashbaord()

    //extract data
    const { data, isPending } = fetchMemberInfoMutation

    // Extracts all data arrays from pages and merges them into a single array
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page?.data) || [];

    // fetch member data
    useEffect(() => { fetchMemberInfoMutation.mutate() }, [])

    // load pagination page
    const onEndReached = () => !infiniteQuery.isFetchingNextPage && infiniteQuery.fetchNextPage()

    // reload data
    const onRefresh = useCallback(() => {
        infiniteQuery.refetch()
        fetchMemberInfoMutation.mutate()
    }, []);

    const listFooterComponent = () => {
        if (!infiniteQuery.isFetchingNextPage) return null;
        return <ActivityIndicator size={'small'} color={'#ddd'} />;
    }

    if (isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <View style={[home_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <FlatList
                data={daraArr}
                contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <PromotionCard item={item} />}
                ListHeaderComponent={() => <>
                    <CriditCard
                        phone={data?.phone!}
                        balance={data?.balance?.toString()!}
                        point={Number(data?.point ?? 0)}
                    />

                    <MenuTransaction />
                    <View style={{ height: 25 }} />
                    <MemberCard isPromotion={daraArr.length > 0} />
                </>}
                ListFooterComponent={listFooterComponent}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={infiniteQuery.isRefetching} />}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
                keyboardShouldPersistTaps="handled"
                initialNumToRender={10}
                windowSize={4}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
            />
        </View>
    )
}

export default HomeScreen