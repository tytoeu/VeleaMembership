import Animated, { Easing, FadeInDown } from 'react-native-reanimated'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { ITeamOrder } from '../hooks/interface/IItem'
import { useRoute } from '@react-navigation/native'
import StepIndicator from 'react-native-step-indicator';
import { assets } from '../../assets'
import { useAppNavigation, useAppSelector } from '../hooks'
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const img = assets.img

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
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

interface IProp {
    orderItem: ITeamOrder
}

const ReportOrder = () => {
    const router = useRoute();
    const { orderItem } = router.params as IProp
    const { theme, locale } = useAppSelector(state => state.cache)
    const borderBottom = { borderBottomWidth: 1, borderBottomColor: theme.border }
    const nav = useAppNavigation()

    const labels = orderItem.statusText?.split(',').map(status => status.trim()) || [];

    const viewRef = useRef(null);

    const handleSave = async () => {
        try {
            // Ask permission to access media
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Cannot save image without permission.');
                return;
            }

            // Capture view as image
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
            });

            // Save to device gallery
            await MediaLibrary.saveToLibraryAsync(uri);
            Alert.alert('Saved', 'Order saved to gallery!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save the image.');
        }
    };

    return (
        <View className='flex-1 dark:bg-black'>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.duration(800).delay(50).easing(Easing.ease)} className='px-4 bg-white dark:bg-black'>
                    <Animated.Text entering={FadeInDown.duration(800).delay(100).easing(Easing.ease)} className='text-lg font-bold dark:color-slate-50 color-slate-900 mt-3'>Items Order</Animated.Text>
                    <Animated.View entering={FadeInDown.duration(800).delay(100).easing(Easing.ease)} className='my-5 rounded-lg'>
                        {orderItem.itemDetail.map((item, index) => {
                            const image = item?.package == 1 ? `${assets.config.prxxy}${assets.config.imagePath}item-package/${item.image}` : `${assets.config.prxxy}${assets.config.imagePath}item/${item.image}`
                            return (
                                <View key={index} className='flex-row mb-4  rounded items-center '>
                                    <View className=' dark:bg-white/10 bg-black/10 ml-2 rounded justify-center items-center' style={{ width: 65, height: 65 }}>
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: '90%', height: '90%', objectFit: 'contain', borderRadius: 8, overflow: 'hidden' }}
                                        />
                                    </View>
                                    <View className='ml-5 flex-col justify-between'>
                                        <Text className='dark:color-white font-bold' numberOfLines={1}>{locale == 'en' ? item.itemNameEn : item.itemNameKh}</Text>
                                        <View className='flex-row items-center justify-between' style={{ width: '90%' }}>
                                            <View className='flex-row items-center'>
                                                <Text className='font-bold color-orange-600'>{item.priceAfterDiscount}$</Text>
                                                {/* <Text className='font-bold color-slate-500 text-sm ml-3 line-through'>{item.total}$</Text> */}
                                            </View>
                                            <View className='justify-center items-center' style={{ width: 20, height: 20, marginRight: 16, marginVertical: 3, borderRadius: 50, backgroundColor: '#fb923c', overflow: 'hidden' }}>
                                                <Text className='color-orange-800 font-bold text-sm'>{item.qty}</Text>
                                            </View>
                                        </View>
                                        <Text className='dark:color-white text-sm mb-3 font-semibold'>{item.additionalName !== " " ? item.additionalName : 'No description'}</Text>
                                    </View>
                                </View>)
                        })}
                    </Animated.View>

                    <View className='my-5'>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={orderItem.statusNumber}
                            labels={labels}
                            stepCount={labels.length}
                        />
                    </View>

                    <Pressable onPress={() => nav.navigate('map-tracking')}>
                        <Animated.View className='h-32 my-5 flex-row rounded-lg self-center items-center p-8' style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: theme.brInput }}>
                            <View style={{ width: 80, height: 80 }}>
                                <Image
                                    source={img.deliveryMan}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </View>
                            <View className='ml-5'>
                                <Text className='color-slate-500 dark:color-slate-100 font-semibold'>Delivery Time</Text>
                                <Text className='color-slate-950 dark:color-slate-50 text-sm font-bold mt-2'>{orderItem.orderStatus} - {orderItem.orderDate}</Text>
                            </View>
                        </Animated.View>
                    </Pressable>

                    <View ref={viewRef} collapsable={false}>
                        <Animated.Text entering={FadeInDown.duration(800).delay(150).easing(Easing.ease)} className='text-lg font-bold dark:color-slate-50 color-slate-900 mt-5'>Summary</Animated.Text>
                        <Animated.View entering={FadeInDown.duration(800).delay(150).easing(Easing.ease)} className='mt-2 p-4 rounded-lg' style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: theme.brInput }}>
                            <View className='flex-row justify-between items-center'>
                                <Text className='color-slate-700 dark:color-slate-300'>ORDER ID</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>{orderItem.orderNo}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mt-2'>
                                <Text className='color-slate-700 dark:color-slate-300'>Payment Status</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-bold' style={{ color: orderItem.payStatus === 'Paid' ? 'green' : 'red' }}>{orderItem.payStatus}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mt-2'>
                                <Text className='color-slate-700 dark:color-slate-300'>Delivery Type</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>{orderItem.deliveryType}</Text>
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.duration(800).delay(150).easing(Easing.ease)} className='mb-4 pt-3 px-4 rounded-lg' style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: theme.brInput }}>
                            <View className='flex-row justify-between items-center'>
                                <Text className='color-slate-700 dark:color-slate-300'>Sub Total</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>${orderItem.subTotal}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mt-2'>
                                <Text className='color-slate-700 dark:color-slate-300'>Delivery Fee</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>+${orderItem.deliveryFee}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mt-2'>
                                <Text className='color-slate-700 dark:color-slate-300'>Tax</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>+${orderItem.taxRate}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mt-2'>
                                <Text className='color-slate-700 dark:color-slate-300'>Discount ({orderItem.applyType})</Text>
                                <Text className='font-medium' style={{ color: '#b91c1c' }}>-${orderItem.discount}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mt-2 mb-4'>
                                <Text className='color-slate-700 dark:color-slate-300'>Grand Total</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>${orderItem.grandTotal}</Text>
                            </View>
                        </Animated.View>

                        <Animated.Text entering={FadeInDown.duration(800).delay(150).easing(Easing.ease)} className='text-lg font-bold dark:color-slate-50 color-slate-900'>Contact Information</Animated.Text>
                        <Animated.View entering={FadeInDown.duration(800).delay(150).easing(Easing.ease)} className='mt-2 mb-4 p-4 rounded-lg'>
                            <View className='flex-row justify-between items-center mb-5'>
                                <Text className='color-slate-700 dark:color-slate-300'>Name</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium uppercase'> {orderItem.deliveryName}</Text>
                            </View>
                            <View className='flex-row justify-between items-center mb-5'>
                                <Text className='color-slate-700 dark:color-slate-300'>Phone Number</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>{orderItem.phoneNumber}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='color-slate-700 dark:color-slate-300'>Delivery to</Text>
                                <Text className='color-slate-800 dark:color-slate-100 font-medium'>{orderItem.shipAddress}</Text>
                            </View>
                        </Animated.View>
                    </View>

                </Animated.View>
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.8}
                className='bg-orange-700 py-3 rounded-lg justify-center bottom-0 items-center mx-4'
                onPress={() => nav.navigate('Home')}
            >
                <Text className='color-white font-bold'>Go Home</Text>
            </TouchableOpacity>
        </View>

    )
}

export default ReportOrder