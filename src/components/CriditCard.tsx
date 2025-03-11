import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import home_style from '../util/style/HomeStyle'
import { assets } from '../../assets'
import { useAppSelector } from '../hooks'
import { Ionicons } from '@expo/vector-icons'
import DonutCart from './DonutCart'

const logo = assets.logo

interface IProp {
    balance: string;
    code: string;
}

const CriditCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)
    const [hide, setHide] = useState(true)
    const action_show_hide = () => setHide(pre => !pre)

    return (
        <View style={[home_style.credit_card, { backgroundColor: theme.bgDark }]}>
            <View>
                <>
                    <Text style={[home_style.text_balance, { color: theme.color }]}>Balance</Text>
                    <View style={home_style.balance_container}>
                        <Text style={[home_style.balance_number, { color: theme.color }]}>{hide ? '**********' : prop.balance}</Text>
                        <Pressable style={home_style.hide_button} onPress={action_show_hide}>
                            <Ionicons name={hide ? 'eye-off-outline' : 'eye-outline'} size={22} color={theme.colorText} />
                        </Pressable>
                    </View>
                </>
                <Text style={[home_style.code, { color: theme.color, marginTop: 12 }]}>{prop.code}</Text>
            </View>
            <View style={home_style.code_card}>
                <Text style={[home_style.text_balance, { color: theme.color, marginBottom: 8 }]}>Score</Text>
                <DonutCart max={1000} percentag={140} />
            </View>
        </View>
    )
}

export default CriditCard