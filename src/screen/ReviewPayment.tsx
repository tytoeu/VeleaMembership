import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Pressable, Animated, Modal, Linking } from 'react-native'
import ModalSheetBottom, { ModalSheetBottomRef } from '../components/ModalSheetBottom'
import { IItemInCart, IOrderMaster, ISummery } from '../hooks/interface/IMenu'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ToastMessage } from '../components/ToastMessage'
import { IMethodPayment } from '../hooks/interface/IItem'
import { ILocation } from '../hooks/interface/IAddress'
import { Loader, MyIconComponent } from '../components'
import useDeepLinking from '../hooks/useDeepLinking'
import topup_style from '../util/style/topup_style'
import { useRoute } from '@react-navigation/native'
import { Camera, CameraView } from 'expo-camera'
import useAnimation from '../hooks/useAnimation'
import { locationSeleted } from '../redux/temp'
import useLocation from '../hooks/useLocation'
import useAddress from '../hooks/useAddress'
import styles from '../util/style/Style'
import useOrder from '../hooks/useOrder'
import MapView from 'react-native-maps'
import useMenu from '../hooks/useMenu'
import { assets } from '../../assets'

const img = assets.img

const couponTypeData = [
    {
        id: 1,
        name: 'Coupon',
        type: 'Coupon',
        image: img.discount,
        des: 'Click to scan for Counpon discount'
    },
    {
        id: 2,
        name: 'Membership',
        type: 'Manual',
        image: img.discount,
        des: 'Click to scan for Membership'
    },
]

const PIN_HEIGHT = 40;
const PIN_WIDTH = 30;
const LIFT = -28;

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

interface IData {
    data: IItemInCart[],
    methodList: IMethodPayment[]
}

const AnimationTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const ReviewPayment = () => {
    const { theme, auth, locale } = useAppSelector(state => state.cache)
    const { addressSeleted } = useAppSelector((state) => state.temp)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()
    const router = useRoute()
    const { data, methodList } = router.params as IData
    const { fetchLocationInfiniteQuery } = useAddress();
    const { handlePay } = useDeepLinking()

    const {
        subTotal,
        summeryCartInfiniteQuery,
        grandTotal,
        discountAmount,
        scanVoucherMutation,
        culculateDiscount,
        voucherDiscount,
        placeOrderMutation
    } = useOrder(data)

    const {
        drop,
        isDragging,
        isAnimating,
        region,
        translateY,
        shadowOpac,
        shadowScale,
        setRegion,
        lift,
        mapRef
    } = useLocation()

    const {
        opacity,
        translate,
        scrollY,
        scrollOpacity,
        scrollTranslateY
    } = useAnimation()

    const { listCartInfiniteQuery } = useMenu();
    const summeryData = summeryCartInfiniteQuery.data?.data as ISummery
    const grandTotalPrice = grandTotal(summeryData)
    const location = fetchLocationInfiniteQuery.data as ILocation[]
    const modalRef = useRef<ModalSheetBottomRef>(null)
    const modalLocationRef = useRef<ModalSheetBottomRef>(null)
    const modalDiscountRef = useRef<ModalSheetBottomRef>(null)
    const [hasPermission, setHasPermission] = useState<boolean | null>();
    const [scanned, setScanned] = useState(false);
    const [isModalScan, setModalScan] = useState(false)
    const [isPeding, setPeding] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const color = theme.color
    const bgDark = theme.bgDark
    const borderColor = { borderWidth: 1, borderColor: '#ca6f1e' }
    const loading = summeryCartInfiniteQuery.isLoading ||
        fetchLocationInfiniteQuery.isLoading ||
        scanVoucherMutation.isPending ||
        placeOrderMutation.isPending

    const [state, setState] = React.useState({
        isPayment: 0,
        isPacket: 0,
        amount: '',
        couponType: ''
    })

    const payAction = async () => {
        // if (!summeryData.isopen) {
        //     return ToastMessage('Sorry! Currently our store not opened yet.')
        // }
        setPeding(true)

        const { type, data: paramQuery } = await handlePay()
        if (type === 'success' && paramQuery?.status === 'suuccess') {
            const subTotalPrice = subTotal().toFixed(2)
            const jsonData: IOrderMaster = {
                id: auth?.id || 0,
                sub_Total: Number(subTotalPrice),
                discountRate: voucherDiscount?.voucherOffer || 0,
                totalAfterDis: Number(subTotalPrice) - discountAmount,
                typeDis: voucherDiscount?.voucherType || '',
                taxRate: 0,
                taxValue: summeryData.tax,
                grandTotal: Number(grandTotalPrice.toFixed(2)),
                paymentMethod: methodList[state.isPayment].methodType,
                applyType: voucherDiscount?.voucherId ? state.couponType : null,
                voucherId: voucherDiscount?.voucherId || 0,
                membershipId: voucherDiscount?.memberShipId || 0,
                exchangeRate: 0,
                deliveryAddressId: addressSeleted?.addressId || 0,
                deliveryFee: summeryData.shipfee,
                deliveryType: "Delivery",
                payment_Token: "",
                branchId: 0,
                distance: summeryData.distance,
                orderDetailList: data
            }

            placeOrderMutation.mutateAsync(jsonData, {
                onSuccess: response => {
                    if (response?.status) {
                        // nav.navigate('pay-webview')
                        nav.navigate('order-success', { orderId: response?.orderId });
                        listCartInfiniteQuery.refetch()
                    } else {
                        ToastMessage(response?.message)
                    }
                    setPeding(false)
                },
                onError: () => setPeding(false)
            })
        } else if (type == 'dismiss') {
            ToastMessage('You payment not complete')
            setPeding(false)
        } else setPeding(false)
    }

    useEffect(() => {
        setRegion({
            ...region,
            latitude: addressSeleted?.latitude!,
            longitude: addressSeleted?.longitude!
        })
    }, [addressSeleted])

    const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    useEffect(() => {
        getCameraPermissions()
    }, []);

    // const handleBarcodeScanned = ({ type, data }: any) => {
    const handleBarcodeScanned = (data: string) => {
        setModalScan(false)
        scanVoucherMutation.mutateAsync({ voucherCode: data, applyType: state.couponType }, {
            onSuccess: (response) => {
                if (response?.message) {
                    culculateDiscount(null)
                    setErrorMessage(response?.message)
                } else if (response?.error) {
                    culculateDiscount(null)
                    setErrorMessage(response?.error)
                } else {
                    culculateDiscount(response[0])
                    setErrorMessage(null)
                }
            }
        })
    };

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000);
    }, [errorMessage])

    const MapViewControl = ({ current }: { current: boolean }) => {
        return (<>
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
                showsTraffic={true}
                showsUserLocation={true}
                showsMyLocationButton={false}
                zoomEnabled={false}
                zoomControlEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
                minZoomLevel={17}
            />

            {/* pin shadow */}
            <Animated.View
                pointerEvents="none"
                style={[
                    current ? _styles.shadow : _styles.shadow2,
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
                    current ? _styles.pin : _styles.pin2,
                    {
                        transform: [{ translateY }],
                    },
                ]}
            />
        </>)
    }

    const NotPermission = () => {
        return <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="camera-alt" size={50} color={'gray'} />
            <Text style={{ color: theme.colorText }}>Requesting for camera permission</Text>
            <Text style={{ color: theme.colorText }}>Permission {hasPermission ? 'granted' : 'denied'}</Text>
            <TouchableOpacity onPress={() => Linking.openSettings()}
                style={{ marginTop: 20, padding: 10, backgroundColor: theme.bgDark, borderRadius: 5 }}>
                <Text style={{ color: theme.color }}>Try Again</Text>
            </TouchableOpacity>
        </View>
    }

    const CouponScanner = () => {
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <View style={styles.cameraContainer}>
                    <CameraView
                        // onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr", "code128", "aztec", "codabar", "code39", "code93", "datamatrix", "ean13", "ean8", "itf14", "pdf417", "upc_a", "upc_e", "codabar"],
                        }}
                        style={StyleSheet.absoluteFillObject}
                        facing='back'
                    />
                    {scanned && <TouchableOpacity style={styles.tab_scan} onPress={() => setScanned(false)}>
                        <Text style={styles.tab_text}>Tab to Scan</Text>
                    </TouchableOpacity>}
                </View>

                <View style={[styles.topOverlay, { height: '30%' }]} >
                    {/* <Text style={styles.scan_title}>Scan QR or Barcode</Text> */}
                </View>
                <View style={[styles.bottomOverlay, { height: '40%' }]} />
                <View style={[styles.leftOverlay, { height: '30%', bottom: '40%', width: '5%' }]} />
                <View style={[styles.rightOverlay, { height: '30%', bottom: '40%', width: '5%' }]} />

            </View>
        )
    }

    const animatedStyle = { opacity, transform: [{ translateY: translate }] }

    return (
        <View className='flex-1 dark:bg-black'>
            <Animated.ScrollView className='p-4' onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}>
                <Animated.View className='bg-white dark:bg-white/10 h-32 mb-5 flex-row rounded-lg self-center items-center p-8' style={{ width: '100%', opacity: scrollOpacity, transform: [{ translateY: scrollTranslateY }] }}>
                    <View style={{ width: 80, height: 80 }}>
                        <Image
                            source={img.deliveryMan}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </View>
                    <View className='ml-5'>
                        <Text className='color-slate-500 dark:color-slate-100 font-semibold'>Delivery Time</Text>
                        <Text className='color-slate-950 dark:color-slate-50 text-sm font-bold mt-2'>{summeryData?.timeDelivery}</Text>
                    </View>
                </Animated.View>

                <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Address</Text>
                <Pressable onPress={() => modalLocationRef.current?.present()}
                    style={[topup_style.payment, { backgroundColor: bgDark, flexDirection: 'row', marginHorizontal: 0, marginBottom: 16, width: '100%', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'row', width: '95%', alignItems: 'center' }}>
                        <View style={{ height: 60, width: 60, marginRight: 8 }}>
                            {/* MapView */}
                            <MapViewControl current={false} />
                        </View>
                        <View className='ml-3'>
                            <Text style={{ color, fontWeight: 'bold' }}>{addressSeleted?.labelName}</Text>
                            <Text numberOfLines={1} style={[{ color, fontSize: 12, marginTop: 5 }]}>{addressSeleted?.address1}</Text>
                        </View>
                    </View>
                    <Ionicons name='chevron-forward-outline' color={theme.colorText} size={24} />
                </Pressable>

                <Animated.Text className='text-lg font-bold dark:color-slate-50 color-slate-900' style={animatedStyle}>Summary Cart</Animated.Text>
                <Animated.View className='mt-2 mb-4 bg-white dark:bg-white/10 p-4 rounded-lg' style={animatedStyle}>
                    {data.map((item, index) => (
                        <View key={index} className='flex-row justify-between items-center mb-2'>
                            <Text className='color-slate-700 dark:color-slate-300'>{locale == 'en' ? item.itemNameEn : item.itemNameKh} ({item.qty} x ${item.priceAfterDis})</Text>
                            <Text className='color-slate-800 dark:color-slate-100 font-medium'>${item.total}</Text>
                        </View>))}
                </Animated.View>

                <Animated.Text className='text-lg font-bold dark:color-slate-50 color-slate-900' style={animatedStyle}>Summary</Animated.Text>
                <Animated.View className='mt-2 mb-4 bg-white dark:bg-white/10 p-4 rounded-lg' style={animatedStyle}>
                    <View className='flex-row justify-between items-center'>
                        <Text className='color-slate-700 dark:color-slate-300'>Sub Total</Text>
                        <Text className='color-slate-800 dark:color-slate-100 font-medium'>${subTotal().toFixed(2)}</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-700 dark:color-slate-300'>Delivery Fee</Text>
                        <Text className='color-slate-800 dark:color-slate-100 font-medium'>+${summeryData?.shipfee}</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-700 dark:color-slate-300'>Tax</Text>
                        <Text className='color-slate-800 dark:color-slate-100 font-medium'>+${summeryData?.tax}</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-700 dark:color-slate-300'>Discount</Text>
                        <Text className='font-medium' style={{ color: '#b91c1c' }}>-${discountAmount?.toFixed(2)}</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-700 dark:color-slate-300'>Grand Total</Text>
                        <Text className='color-slate-800 dark:color-slate-100 font-medium'>${grandTotalPrice?.toFixed(2)}</Text>
                    </View>
                </Animated.View>

                <Animated.View
                    style={[topup_style.payment, { backgroundColor: bgDark, flexDirection: 'row', marginHorizontal: 0, marginBottom: 5, width: '100%', alignItems: 'center' }, animatedStyle]}>
                    <View style={{ flexDirection: 'row', width: '85%', alignItems: 'center' }}>
                        <View style={{ height: 40, width: 40, marginRight: 8 }}>
                            <Image
                                source={img.discount}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </View>
                        <View className='ml-3'>
                            {voucherDiscount ? <View>
                                <Text style={{ color: theme.main, fontWeight: 'bold', fontSize: 16 }}>{voucherDiscount.voucherOffer} {voucherDiscount.voucherType}</Text>
                                <Text className='color-slate-500 dark:color-slate-300 text-[10px] font-bold'>{voucherDiscount.applyType}</Text>
                            </View> :
                                <Text style={{ color, fontWeight: 'bold' }}>Counpon</Text>}
                        </View>
                    </View>
                    {voucherDiscount ?
                        <TouchableOpacity className='flex-row items-center' onPress={() => culculateDiscount(null)}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Remove</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity className='flex-row items-center' onPress={() => modalDiscountRef.current?.present()}>
                            <Text style={{ color: theme.main, fontWeight: 'bold' }}>Apply</Text>
                            <Ionicons name='chevron-forward-outline' color={theme.colorText} size={24} />
                        </TouchableOpacity>}
                </Animated.View>
                {errorMessage && <Text style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</Text>}

                <Animated.Text className='text-lg font-bold dark:color-slate-50 color-slate-900 mt-4' style={animatedStyle}>Payment Method</Animated.Text>
                <AnimationTouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => modalRef.current?.present()}
                    style={[topup_style.payment, { backgroundColor: bgDark, flexDirection: 'row', paddingVertical: 16, marginHorizontal: 0, width: '100%', justifyContent: 'space-between', alignItems: 'center' }, animatedStyle]}>
                    <View style={{ flexDirection: 'row' }}>
                        {methodList[state.isPayment].icon && <Image source={{ uri: methodList[state.isPayment].icon }} style={{ width: 60, height: 40, marginRight: 15, borderRadius: 3 }} />}
                        <View>
                            <Text style={{ color, fontWeight: 'bold' }}>{methodList[state.isPayment].name}</Text>
                            {methodList[state.isPayment].io && <Image source={{ uri: methodList[state.isPayment].io }} style={{ width: 100, height: 10, borderRadius: 3, marginTop: 5 }} />}
                            {methodList[state.isPayment].sub && <Text style={[{ color, fontSize: 12, marginTop: 5 }]}>{methodList[state.isPayment].sub}</Text>}
                        </View>
                    </View>
                    <Ionicons name='chevron-forward-outline' color={theme.colorText} size={24} />
                </AnimationTouchableOpacity>

                <View style={{ height: 20 }} />
            </Animated.ScrollView>

            <View style={{ height: 80, backgroundColor: theme.background }}>
                <TouchableOpacity
                    onPress={payAction}
                    disabled={loading}
                    className='bg-orange-800 absolute w-[27.5rem] self-center bottom-0 h-14 items-center justify-center rounded-xl'>
                    {loading || isPeding ?
                        <Loader barColor='#FFF' /> :
                        <Text className='font-bold text-lg color-slate-50'>Place Order</Text>}
                </TouchableOpacity>
            </View>

            <ModalSheetBottom
                snapPoint={['50%']}
                ref={modalRef}
            >
                <View className='p-4 dark:bg-black'>
                    <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Payment Method</Text>
                    <FlatList
                        data={methodList}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 20, alignItems: 'center' }}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => setState({ ...state, isPayment: index })}
                                key={index} style={[topup_style.payment, { backgroundColor: bgDark }, state.isPayment == index && borderColor, shadow]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: item.icon }} style={{ width: 60, height: 40, marginRight: 15, borderRadius: 3 }} />
                                    <View>
                                        <Text style={[{ color, fontWeight: 'bold' }]}>{item.name}</Text>
                                        {item.io && <Image source={{ uri: item.io }} style={{ width: 100, height: 10, borderRadius: 3, marginTop: 5 }} />}
                                        {item.sub && <Text style={[{ color, fontSize: 12, marginTop: 5 }]}>{item.sub}</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{ height: 30 }} />
                </View>
            </ModalSheetBottom>

            <ModalSheetBottom
                snapPoint={['50%']}
                ref={modalLocationRef}
            >
                <View className='p-4'>
                    <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Where you want to place order</Text>
                    <View className='rounded-lg mt-4 bg-white dark:bg-white/10' style={[shadow, { height: 175, padding: 10 }]}>
                        {/* Map view */}
                        <MapViewControl current={true} />
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
                                    modalLocationRef.current?.close()
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
                    <View style={{ height: 50 }} />
                </View>
            </ModalSheetBottom>

            <ModalSheetBottom
                snapPoint={['50%']}
                ref={modalDiscountRef}
            >
                <View className='p-4 dark:bg-black'>
                    <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Option Type</Text>
                    <FlatList
                        data={couponTypeData}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 20, alignItems: 'center' }}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setState({ ...state, couponType: item.type })
                                    modalDiscountRef.current?.close()
                                    // setTimeout(() => {
                                    //     setModalScan(true)
                                    // }, 2000)
                                    handleBarcodeScanned('rrhQl3BL')
                                }}
                                key={index} style={[topup_style.payment, { backgroundColor: bgDark }, shadow]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.image} style={{ width: 60, height: 40, marginRight: 15, borderRadius: 3 }} />
                                    <View>
                                        <Text style={[{ color, fontWeight: 'bold' }]}>{item.name}</Text>
                                        {item.des && <Text style={[{ color, fontSize: 12, marginTop: 5 }]}>{item.des}</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{ height: 30 }} />
                </View>
            </ModalSheetBottom>

            <Modal
                visible={isModalScan}
                animationType='fade'
                statusBarTranslucent
                backdropColor={theme.background}
                onRequestClose={() => setModalScan(false)}
            >
                {hasPermission ? <CouponScanner /> : <NotPermission />}
            </Modal>
        </View>
    )
}

export default ReviewPayment
const _styles = StyleSheet.create({

    pin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: PIN_HEIGHT,
        width: PIN_WIDTH,
        marginLeft: -PIN_WIDTH / 6,
        marginTop: LIFT - 1,              // keeps tip of the pin on the exact center
        resizeMode: 'contain'
    },

    pin2: {
        position: 'absolute',
        top: '40%',
        left: '33%',
        height: PIN_HEIGHT,
        width: PIN_WIDTH,
        marginLeft: -PIN_WIDTH / 6,
        marginTop: LIFT - 1,              // keeps tip of the pin on the exact center
        resizeMode: 'contain'
    },

    shadow: {
        position: 'absolute',
        top: '51.5%',
        left: '51.5%',
        width: PIN_WIDTH * 0.5,
        height: PIN_WIDTH * 0.5,
        marginLeft: -(PIN_WIDTH * 0.5) / 6,
        backgroundColor: '#000',
        borderRadius: 50,
    },
    shadow2: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        width: PIN_WIDTH * 0.5,
        height: PIN_WIDTH * 0.5,
        marginLeft: -(PIN_WIDTH * 0.5) / 6,
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