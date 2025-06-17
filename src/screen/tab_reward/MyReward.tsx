import { View, Text, ActivityIndicator, FlatList, RefreshControl, Modal, TouchableOpacity } from 'react-native'
import { Authorization, Loading, RewardItem } from '../../components'
import { useAppSelector } from '../../hooks'
import React, { useCallback, useState } from 'react'
import i18n from '../../localization'
import useRedeem from '../../hooks/useRedeem'
import { styles } from './style'
import { Ionicons } from '@expo/vector-icons'
import { IUserItems } from '../../hooks/interface/IItem'
import QRCode from 'react-native-qrcode-svg'

const MyReward = () => {
    const { theme, currentTheme, auth } = useAppSelector((state) => state.cache)
    const { userItemsInfiniteQuery } = useRedeem()
    const daraArr = userItemsInfiniteQuery.data?.pages.flatMap(page => page) || [];

    const [state, setState] = useState({
        isModal: false,
        item: null as IUserItems | null
    })

    const onEndReached = () => {
        if (userItemsInfiniteQuery.hasNextPage && !userItemsInfiniteQuery.isLoading) {
            userItemsInfiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { userItemsInfiniteQuery.refetch() }, []);

    if (userItemsInfiniteQuery.isLoading) return <Loading />

    const ListFooterComponent = () => {
        if (userItemsInfiniteQuery.isFetchingNextPage) {
            return <View style={{ paddingBottom: 20 }}><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
        }
        return null
    }
    const ListEmptyComponent = () => {
        if (userItemsInfiniteQuery.data?.pages?.length) {
            return <Text style={{ color: theme.color, textAlign: 'center', opacity: 0.7, marginTop: '10%' }}>{i18n.t('No avaliable data')}</Text>
        }
        return null
    }

    if (!auth) {
        return <View className='flex-1 justify-center items-center bg-white dark:bg-black'>
            <Authorization navigate={null} />
        </View>
    }

    return (
        <View>
            <FlatList
                data={daraArr}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                renderItem={({ item, index }) => <RewardItem item={item} index={index} data={daraArr} onPress={() => setState({ ...state, item, isModal: true })} type='MY_REWARD' />}
                ListEmptyComponent={() => (<ListEmptyComponent />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={userItemsInfiniteQuery.isRefetching} />}
                contentContainerStyle={{ paddingHorizontal: 16, marginTop: 10 }}
                key={2}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
            />
            <Modal animationType='fade' transparent visible={state.isModal} onRequestClose={() => setState({ ...state, isModal: false })}>
                <View style={styles.modal_overlay}>
                    <View style={[styles.modal_content, { backgroundColor: theme.modal, width: '75%' }]}>
                        <TouchableOpacity style={[styles.modal_close]} onPress={() => setState({ ...state, isModal: false })}>
                            <Ionicons name='close-outline' color={'#ff0000'} size={24} />
                        </TouchableOpacity>

                        <View style={[styles.qrcode, { backgroundColor: currentTheme == 'dark' ? 'white' : '#f8f9f9' }]}>
                            <QRCode
                                logoBackgroundColor='transparent'
                                size={150} value={`${state.item?.redeem_code},${state.item?.item_id},${state.item?.expired}`}
                            />
                        </View>

                        <Text style={[styles.item_name, { color: theme.color }]}>{state.item?.item_name}</Text>
                        <Text style={[styles.item_type, { color: theme.color }]}>{state.item?.item_type}</Text>
                        <Text style={[styles.description, { color: theme.color }]}>{state.item?.description}</Text>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default MyReward