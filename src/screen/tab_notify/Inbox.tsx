import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, ListRenderItem } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useAppSelector } from '../../hooks';
import useDashbaord from '../../hooks/useDashbaord';
import { Authorization, Loading, MyIconComponent } from '../../components';
import i18n from '../../localization';


interface INotify {
    id: number;
    title: string;
    message: string;
    icon_name: string;
    icon_type: "Ionicons" | "FontAwesome";
}

const Inbox = () => {
    const { theme, auth } = useAppSelector(state => state.cache)

    const { notificationInfiniteQuery } = useDashbaord()
    const color = 'red'

    const daraArr: INotify[] = notificationInfiniteQuery.data?.pages.flatMap(page => page) || [];

    const onEndReached = () => {
        if (notificationInfiniteQuery.hasNextPage && !notificationInfiniteQuery.isLoading) {
            notificationInfiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { notificationInfiniteQuery.refetch() }, []);

    if (notificationInfiniteQuery.isFetching) return <Loading />

    const ListFooterComponent = () => {
        if (notificationInfiniteQuery.isFetchingNextPage) {
            return <View style={{ paddingBottom: 20 }}><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
        }
        return null
    }

    const ListEmptyComponent = () => {
        if (notificationInfiniteQuery.data?.pages?.length) {
            return <Text className='color-slate-600 dark:color-slate-300 pt-10 font-semibold text-center'>{i18n.t('No avaliable data')}</Text>
        }
        return null
    }

    const renderItem: ListRenderItem<INotify> = ({ item, index }) => {
        return (<View style={[styles.tran_card, { backgroundColor: theme.bgDark }]}>
            <View style={styles.icon_content}>
                <View style={[styles.tran_icon, { backgroundColor: '#b9770e' }]}>
                    <MyIconComponent name={item.icon_name} type={item.icon_type} size={20} color={'white'} />
                </View>
                <View style={{ width: '90%' }}>
                    <Text style={[styles.tran_text, { color: theme.color }]}>{item.title}</Text>
                    <Text style={[styles.tran_name_text, { color: theme.color }]}>{item.message}</Text>
                </View>
            </View>
            <Text style={[styles.tran_text_balance, { color }]}></Text>
        </View>)
    }

    if (!auth) {
        return <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Authorization navigate={null} />
        </View>
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={daraArr}
                renderItem={renderItem}
                ListEmptyComponent={() => (<ListEmptyComponent />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={notificationInfiniteQuery.isRefetching} />}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
            />
        </View>
    )
}

export default Inbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    tran_card: {
        width: '100%',
        minHeight: 70,
        marginBottom: 16,
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon_content: {
        flexDirection: 'row'
    },
    tran_icon: {
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    tran_date_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center',
        marginTop: 10
    },
    tran_border: {
        borderBottomWidth: 1,
        width: '38%',
        opacity: 0.6
    },
    tran_date: {
        fontFamily: 'R500',
        opacity: 0.8,
        fontSize: 12
    },
    tran_text_balance: {
        fontSize: 14,
        fontFamily: 'R700'
    },
    tran_name_text: {
        fontSize: 12,
        fontFamily: 'R500',
        opacity: 0.6,
        lineHeight: 16
    },
    tran_text: {
        fontFamily: 'R500',
        fontSize: 14,
        marginBottom: 5
    }
})