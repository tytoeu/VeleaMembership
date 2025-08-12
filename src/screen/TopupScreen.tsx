import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView, TextInput, Image, Alert } from 'react-native'
import React, { useRef } from 'react'
import { useAppSelector } from '../hooks'
import topup_style from '../util/style/topup_style'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const data = Array.from({ length: 12 }, (_, i) => ({ id: i, name: `${i + 1} $` }))
const borderColor = { borderWidth: 1, borderColor: '#ca6f1e' }
const dataPayment = [
    {
        id: 1,
        name: 'ABA KHQR',
        icon: require('../../assets/cards/aba_qr.png'),
        io: '',
        sub: 'Scan To Pay With Any Banking App'
    },
    {
        id: 2,
        name: 'Credit Card',
        icon: require('../../assets/cards/aba_card_credit.png'),
        io: require('../../assets/cards/all_payment_cards.png'),
        sub: ''
    },
    {
        id: 3,
        name: 'Wing Bank',
        icon: require('../../assets/cards/wing.jpg'),
        io: '', sub: 'Pay Securely With Wing Bank'
    }
]

const TopupScreen = () => {
    const { theme } = useAppSelector(state => state.cache)
    const color = theme.color
    const background = theme.background
    const bgDark = theme.bgDark

    const inputRef = useRef<TextInput>(null);

    const [state, setState] = React.useState({
        isPayment: 0,
        isPacket: 0,
        amount: ''
    })

    const onChangeTextAction = (text: string) => {
        // Remove any non-numeric and non-dot characters
        let formattedText = text.replace(/[^0-9.]/g, '');

        // Split into parts to separate integer and decimal
        const parts = formattedText.split('.');

        if (parts.length > 2) return; // More than one dot is not allowed

        // Remove leading zeros from the integer part
        parts[0] = parts[0].replace(/^0+(?=\d)/, '');

        // Limit decimal part to 2 digits
        if (parts[1]?.length > 2) {
            parts[1] = parts[1].substring(0, 2);
        }

        // Rebuild the formatted text
        formattedText = parts.join('.');

        // If starts with dot (e.g., ".5"), prefix with "0"
        if (formattedText.startsWith('.')) {
            formattedText = '0' + formattedText;
        }

        setState({ ...state, amount: formattedText });
    }

    const isAmountLow = (Number(state.amount) < 10) && state.amount != '';

    const inputStyle = [
        topup_style.input_text,
        {
            backgroundColor: bgDark,
            color,
            borderColor: isAmountLow ? 'red' : 'transparent',
            borderWidth: 1,
            marginBottom: 0,
            marginTop: 20
        }
    ];

    const TopupAction = () => {
        if (state.amount == '' && state.isPacket == -1) {
            Alert.alert('Warning!', 'Please enter amount!')
            return
        }
        if (isAmountLow) {
            Alert.alert('Warning!', 'Minimum amount is $10!')
            return
        }

        if (state.isPayment == -1) {
            Alert.alert('Warning!', 'Please select payment method!')
            return
        }

        const jsonData = {
            amount: data[state.isPacket]?.name ?? state.amount,
            payment: dataPayment[state.isPayment].name
        }
    }

    const isComingSoon = false
    if (isComingSoon) {
        return (<View style={[topup_style.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
            <Text style={{ color: theme.color, backgroundColor: theme.bgDark, padding: 20, borderRadius: 5, overflow: 'hidden', fontFamily: 'R700' }}>Coming Soon</Text>
        </View>)
    }

    return (
        <View style={[topup_style.container, { backgroundColor: theme.background }]}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ width: WIDTH }}>

                <Text style={[topup_style.text, { color }]}>Packet</Text>
                <TextInput
                    ref={inputRef}
                    style={[inputStyle, { backgroundColor: bgDark, color }]}
                    placeholder='Enter amount $'
                    placeholderTextColor={theme.colorText}
                    keyboardType='numeric'
                    onChangeText={(text) => onChangeTextAction(text)}
                    selectionColor={theme.color}
                    textAlign='center'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoComplete='off'
                    autoFocus={false}
                    returnKeyType='done'
                    onFocus={() => setState({ ...state, isPacket: -1 })}
                    value={state.amount}
                />
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 20, alignItems: 'center', paddingBottom: 10 }}
                    scrollEnabled={false}
                    numColumns={4}
                    key={4}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setState({ ...state, isPacket: index, amount: '' })}
                            style={[topup_style.item, { backgroundColor: bgDark }, state.isPacket == index && borderColor]}>
                            <Text style={[{ color, fontWeight: 'bold', textAlign: 'center' }]}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />

                <Text style={[topup_style.text, { color, marginTop: 8 }]}>Payment Method</Text>
                <FlatList
                    data={dataPayment}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 20, alignItems: 'center' }}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setState({ ...state, isPayment: index })}
                            key={index} style={[topup_style.payment, { backgroundColor: bgDark }, state.isPayment == index && borderColor]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={item.icon} style={{ width: 60, height: 40, marginRight: 15, borderRadius: 3 }} />
                                <View>
                                    <Text style={[{ color, fontWeight: 'bold' }]}>{item.name}</Text>
                                    {item.io && <Image source={item.io} style={{ width: 100, height: 10, borderRadius: 3, marginTop: 5 }} />}
                                    {item.sub && <Text style={[{ color, fontSize: 12, marginTop: 5 }]}>{item.sub}</Text>}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>

            <TouchableOpacity
                onPress={TopupAction}
                style={[topup_style.pay_now]}>
                <Text style={[{ color: background, fontSize: 16, fontWeight: 'bold', textAlign: 'center' }]}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TopupScreen

