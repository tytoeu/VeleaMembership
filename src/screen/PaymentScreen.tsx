import { payment_style } from '../util/style/PaymenStyle'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks'
import React, { useState } from 'react'
import { assets } from '../../assets'
import { Ionicons } from '@expo/vector-icons'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const delPaid = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'del'];

const PaymentScreen = () => {
    const { theme } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()
    const X = useSharedValue(0)
    const [toggled, setToggled] = useState(false)
    const handlComplete = (isToggled: boolean) => {
        if (isToggled !== toggled) {
            setToggled(isToggled)
        }
        nav.goBack()
        setTimeout(() => {
            alert('Pay successfully.')
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