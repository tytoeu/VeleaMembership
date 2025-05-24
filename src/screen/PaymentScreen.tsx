import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import { payment_style } from '../util/style/PaymenStyle'
import { setIncorrectCodeAction } from '../redux/cache'
import { Ionicons } from '@expo/vector-icons'
import { formCurrency } from '../helpers'
import React, { useState } from 'react'
import { DailPad } from '../components'
import { assets } from '../../assets'
import i18n from '../localization'
import pay_style from '../util/style/pay_style'

const WIDTH = Dimensions.get('screen').width
const delPaid = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'del'];
const dailPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'del']
const PIN_LENGTH = 4
const PIN_CONTAINER_SIZE = WIDTH / 2
const PIN_MAX_SIZE = PIN_CONTAINER_SIZE / PIN_LENGTH
const _PIN_SPACING = 10
const PIN_SIZE = PIN_MAX_SIZE - _PIN_SPACING * 2
const _SPACING = 20
const WIDTH_BACK = WIDTH * 0.1

const DAIL_PAD_SIZE = WIDTH * 0.2
const BALANCE = '18700.00'

const pinString = "1234";

const PaymentScreen = () => {
    const { theme, incorrectCode, currentTheme } = useAppSelector(state => state.cache)
    const dispatch = useAppDispatch()
    const nav = useAppNavigation()
    const X = useSharedValue(0)
    const Y = useSharedValue(0)
    const [toggled, setToggled] = useState(false)
    const [show, setShow] = useState(false)
    const [code, setCode] = useState<number[]>([])
    const [values, setValue] = useState<string[]>([])
    const [balanceInput, setBalanceInput] = useState<number>(0)
    const [isPending, isSetPending] = useState(false)
    const [isEnougth, setEnougth] = useState(false)
    const handlComplete = (isToggled: boolean) => {
        if (isToggled !== toggled) {
            setToggled(isToggled)
        }

        setTimeout(() => {
            setShow(true)
        }, 100);
    }

    const closeCodeModal = () => {
        setShow(false)
        setToggled(false)
        X.value = 0
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

    const onPaidNumber = (item: number | string) => {
        if (item === 'del') {
            setValue(value => value.slice(0, value.length - 1))
            setEnougth(false)
            return
        }

        if (item === '.' && values.includes('.')) return;

        if (item === '.' && values.length === 0) {
            setValue(preValue => [...preValue, '0', '.']);
            return;
        }

        const currentValue = ([...values, item.toString()].join(""))

        if (currentValue.includes('.')) {
            const [, decimalPart] = currentValue.split('.');
            if (decimalPart.length > 2) return;
        }

        if (parseFloat(BALANCE) >= parseFloat(currentValue)) {
            let formattedValue = currentValue.replace(/^0+(\d)/, '$1')
            setValue(formattedValue.split(''))
            setBalanceInput(parseFloat(formattedValue))
        } else {
            setEnougth(true)
        }
    }

    const onTouchCode = () => {
        return (<>
            <TouchableOpacity
                onPress={closeCodeModal}
                style={{
                    position: 'absolute',
                    top: _SPACING * 1.5,
                    left: _SPACING,
                    paddingHorizontal: WIDTH_BACK * 0.4,
                    height: WIDTH_BACK * 0.8,
                    borderRadius: WIDTH_BACK * 0.1,
                    backgroundColor: theme.bgDark,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{
                    color: theme.color,
                    fontSize: 16,
                    fontFamily: 'R700'
                }}>Back</Text>
            </TouchableOpacity>
            <View
                style={{
                    width: DAIL_PAD_SIZE,
                    height: DAIL_PAD_SIZE,
                    borderRadius: DAIL_PAD_SIZE,
                    backgroundColor: theme.bgDark,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: _PIN_SPACING
                }}
            >
                <Ionicons name='lock-closed-outline' color={theme.color} size={24} />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: _SPACING * 0.3,
                    }}
                >
                    {[...Array(4).keys()].map(i => (<Text key={i}
                        style={{ color: theme.color, marginHorizontal: _SPACING * 0.1, fontSize: 16 }}
                    >*</Text>))}
                </View>
            </View>
            <Text style={{
                fontSize: 16,
                fontFamily: 'R700',
                color: theme.color
            }}>Please Enter code for comfirm</Text>

            {incorrectCode !== 0 &&
                <Text style={{ color: 'red', fontSize: 12, marginTop: 3 }} >incorrect ({incorrectCode} time)</Text>}

            <View
                style={{
                    flexDirection: 'row',
                    gap: _PIN_SPACING / 2 * 2,
                    marginBottom: _SPACING * 1.3,
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

            <DailPad
                data={dailPad}
                onPress={(item) => {
                    if (item === 'del') {
                        setCode(preCode => preCode.slice(0, preCode.length - 1))
                    } else if (typeof item === 'number') {

                        if (incorrectCode === 3) {
                            Alert.alert('Warning !', 'Your incorrect 3 time yet. Can not continue, Please contact to our supporter.')
                            dispatch(setIncorrectCodeAction(0))
                            return
                        }

                        const isMatch = [...code, item].join("").trim() == pinString

                        if (code.length == PIN_LENGTH) return
                        setCode(pre => [...pre, item])

                        if (isMatch) {
                            dispatch(setIncorrectCodeAction(0))
                            isSetPending(true)
                            setTimeout(() => {
                                nav.navigate('pay-success')
                            }, 1000)
                        } else if (!isMatch && code.length == PIN_LENGTH - 1) {
                            setTimeout(() => {
                                alert('Incorrect your password')
                                const increase = incorrectCode + 1
                                dispatch(setIncorrectCodeAction(increase))
                                setCode([])
                            }, 500)
                        }
                    } else if (item === 'C') { setCode([]) }
                }} />
        </>)
    }

    const progressing = () => {
        return (<View>
            <Text style={{ color: theme.color }}>Loading...!</Text>
        </View>)
    }

    const currentBalance = () => {
        return (<View
            style={[pay_style.balance_container]}>
            <Text style={[pay_style.text_balance]}>Your current balance: {BALANCE}</Text>
        </View>)
    }

    return (
        <View style={[payment_style.container, { backgroundColor: theme.background }]}>
            <View style={[pay_style.contain_image, { backgroundColor: theme.bgDark }]}>
                <Image
                    source={assets.logo.login}
                    style={pay_style.image}
                />
            </View>

            <Text style={[pay_style.title, { color: theme.color }]}>VELEA Gastropub</Text>

            <View style={[pay_style.pay_content]}>
                <Text style={[pay_style.pay_text, { color: theme.color }]}>{values.length ? formCurrency(values.join("")) : '0'} </Text>
                <Text style={[pay_style.pay_value]}>{i18n.t('USD')}</Text>
            </View>

            {/* <AnimatePresence> */}
            {isEnougth && currentBalance()}
            {/* </AnimatePresence> */}

            <View style={{ flex: 0.95, marginTop: 18 }}>
                <DailPad onPress={(item) => onPaidNumber(item)} data={delPaid} />
            </View>

            <View style={[pay_style.swip_content, { backgroundColor: balanceInput ? theme.bgDark : currentTheme == 'dark' ? 'gray' : '#ccc' }]}>
                <PanGestureHandler onGestureEvent={onGestureEvent} enabled={balanceInput ? true : false}>
                    <Animated.View style={[pay_style.swipe_icon, animatedStyle.swipeStyle, { backgroundColor: theme.rgba, }]}>
                        <Ionicons name='chevron-forward-outline' size={24} color={theme.color} />
                    </Animated.View>
                </PanGestureHandler>
                <Animated.Text style={[pay_style.swipe_text, animatedStyle.swipTextStyle, { color: theme.color }]}>Swipe to pay</Animated.Text>
            </View>
            <GestureHandlerRootView style={pay_style.modal_container}>
                <Modal
                    animationType="slide"
                    visible={show}
                    onRequestClose={closeCodeModal}
                    transparent={false}>
                    <View style={[pay_style.modal, { backgroundColor: theme.background }]}>

                        {isPending ? progressing() : onTouchCode()}

                    </View>
                </Modal>
            </GestureHandlerRootView>
        </View>
    )
}

export default PaymentScreen

