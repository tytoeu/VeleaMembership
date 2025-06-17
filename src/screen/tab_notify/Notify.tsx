import { View, Text, FlatList, RefreshControl, ActivityIndicator, ListRenderItem, TouchableOpacity } from 'react-native'
import { useAppNavigation } from '../../hooks';
import React, { useCallback, useState } from 'react'
import { Loading, MyIconComponent } from '../../components'
import i18n from '../../localization';
import useDashbaord from '../../hooks/useDashbaord';

interface INotify {
    id: number;
    title: string;
    message: string;
    icon_name: string;
    icon_type: "Ionicons" | "FontAwesome";
    promotion: promotion | null
}

interface promotion {
    id: number;
    title: string;
    description: string;
    image: string;
    status: number;
    start_date: string;
    closing_date: string;
    created_at: string;
}

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}

const Notify = () => {

    const { generalNotificationInfiniteQuery } = useDashbaord()
    const nav = useAppNavigation()

    const daraArr = generalNotificationInfiniteQuery.data?.pages.flatMap(page => page?.data) || [];
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onEndReached = () => {
        if (generalNotificationInfiniteQuery.hasNextPage && !generalNotificationInfiniteQuery.isLoading) {
            generalNotificationInfiniteQuery.fetchNextPage()
        }
    }

    const onRefresh = useCallback(() => { generalNotificationInfiniteQuery.refetch() }, []);

    const onPress = (item: promotion | null, index: number) => {
        if (item) {
            nav.navigate('promotion', { item: item })
        } else {
            setActiveIndex(prev => (prev === index ? null : index));
        }
    }

    const ListFooterComponent = () => {
        if (generalNotificationInfiniteQuery.isFetchingNextPage) {
            return <View className='pb-20'><ActivityIndicator size={'small'} color={'#ddd'} /></View>;
        }
        return null
    }

    const ListEmptyComponent = () => {
        if (generalNotificationInfiniteQuery.data?.pages?.length) {
            return <Text className='color-slate-600 dark:color-slate-300 pt-10 font-semibold text-center tracking-wide'>{i18n.t('No avaliable data')}</Text>
        }
        return null
    }

    const renderItem: ListRenderItem<INotify> = ({ item, index }) => {
        return (<TouchableOpacity activeOpacity={0.8}
            className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 overflow-hidden'
            style={shadow}
            onPress={() => onPress(item.promotion, index)}>

            <View className='flex-row'>
                <View className='w-10 h-10 bg-orange-700 rounded-[100] justify-center items-center mr-3 mt-2'>
                    <MyIconComponent name={item.icon_name} size={18} color={'white'} type={'FontAwesome'} />
                </View>
                <View className='w-[88%]'>
                    <Text className='font-bold tracking-tight text-[15px] color-orange-700' numberOfLines={1}>{item.title}</Text>
                    <Text className='leading-8 font-medium text-[12px] opacity-70 dark:color-slate-200' numberOfLines={activeIndex == index ? 0 : 1}>{item.message}</Text>
                </View>
            </View>


        </TouchableOpacity>)
    }

    if (generalNotificationInfiniteQuery.isFetching) return <Loading />

    return (
        <View className='flex-1 dark:bg-black'>
            <FlatList
                data={daraArr}
                renderItem={renderItem}
                ListEmptyComponent={() => (<ListEmptyComponent />)}
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={generalNotificationInfiniteQuery.isRefetching} />}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                contentContainerStyle={{ width: '90%', alignSelf: 'center', paddingVertical: 20 }}
            />
        </View>
    )
}

export default Notify