import { View, StyleSheet, Animated, TouchableOpacity, Text, Pressable, KeyboardAvoidingView, Image, ActivityIndicator, FlatList } from 'react-native';
import ModalSheetBottomNotScroll from '../../components/ModalSheetBottomNotScroll'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { IAddress, ILocation } from '../../hooks/interface/IAddress';
import { useAppNavigation, useAppSelector } from '../../hooks';
import { ToastMessage } from '../../components/ToastMessage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useInputText from '../../hooks/useInputText';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import useLocation from '../../hooks/useLocation';
import { TextInput } from 'react-native-paper';
import useAddress from '../../hooks/useAddress';
import { Layout } from '../../components';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox';
import { assets } from '../../../assets';

const PIN_HEIGHT = 40;
const PIN_WIDTH = 30;
const LIFT = -28;
const img = assets.img

const apiKey = Constants?.expoConfig?.extra?.googlePlacesApiKey;
type PropType = { item: ILocation }
type LabelType = {
    icon: '',
    label: string
}

const LocationScreen = () => {
    const router = useRoute()
    const { item } = router.params as PropType
    const nav = useAppNavigation()
    const { theme, currentTheme, auth } = useAppSelector(state => state.cache)
    const { tempAuth } = useAppSelector(state => state.temp)
    const { handleTextChange, input } = useInputText()
    const {
        postAddressMutation,
        fetchLocationInfiniteQuery,
        fetchLabelLocationInfiniteQuery
    } = useAddress();
    const {
        useCurrentLocation,
        drop,
        modalRef,
        isDragging,
        isAnimating,
        region,
        translateY,
        shadowOpac,
        shadowScale,
        setRegion, lift,
        formattedAddressing,
        mapRef,
        goTo
    } = useLocation()

    const [inputValue, setInputValue] = useState<string>('');
    const [hasResults, setHasResults] = React.useState<boolean | null>(null);
    const [state, setState] = useState({
        label: 'Home',
        icon: 'home',
        isDefault: false,
        index: 0
    })

    const { data } = fetchLabelLocationInfiniteQuery;

    const savedAddress = () => {
        const jsonData: IAddress = {
            id: auth?.id!,
            labelName: state.label,
            labelIcon: state.icon,
            address1: input?.address!,
            address2: "",
            address3: "",
            latitude: region.latitude,
            longitude: region.longitude,
            isDefault: state.isDefault ? 1 : 0,
            contactName: tempAuth?.name!,
            contactPhone: input?.phone!,
            addressId: item?.addressId
        }

        postAddressMutation.mutateAsync(jsonData, {
            onSuccess: (res) => {
                console.log(res)
                if (res?.status) {
                    nav.goBack()
                    fetchLocationInfiniteQuery.refetch()
                    ToastMessage(res?.message)
                } else {
                    ToastMessage(res?.message)
                }
            }
        })
    }

    useEffect(() => {
        if (item && data?.length > 0) {
            handleTextChange('address', item.address1)
            handleTextChange('phone', item.contactPhone)
            const labelData: LabelType[] = data
            const index = labelData.findIndex(x => x.label == item.labelName)

            setTimeout(() => {
                goTo(item.latitude, item.longitude)
            }, 3000)

            setState({
                ...state,
                icon: item.labelIcon,
                label: item.labelName,
                isDefault: item.isDefault == 1 ? true : false,
                index: index
            })
            setRegion({
                ...region,
                latitude: item.latitude,
                longitude: item.longitude
            })
        } else {
            handleTextChange('phone', tempAuth?.phone as string)
            // setTimeout(() => {
            //     useCurrentLocation();
            // }, 3000);
        }
    }, [item]);

    useEffect(() => {
        (async () => {
            const { street, city, streetNumber, subregion } = await formattedAddressing()
            const address = (streetNumber && street) ? `${streetNumber ?? ''} ${street ?? ''}` : `${city ?? subregion}`
            handleTextChange('address', address)
        })()
    }, [region]);

    const borderstyle = {
        borderWidth: 1,
        borderColor: 'orange'
    }
    const backgroundColor = currentTheme == 'light' ? 'white' : theme.bgInput

    return (
        <View className='flex-1 dark:bg-black'>
            <TouchableOpacity style={styles.back} onPress={() => nav.goBack()}>
                <Ionicons name='chevron-back-outline' size={24} />
            </TouchableOpacity>

            <View style={styles.container}>
                <MapView
                    ref={mapRef}
                    initialRegion={region}
                    onPanDrag={() => {
                        if (!isDragging.current) {
                            isDragging.current = true;
                            lift();
                        }
                    }}
                    onRegionChange={setRegion}
                    onRegionChangeComplete={(newRegion, details) => {
                        if (isAnimating.current && !details?.isGesture) {
                            // programmatic move just finished
                            isAnimating.current = false;
                            drop();                               // drop the pin
                        } else if (isDragging.current) {
                            // user finished dragging (your old logic)
                            isDragging.current = false;
                            drop();
                        }
                    }}
                    style={StyleSheet.absoluteFillObject}
                    minZoomLevel={10}
                    showsTraffic={true}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                />

                <TouchableOpacity
                    style={styles.myLocationBtn}
                    onPress={useCurrentLocation}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="my-location" size={24} color="#000" />
                </TouchableOpacity>

                {/* pin shadow */}
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.shadow,
                        {
                            opacity: shadowOpac,
                            transform: [{ scale: shadowScale }],
                        },
                    ]}
                />

                {/* pin image */}
                <Animated.Image
                    source={img.pin}
                    style={[
                        styles.pin,
                        {
                            transform: [{ translateY }],
                        },
                    ]}
                />
            </View>

            <Layout style={[styles.content, { backgroundColor: currentTheme == 'light' ? 'white' : 'black' }]}>
                <View style={{ height: 10 }} />
                <Text className='text-lg font-bold color-slate-800 dark:color-slate-100'>Create Your Location</Text>
                <TextInput
                    label="Address"
                    mode="outlined"
                    outlineStyle={{ borderRadius: 5 }}
                    style={{ width: '100%', marginTop: 15, backgroundColor }}
                    right={<TextInput.Icon icon="map-search-outline" color={theme.main} onPress={() => modalRef.current?.present()} />}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    value={input?.address}
                    onChangeText={text => handleTextChange('address', text)}
                />

                <TextInput
                    label="Phone Number"
                    mode="outlined"
                    outlineStyle={{ borderRadius: 5 }}
                    style={{ width: '100%', marginTop: 15, backgroundColor }}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    keyboardType='numeric'
                    onChangeText={text => handleTextChange('phone', text)}
                    value={input?.phone}
                />
                <Text className='text-lg font-bold mt-4 color-slate-800 dark:color-slate-100'>Give a label</Text>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (<TouchableOpacity style={[styles.labelButton, state.index == index ? borderstyle : '', { backgroundColor: theme.bgDark }]}
                            onPress={() => setState({ ...state, label: item.label, icon: 'briefcase-outline', index })}>
                            <Ionicons name={item.icon} size={18} color={'#999'} />
                            <Text className='ms-3 font-medium color-slate-800 dark:color-slate-100'>{item.label}</Text>
                        </TouchableOpacity>)
                    }}
                    horizontal
                    contentContainerStyle={{ paddingVertical: 12 }}
                />

                <Pressable className='flex-row items-center mt-4 mb-3' onPress={() => setState({ ...state, isDefault: !state.isDefault })}>
                    <Checkbox value={state.isDefault} onValueChange={() => setState({ ...state, isDefault: !state.isDefault })} />
                    <Text className='text-lg font-bold color-slate-800 dark:color-slate-100 ml-3'>As Default</Text>
                </Pressable>
            </Layout>

            <View style={{ height: 80 }}>
                <TouchableOpacity
                    disabled={postAddressMutation.isPending}
                    onPress={savedAddress}
                    className='bg-orange-800 absolute w-[27.5rem] self-center bottom-0 h-14 items-center justify-center rounded-xl'>
                    {postAddressMutation.isPending ? <ActivityIndicator size={'small'} color={'#999'} /> : <Text className='font-bold text-lg color-slate-50'>Save</Text>}
                </TouchableOpacity>
            </View>

            <ModalSheetBottomNotScroll
                snapPoint={['80']}
                ref={modalRef}
            >
                <KeyboardAvoidingView style={{
                    flex: 1,
                    padding: 16
                }}>
                    <GooglePlacesAutocomplete
                        placeholder=""
                        fetchDetails
                        minLength={2}
                        debounce={300}
                        enablePoweredByContainer
                        predefinedPlaces={[]}
                        query={{ key: apiKey, language: 'en' }}
                        onPress={(data, details) => {
                            setHasResults(true);
                            console.log(details?.geometry.location);
                            setRegion({
                                ...region,
                                latitude: details?.location.latitude!,
                                longitude: details?.location.longitude!
                            })
                        }}
                        textInputProps={{
                            InputComp: TextInput,
                            label: 'Find address',
                            mode: 'outlined',
                            outlineStyle: { borderRadius: 12, },
                            style: { width: '100%', backgroundColor },
                            inputValue,
                            onChangeText: setInputValue,
                            onFocus: () => console.log('focus'),
                            onBlur: () => console.log('blur'),
                            autoFocus: true,
                        }}
                        listEmptyComponent={() => {
                            if (hasResults !== false) setHasResults(false);
                            return <Text style={{ padding: 12, color: theme.colorText }}>No places found</Text>;
                        }}
                        onNotFound={() => {
                            setHasResults(false);
                            console.warn('Place details not found');
                        }}
                        onFail={err => {
                            setHasResults(false);
                            console.error('Places error', err);
                        }}
                        styles={styleGoogleSearch}
                    />
                    <View style={{ height: 500 }}>
                        <Image
                            source={require('../../../assets/location.png')}
                            style={{ width: 120, height: 140, alignSelf: 'center', marginTop: 50 }}
                        />
                        <Text className='text-center mt-3 font-semibold text-lg color-slate-600 dark:color-slate-200'>
                            Please enter your nearly location
                        </Text>
                        <TouchableOpacity className='items-center p-4' onPress={useCurrentLocation}>
                            <Text className='font-medium color-slate-500 dark:color-slate-200'>
                                Use my current location
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ModalSheetBottomNotScroll>
        </View>
    )
}

export default LocationScreen

const styleGoogleSearch = {
    listView: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: 4,
        backgroundColor: '#fff',
        maxHeight: 200
    },
    textInputContainer: { width: '100%' },
}


const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },

    pin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: PIN_HEIGHT,
        width: PIN_WIDTH,
        marginLeft: -PIN_WIDTH / 2,
        marginTop: LIFT - 8,              // keeps tip of the pin on the exact center
        resizeMode: 'contain'
    },

    shadow: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: PIN_WIDTH * 0.5,
        height: PIN_WIDTH * 0.5,
        marginLeft: -(PIN_WIDTH * 0.5) / 2,
        backgroundColor: '#000',
        borderRadius: 50,
    },
    content: {
        flex: 0.2,
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -10
    },
    labelButton: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginRight: 16,
        marginTop: 8
    },
    back: {
        position: 'absolute',
        left: 20,
        top: 50,
        zIndex: 10,
        width: 50,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    myLocationBtn: {
        position: 'absolute',
        right: 16,
        bottom: 20,          // bottom‑right no matter the platform
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 24,
        elevation: 4,        // Android shadow
        shadowOpacity: 0.3,  // iOS shadow
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});
