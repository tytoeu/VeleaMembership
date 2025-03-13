import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import { useAppSelector } from '../hooks'
import React from 'react'

const TransactionHistory = ({ index }: { index: number }) => {
    const { theme } = useAppSelector(state => state.cache)
    const operate = index % 2
    return (
        <>
            {operate == 0 && <View style={home_style.tran_date_content}>
                <View style={[home_style.tran_border, { borderBottomColor: theme.colorText }]} />
                <Text style={[home_style.tran_date, { color: theme.color }]}>0{index + 3}-03-2025</Text>
                <View style={[home_style.tran_border, { borderBottomColor: theme.colorText }]} />
            </View>}

            <View style={[home_style.tran_card, { backgroundColor: theme.bgDark }]}>
                <View style={home_style.icon_content}>
                    <View style={[home_style.tran_icon, { backgroundColor: operate ? '#b9770e' : '#5b2c6f' }]}>
                        {operate == 0 ?
                            <Ionicons name='swap-horizontal-outline' size={20} color={'white'} /> :
                            <MaterialCommunityIcons name="bank" size={20} color={'white'} />}

                    </View>
                    <View>
                        <Text style={[home_style.tran_text, { color: theme.color }]}>Quick Transfer</Text>
                        <Text style={[home_style.tran_name_text, { color: theme.color }]}>Mr. Mannet</Text>
                    </View>
                </View>
                <Text style={[home_style.tran_text_balance, { color: operate ? '#138d75' : 'red' }]}>{operate ? '+' : '-'}${index + 1}0.00</Text>
            </View>
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