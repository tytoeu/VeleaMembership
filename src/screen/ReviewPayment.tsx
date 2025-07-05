import { View, Text, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import ModalSheetBottom, { ModalSheetBottomRef } from '../components/ModalSheetBottom'
import topup_style from '../util/style/topup_style'
import { MyIconComponent } from '../components'
import { useAppSelector } from '../hooks'
import React, { useRef } from 'react'
import i18n from '../localization'

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

const items = [
    {
        name: 'Pizza Margherita',
        price: '$10.00'
    },
    {
        name: 'Spaghetti Carbonara',
        price: '$12.50'
    },
    {
        name: 'Pizza Pepperoni',
        price: '$5.99'
    },
    {
        name: 'Caesar Salad',
        price: '$8.59'
    }
]

const ReviewPayment = () => {
    const { theme } = useAppSelector(state => state.cache)
    const { addressSeleted } = useAppSelector((state) => state.temp)
    const modalRef = useRef<ModalSheetBottomRef>(null)
    const color = theme.color
    const bgDark = theme.bgDark
    const borderColor = { borderWidth: 1, borderColor: '#ca6f1e' }

    const [state, setState] = React.useState({
        isPayment: 0,
        isPacket: 0,
        amount: ''
    })

    return (
        <View className='flex-1 dark:bg-black'>
            <ScrollView className='p-4'>
                <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Items</Text>
                <View className='mt-2 mb-4 bg-white dark:bg-white/10 p-4 rounded-lg'>

                    {items.map((item, index) => (
                        <View key={index} className='flex-row justify-between items-center mb-2'>
                            <Text className='color-slate-800 dark:color-slate-300'>{item.name} (1x)</Text>
                            <Text className='color-slate-400 dark:color-slate-100 font-medium'>{item.price}</Text>
                        </View>))}
                </View>

                <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Summary</Text>
                <View className='mt-2 mb-4 bg-white dark:bg-white/10 p-4 rounded-lg'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='color-slate-800 dark:color-slate-300'>Sub Total</Text>
                        <Text className='color-slate-400 dark:color-slate-100 font-medium'>$200.50</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-800 dark:color-slate-300'>Fee</Text>
                        <Text className='color-slate-400 dark:color-slate-100 font-medium'>$1.50</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-800 dark:color-slate-300'>Tax</Text>
                        <Text className='color-slate-400 dark:color-slate-100 font-medium'>$1.00</Text>
                    </View>
                    <View className='flex-row justify-between items-center mt-2'>
                        <Text className='color-slate-800 dark:color-slate-300'>Grand Total</Text>
                        <Text className='color-slate-400 dark:color-slate-100 font-medium'>$180.00</Text>
                    </View>
                </View>

                <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Location</Text>
                <View
                    style={[topup_style.payment, { backgroundColor: bgDark, flexDirection: 'row', marginHorizontal: 0, marginBottom: 16, width: '100%', alignItems: 'center' }]}>
                    {/* <Image source={require('../../assets/logo_android.png')} style={{ width: 60, height: 40, marginRight: 15, borderRadius: 3 }} /> */}
                    <MyIconComponent name={addressSeleted?.labelIcon!} size={30} color={theme.colorText} type='Ionicons' />
                    <View className='ml-3'>
                        <Text style={{ color, fontWeight: 'bold' }}>{addressSeleted?.labelName}</Text>
                        <Text numberOfLines={1} style={[{ color, fontSize: 12, marginTop: 5 }]}>{addressSeleted?.address1}</Text>
                    </View>
                </View>

                <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Payment Method</Text>
                <TouchableOpacity
                    onPress={() => modalRef.current?.present()}
                    style={[topup_style.payment, { backgroundColor: bgDark, flexDirection: 'row', marginHorizontal: 0, width: '100%' }]}>
                    {dataPayment[state.isPayment].icon && <Image source={dataPayment[state.isPayment].icon} style={{ width: 60, height: 40, marginRight: 15, borderRadius: 3 }} />}
                    <View>
                        <Text style={{ color, fontWeight: 'bold' }}>{dataPayment[state.isPayment].name}</Text>
                        {dataPayment[state.isPayment].io && <Image source={dataPayment[state.isPayment].io} style={{ width: 100, height: 10, borderRadius: 3, marginTop: 5 }} />}
                        {dataPayment[state.isPayment].sub && <Text style={[{ color, fontSize: 12, marginTop: 5 }]}>{dataPayment[state.isPayment].sub}</Text>}
                    </View>
                </TouchableOpacity>
                <View style={{ height: 20 }} />
            </ScrollView>

            <View style={{ height: 80, backgroundColor: theme.background }}>
                <TouchableOpacity
                    onPress={() => Alert.alert('Payment Method', 'Please select a payment method')}
                    className='bg-orange-800 absolute w-[27.5rem] self-center bottom-10 h-14 items-center justify-center rounded-xl'>
                    <Text className='font-bold text-lg color-slate-50'>Pay Now</Text>
                </TouchableOpacity>
            </View>

            <ModalSheetBottom
                snapPoint={['50%']}
                ref={modalRef}
            >
                <View className='p-4 dark:bg-black'>
                    <Text className='text-lg font-bold dark:color-slate-50 color-slate-900'>Payment Method</Text>
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
                    <View style={{ height: 30 }} />
                </View>
            </ModalSheetBottom>

        </View>
    )
}

export default ReviewPayment