import { payment_style } from '../util/style/PaymenStyle'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks'
import React, { useState } from 'react'
import { assets } from '../../assets'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { DailPad } from '../components'

const WIDTH = Dimensions.get('screen').width
const delPaid = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'del'];
const PIN_LENGTH = 4
const PIN_CONTAINER_SIZE = WIDTH / 2
const PIN_MAX_SIZE = PIN_CONTAINER_SIZE / PIN_LENGTH
const _PIN_SPACING = 10
const PIN_SIZE = PIN_MAX_SIZE - _PIN_SPACING * 2
const _SPACING = 20

const pinString = "1234";

const PaymentScreen = () => {
    const { theme } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()
    const X = useSharedValue(0)
    const [toggled, setToggled] = useState(false)
    const [show, setShow] = useState(false)
    const [code, setCode] = useState<number[]>([])
    const handlComplete = (isToggled: boolean) => {
        if (isToggled !== toggled) {
            setToggled(isToggled)
        }

        setTimeout(() => {
            setShow(true)
        }, 500);
    }

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.completed = toggled
        },
        onActive: (e, ctx) => {
            let newValue;
            if (ctx.completed) {
                newValue = 250 + e.translationX
            } else {
                newValue = e.translationX
            }

            if (newValue >= 0 && newValue <= 280) {
                X.value = newValue
            }
        },
        onEnd: () => {
            if (X.value < 200) {
                X.value = withSpring(0)
            }
            else {
                X.value = withSpring(280)
                runOnJS(handlComplete)(true)
            }
        }
    })

    const animatedStyle = {
        swipeStyle: useAnimatedStyle(() => {
            return {
                transform: [{ translateX: X.value }]
            }
        }),
        swipTextStyle: useAnimatedStyle(() => {
            return {
                opacity: interpolate(X.value, [0, 150], [1, 0], Extrapolation.CLAMP),
                transform: [{ translateX: interpolate(X.value, [0, 150], [0, 100]) }]
            }
        })
    }

    return (
        <View style={[payment_style.container, { backgroundColor: theme.background }]}>
            <View style={[pay_style.card, { backgroundColor: theme.bgDark }]}>
                <Image
                    source={assets.logo.login}
                    style={pay_style.image}
                />
                <View style={{ marginLeft: 12 }}>
                    <Text style={[pay_style.wallet_ballance, { color: theme.color }]}>Wallet Ballance</Text>
                    <Text style={[pay_style.balance_value, { color: theme.color }]}>$18,700.00</Text>
                </View>
            </View>
            <View style={pay_style.pay_content}>
                <Text style={[pay_style.pay_text, { color: theme.color }]}>$ 580.00</Text>
                <Text style={[pay_style.pay_value, { color: theme.color }]}>Your ballance: $18,700.00 </Text>
            </View>

            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={delPaid}
                    renderItem={({ item, index }) => {
                        return (<TouchableOpacity style={{
                            width: 90,
                            height: 50,
                            backgroundColor: theme.bgDark,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3
                        }}>
                            <Text style={{
                                fontSize: 24,
                                fontFamily: 'R900',
                                color: theme.color
                            }}>{item}</Text>
                        </TouchableOpacity>)
                    }}
                    key={3}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-around', gap: 40, marginBottom: 40, marginHorizontal: 5 }}
                    contentContainerStyle={{ width: '90%', marginTop: 70 }}
                    scrollEnabled={false}
                />
            </View>

            <View style={[pay_style.swip_content, { backgroundColor: theme.bgDark }]}>
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View style={[{
                        width: 50,
                        height: 50,
                        backgroundColor: theme.bgDark,
                        borderRadius: 50,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 1
                    }, animatedStyle.swipeStyle]}>
                        <Ionicons name='chevron-forward-outline' size={24} color={theme.color} />
                    </Animated.View>
                </PanGestureHandler>
                <Animated.Text style={[{
                    position: 'absolute',
                    alignSelf: 'center',
                    textTransform: 'uppercase',
                    fontFamily: 'R700',
                    color: theme.color
                }, animatedStyle.swipTextStyle]}>Swipe to pay</Animated.Text>
            </View>

            <GestureHandlerRootView style={{ position: 'absolute' }}>
                <Modal
                    animationType="fade"
                    visible={show}
                    onRequestClose={() => setShow(false)}
                    transparent={false}>
                    <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: "center" }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: _PIN_SPACING / 2 * 2,
                                marginBottom: _SPACING * 2,
                                height: PIN_SIZE * 2,
                                alignItems: 'flex-end'
                            }}
                        >
                            {[...Array(PIN_LENGTH).keys()].map(i => {
                                const isSelected = code[i] !== undefined
                                return (<View
                                    key={i}
                                    style={{
                                        width: PIN_SIZE,
                                        height: isSelected ? PIN_SIZE : 2,
                                        borderRadius: PIN_SIZE,
                                        backgroundColor: theme.colorText
                                    }}
                                />)
                            })}
                        </View>
                        <DailPad onPress={(item) => {
                            if (item === 'del') {
                                setCode(preCode => preCode.slice(0, preCode.length - 1))
                            } else if (typeof item === 'number') {
                                const isMatch = [...code, item].join("").trim() == pinString

                                if (code.length == PIN_LENGTH) return
                                setCode(pre => [...pre, item])

                                if (isMatch) {
                                    alert('Pay success')
                                } else if (!isMatch && code.length == PIN_LENGTH - 1) {
                                    alert('Incorrect your password')
                                }
                            }
                        }} />
                    </View>
                </Modal>
            </GestureHandlerRootView>
        </View>
    )
}

export default PaymentScreen

const pay_style = StyleSheet.create({
    card: {
        width: '90%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginHorizontal: 16
    },
    wallet_ballance: {
        fontFamily: 'R500',
        fontSize: 16,
        lineHeight: 25
    },
    balance_value: {
        fontSize: 18,
        fontFamily: 'R900'
    },
    pay_content: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    pay_text: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'R700',
        opacity: 0.9
    },
    pay_value: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'R500',
        opacity: 0.6
    },
    swip_content: {
        backgroundColor: '#fff',
        width: '85%',
        height: 60,
        justifyContent: 'center',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        position: 'relative'
    }
})