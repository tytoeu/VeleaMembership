import { View, Text, TouchableOpacity } from 'react-native'
import home_style from '../util/style/HomeStyle'
import { useAppSelector } from '../hooks'
import React from 'react'
import i18n from '../localization'
import { formatPhoneNumber } from '../helpers'
import DonutCart from './DonutCart'

interface IProp {
    balance: string;
    phone: string;
    point: number
}

const CriditCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)
    if (!prop) return

    return (
        <View style={[home_style.credit_card, { backgroundColor: theme.bgDark }]}>
            <View>
                <>
                    <Text style={[home_style.text_balance, { color: theme.color }]}>{i18n.t('Balance')}</Text>
                    <View style={home_style.balance_container}>
                        <Text style={[home_style.balance_number, { color: theme.color }]}>{prop.balance} $</Text>
                    </View>
                </>
                <Text style={[home_style.code, { color: theme.color, marginTop: 60 }]}>{formatPhoneNumber(prop.phone)}</Text>
            </View>
            <View style={home_style.code_card}>

                <Text style={[home_style.text_balance, { color: theme.color, marginBottom: 8 }]}>{i18n.t('Score')}</Text>
                <DonutCart max={1000} percentag={prop.point} />

                <TouchableOpacity style={[home_style.redom, { backgroundColor: theme.bgDark }]}>
                    <Text style={[{ color: theme.color, fontSize: 12, fontWeight: 'bold' }]}>{i18n.t('Exchange Point')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CriditCard