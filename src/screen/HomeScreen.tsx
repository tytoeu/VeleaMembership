import { Pressable, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { actionStoreTempAuth, locationSeleted, setBottomSheetRef } from '../redux/temp'
import ModalSheetBottom, { ModalSheetBottomRef } from '../components/ModalSheetBottom'
import { EventSlider, ItemLayout, Loading, MyIconComponent, SlidePromotion } from '../components'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { ILocation } from '../hooks/interface/IAddress'
import { useCallback, useEffect, useRef } from 'react'
import useDashbaord from '../hooks/useDashbaord'
import useLocation from '../hooks/useLocation'
import useAddress from '../hooks/useAddress'
import { StatusBar } from 'expo-status-bar'
import MapView from 'react-native-maps'

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

const HomeScreen = () => {
    const { theme, currentTheme, auth } = useAppSelector((state) => state.cache)
    const { addressSeleted } = useAppSelector((state) => state.temp)
    const modalRef = useRef<ModalSheetBottomRef>(null)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()
    const { fetchMemberInfoMutation } = useDashbaord()
    const { fetchLocationInfiniteQuery } = useAddress();
    const { useCurrentLocation, formattedAddressing, region, setRegion } = useLocation()
    const location = fetchLocationInfiniteQuery.data as ILocation[]
    const { data } = fetchMemberInfoMutation

    const { homefiniteQuery } = useDashbaord()
    const visableTitle = homefiniteQuery.data?.items?.length ? false : true;
    const visableEvent = homefiniteQuery.data?.events?.length ? false : true;

    // reload data
    const onRefresh = useCallback(() => {
        homefiniteQuery.refetch()
        fetchLocationInfiniteQuery.refetch()
    }, []);

    const useCurrentLocations = async () => {
        modalRef.current?.close()
        useCurrentLocation()
        const { street, city, streetNumber, subregion } = await formattedAddressing()
        const address = (streetNumber && street) ? `${streetNumber ?? ''} ${street ?? ''}` : `${city ?? subregion}`
        const currentAddress: ILocation = {
            ...addressSeleted!,
            addressId: 0,
            address1: address,
            labelName: 'Current Location',
            labelIcon: 'location-outline'
        }
        dispatch(locationSeleted(currentAddress))
    }

    useEffect(() => {
        dispatch(setBottomSheetRef(modalRef.current));
        console.log(modalRef.current)
        return () => {
            dispatch(setBottomSheetRef(null));
        }
    }, [modalRef, dispatch, data?.membership])

    // fetch member data
    useEffect(() => {
        fetchMemberInfoMutation.mutate()
        fetchLocationInfiniteQuery.refetch()
        dispatch(actionStoreTempAuth({
            name: data?.membership?.name ?? 'Guest',
            phone: data?.membership?.phone!,
            avatar: data?.membership?.avatar!
        }))
    }, [auth])

    useEffect(() => {
        dispatch(actionStoreTempAuth({
            name: data?.membership?.name ?? 'Guest',
            phone: data?.membership?.phone!,
            avatar: data?.membership?.avatar!
        }))
    }, [data?.membership])

    useEffect(() => {
        if (auth && location?.length) {
            const defaultLocation = location.find(item => item.isDefault == 1)!
            dispatch(locationSeleted(defaultLocation))
        } else {
            useCurrentLocations()
        }
    }, [location, auth])

    const ThemeTitle = ({ title, visable }: { title: string, visable: boolean }) => {
        if (visable) return null;
        return (<View className='flex-row justify-between items-center mx-5 mt-5'>
            <Text className='color-slate-900 dark:color-slate-100 font-semibold text-xl tracking-wider'>{title}</Text>
            <Pressable>
                <Text className='color-orange-700 font-medium px-2'>View All</Text>
            </Pressable>
        </View>)
    }

    const SearchButton = () => {
        return (<Pressable
            onPress={() => nav.navigate('search-item')}
            className='flex-row h-14 bg-white/60 dark:bg-white/10 items-center mb-6 mx-3 mt-3 rounded-lg px-4'>
            <Ionicons name='search-outline' color={theme.colorText} size={22} />
            <Text className='ms-3 color-slate-500 dark:color-slate-400 font-medium text-sm'>Search...</Text>
        </Pressable>)
    }

    if (homefiniteQuery.isLoading) return <Loading />

    return (
        <View className='flex-1 dark:bg-black'>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ScrollView
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={homefiniteQuery.isRefetching} />}
                contentContainerStyle={{ backgroundColor: theme.background }} showsVerticalScrollIndicator={false}>
                <SearchButton />

                {/* Slide */}
                <SlidePromotion data={homefiniteQuery.data?.data} />

                {/* item */}
                <View style={{ height: 25 }} />
                <ThemeTitle title={homefiniteQuery.data?.item_title} visable={visableTitle} />
                <ItemLayout data={homefiniteQuery.data?.items} />

                <View style={{ height: 30 }} />
                <ThemeTitle title={'Event'} visable={visableEvent} />
                <EventSlider data={homefiniteQuery.data?.events} />

                <View style={{ height: 20 }} />
            </ScrollView>
            <ModalSheetBottom
                snapPoint={['50%']}
                ref={modalRef}
            >
                <View className='p-4'>
                    <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Where you want to place order</Text>
                    <View className='rounded-lg mt-4 bg-white dark:bg-white/10' style={[shadow, { height: 175, padding: 10 }]}>
                        <MapView
                            style={{ height: 120, width: '100%', borderRadius: 200 }}
                            initialRegion={region}
                            showsUserLocation={true}
                            showsMyLocationButton={false}
                            mapType='standard'
                            provider='google'
                            zoomEnabled={false}
                            zoomControlEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            minZoomLevel={17}
                            onPress={() => nav.navigate('location', { item: null })}
                        />
                        <View className='py-3 flex-row items-center'>
                            <Ionicons name='navigate-outline' color={addressSeleted?.addressId == 0 ? '#ea580c' : theme.colorText} size={20} />
                            <Text className='font-semibold ms-3' style={{ color: addressSeleted?.addressId == 0 ? '#ea580c' : theme.colorText }}>
                                Current location
                            </Text>
                        </View>
                    </View>
                    {(auth && location?.length) ? location.map((item, index) => {
                        const color = addressSeleted?.addressId == item.addressId ? '#ea580c' : theme.colorText
                        return <View key={index} style={shadow} className='rounded-lg p-3 flex-row items-center justify-between mt-3 bg-white dark:bg-white/10'>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(locationSeleted(item))
                                    modalRef.current?.close()
                                    setRegion({ ...region, latitude: item.latitude, longitude: item.longitude })
                                }}
                                className='flex-row w-80'>
                                <MyIconComponent name={item.labelIcon} color={color} size={20} type='Ionicons' />
                                <View>
                                    <Text numberOfLines={1} className='font-semibold ms-3' style={{ color }}>{item.address1}</Text>
                                    <Text numberOfLines={1} className='font-normal text-sm ms-3' style={{ color }}>{item.labelName}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className='p-3' onPress={() => nav.navigate('location', { item })}>
                                <AntDesign name="edit" size={20} color={theme.color} />
                            </TouchableOpacity>
                        </View>
                    }) : undefined}
                    <View className='flex-row justify-between items-center mt-4'>
                        <TouchableOpacity className='py-3 flex-row items-center' onPress={() => nav.navigate('location', { item: null })}>
                            <Ionicons name='add-outline' color={theme.colorText} size={20} />
                            <Text className='color-slate-800 dark:color-slate-100 font-semibold ms-3'>Add Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalSheetBottom>
        </View>
    )
}

export default HomeScreen