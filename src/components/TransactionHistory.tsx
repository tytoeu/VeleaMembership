import { FontAwesome } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppSelector } from '../hooks'
import React from 'react'
import { formatDecimal } from '../helpers'

interface historyInterface {
    id: number,
    title: string,
    sub_title: string,
    type: string,
    date: string,
    amount: number,
    orderId: number
}

interface prop {
    item: historyInterface
    index: number,
    data: any;
    onPress?: (id: number) => void
}
const formatDate = (datetime: string) => datetime.split(' ')[0];

const TransactionHistory = (prop: prop) => {
    const { theme } = useAppSelector(state => state.cache)

    const symbol = prop.item.type == 'earn-point' ? 'Point' : '$'
    const color = prop.item.type == 'earn-point' ? '#138d75' : '#de0101'
    const _symbol = prop.item.type == 'purchase' ? '-' : '+'

    const currentDate = formatDate(prop.item.date);

    const prevDate = prop.index > 0 ? formatDate(prop.data[prop.index - 1].date) : null;
    const showDate = currentDate !== prevDate;

    const decimal: string = formatDecimal(prop.item.amount)

    return (
        <>
            {showDate && <View style={home_style.tran_date_content}>
                <View style={[home_style.tran_border, { borderBottomColor: theme.colorText }]} />
                <Text style={[home_style.tran_date, { color: theme.color }]}>{prop.item.date}</Text>
                <View style={[home_style.tran_border, { borderBottomColor: theme.colorText }]} />
            </View>}

            <TouchableOpacity onPress={() => {
                prop.onPress && prop.onPress(prop.item.orderId)
            }} style={[home_style.tran_card, { backgroundColor: theme.bgDark }]}>
                <View style={home_style.icon_content}>
                    <View style={[home_style.tran_icon, { backgroundColor: '#b9770e' }]}>
                        {prop.item.type == 'earn-point' ? <FontAwesome name="star" size={20} color={'white'} /> : <FontAwesome name="dollar" size={20} color={'white'} />}
                    </View>
                    <View>
                        <Text style={[home_style.tran_text, { color: theme.color }]}>{prop.item.title}</Text>
                        <Text style={[home_style.tran_name_text, { color: theme.color }]}>Velea gastropub</Text>
                    </View>
                </View>
                <Text style={[home_style.tran_text_balance, { color }]}>{_symbol}{decimal} {symbol}</Text>
            </TouchableOpacity>
        </>
    )
}

export default TransactionHistory

const home_style = StyleSheet.create({
    tran_card: {
        width: '100%',
        height: 70,
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon_content: {
        flexDirection: 'row'
    },
    tran_icon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    tran_date_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center',
        marginTop: 10
    },
    tran_border: {
        borderBottomWidth: 1,
        width: '38%',
        opacity: 0.6
    },
    tran_date: {
        fontFamily: 'R500',
        opacity: 0.8,
        fontSize: 12
    },
    tran_text_balance: {
        fontSize: 14,
        fontFamily: 'R700'
    },
    tran_name_text: {
        fontSize: 12,
        fontFamily: 'R500',
        opacity: 0.6
    },
    tran_text: {
        fontFamily: 'R500',
        fontSize: 14,
        marginBottom: 3
    }
})