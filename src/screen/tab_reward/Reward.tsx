import { View, Text, ActivityIndicator, FlatList, RefreshControl, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useAppSelector } from '../../hooks'
import React, { useCallback, useState } from 'react'
import i18n from '../../localization'
import { Loading, RewardItem } from '../../components'
import useRedeem from '../../hooks/useRedeem'
import { IChangeData, IItem } from '../../hooks/interface/IItem'
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper'
import { ToastMessage } from '../../components/ToastMessage'
import { styles } from './style'



const Reward = () => {
    const { theme, auth } = useAppSelector((state) => state.cache)
    const { redeemItemsInfiniteQuery, changeRedeemItemMutation, userItemsInfiniteQuery } = useRedeem()
    const daraArr = redeemItemsInfiniteQuery.data?.pages.flatMap(page => page?.data) || [];
    const current_point = redeemItemsInfiniteQuery.data?.pages[0]?.current_point

    const [state, setState] = useState({
        isModal: false,
        item: null as IItem | null
    })

    const onEndReached = () => {
        if (redeemItemsInfiniteQuery.hasNextPage && !redeemItemsInfiniteQuery.isLoading) {
            redeemItemsInfiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { redeemItemsInfiniteQuery.refetch() }, []);

    const itemSelected = (item: IItem) => setState({ ...state, isModal: true, item })

    const changeItemAction = async () => {
        const dataJson: IChangeData = {
            membership_id: auth?.id as number,
            redeem_id: state.item?.id as number,
            change_point: state.item?.min_point as number
        }
        changeRedeemItemMutation.mutateAsync(dataJson, {
            onSuccess: (response) => {
                setState({ ...state, isModal: false })
                if (response?.status) {
                    redeemItemsInfiniteQuery.refetch()
                    userItemsInfiniteQuery.refetch()
                    ToastMessage(`The ${state.item?.item_name} change successfully.`)
                } else {
                    ToastMessage(response?.message, undefined, 'red')
                }
            }
        })
    }

    if (redeemItemsInfiniteQuery.isLoading) return <Loading />

    const ListFooterComponent = () => {
        if (redeemItemsInfiniteQuery.isFetchingNextPage) {
            return <View style={{ paddingBottom: 20 }}><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
        }
        return null
    }

    const ListEmptyComponent = () => {
        if (redeemItemsInfiniteQuery.data?.pages?.length) {
            return <Text style={{ color: theme.color, textAlign: 'center', opacity: 0.7, marginTop: '10%' }}>{i18n.t('No avaliable data')}</Text>
        }
        return null
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
                renderItem={({ item, index }) => <RewardItem type='REWARD' item={item} index={index} data={daraArr} current_point={current_point} onPress={() => itemSelected(item)} />}
                ListEmptyComponent={() => (<ListEmptyComponent />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={redeemItemsInfiniteQuery.isRefetching} />}
                contentContainerStyle={{ paddingHorizontal: 16, marginTop: 10 }}
                key={2}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
            />
            <Modal animationType='fade' transparent visible={state.isModal} onRequestClose={() => setState({ ...state, isModal: false })}>
                <View style={styles.modal_overlay}>
                    <View style={[styles.modal_content, { backgroundColor: theme.modal }]}>
                        <TouchableOpacity style={[styles.modal_close]} onPress={() => setState({ ...state, isModal: false })}>
                            <Ionicons name='close-outline' color={'#ff0000'} size={24} />
                        </TouchableOpacity>

                        <Image
                            source={{ uri: state.item?.image }}
                            style={styles.modal_image}
                        />

                        <Text style={[styles.item_name, { color: theme.color }]}>{state.item?.item_name}</Text>
                        <Text style={[styles.item_type, { color: theme.color }]}>{state.item?.item_type}</Text>
                        <Text style={[styles.description, { color: theme.color }]}>{state.item?.description}</Text>
                        {/* <Text style={[styles.item_type, { color: theme.color, fontSize: 10 }]}>Exp: {state.item?.expired}</Text> */}

                        <Button
                            mode='contained'
                            contentStyle={{ borderRadius: 0 }}
                            style={styles.button}
                            onPress={changeItemAction}
                            disabled={state.item?.min_point! <= current_point ? false : true}
                            loading={changeRedeemItemMutation.isPending}
                            textColor='white'
                        >
                            Change Point ({current_point}/{state.item?.min_point})
                        </Button>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Reward

