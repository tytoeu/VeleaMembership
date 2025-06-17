import { CriditCard, MemberCard, MenuTransaction, Promotion, PromotionCard } from '../components'
import { useAppSelector, useBackHandler } from '../hooks'
import home_style from '../util/style/HomeStyle'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Dimensions, FlatList, Modal, RefreshControl, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import useDashbaord from '../hooks/useDashbaord'
import styles from '../util/style/Style'
import { ICard } from '../hooks/interface/IDashboard'
import { useDispatch } from 'react-redux'
import { actionStoreTempAuth } from '../redux/temp'
import useNotification from '../hooks/useNotification'

const cardObject: ICard = {
    id: 0,
    card_number: "",
    offer_discount: 0,
    limit_type: "",
    limit_offer: 0,
    expire_date: "",
    status: 0,
    tier_name: "",
    tier_image: null
}

const HomeScreen = () => {
    const { theme, currentTheme, auth, countNotify } = useAppSelector((state) => state.cache)
    const { personalChange } = useAppSelector(state => state.temp)
    const backAction = useBackHandler()
    const { fetchMemberInfoMutation, infiniteQuery } = useDashbaord()
    const { } = useNotification()
    const dispatch = useDispatch()

    //extract data
    const { data, isPending } = fetchMemberInfoMutation

    // Extracts all data arrays from pages and merges them into a single array
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page?.data) || [];

    // fetch member data
    useEffect(() => {
        fetchMemberInfoMutation.mutate()
        dispatch(actionStoreTempAuth({
            name: data?.membership?.name ?? 'Guest',
            phone: data?.membership?.phone!,
            avatar: data?.membership?.avatar!
        }))
    }, [auth, personalChange, countNotify])

    useEffect(() => {
        dispatch(actionStoreTempAuth({
            name: data?.membership?.name ?? 'Guest',
            phone: data?.membership?.phone!,
            avatar: data?.membership?.avatar!
        }))
    }, [auth, data?.membership])

    // load pagination page
    const onEndReached = () => !infiniteQuery.isFetchingNextPage && infiniteQuery.fetchNextPage()

    // reload data
    const onRefresh = useCallback(() => {
        infiniteQuery.refetch()
        fetchMemberInfoMutation.mutate()
        if (data?.membership) {
            console.log('data', data?.membership)
            dispatch(actionStoreTempAuth({
                name: data?.membership?.name ?? 'Guest',
                phone: data?.membership?.phone!,
                avatar: data?.membership?.avatar!
            }))
        }
    }, []);

    const dataCards: ICard[] = [...data?.cards || [], cardObject];

    const listFooterComponent = () => {
        if (!infiniteQuery.isFetchingNextPage) return null;
        return <View style={{ paddingBottom: 20 }}><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
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
                        phone={data?.membership?.phone!}
                        balance={data?.membership?.balance?.toString()!}
                        point={Number(data?.membership?.point ?? 0)}
                    />

                    <MenuTransaction />
                    <View style={{ height: 25 }} />
                    <MemberCard isPromotion={daraArr.length > 0} items={dataCards} />
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