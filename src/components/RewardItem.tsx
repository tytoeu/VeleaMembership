import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useAppSelector } from '../hooks'
import React from 'react'
import { IItem } from '../hooks/interface/IItem'

interface prop {
    item: IItem
    index: number,
    data: any,
    onPress?: () => void | Promise<void>
    current_point?: number,
    type: 'REWARD' | 'MY_REWARD' | 'USED'
}

const Reward = (prop: prop) => {
    const { theme } = useAppSelector(state => state.cache)
    if (!prop.item) return
    return (
        <TouchableOpacity disabled={prop.type == 'USED' ? true : false} style={[style.reward_card, { backgroundColor: theme.bgDark }]} onPress={prop.onPress}>
            <View style={style.content}>
                <View style={[style.reward_icon]}>
                    <Image
                        source={{ uri: prop.item.image }}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: '100%', paddingHorizontal: 5 }}>
                    <Text numberOfLines={1} style={[style.reward_text, { color: theme.color }]}>{prop.item.item_name}</Text>
                    <Text numberOfLines={1} style={[style.reward_name_text, { color: theme.color }]}>{prop.item.item_type}</Text>
                    {prop.type == 'REWARD' && <Text style={[{ color: 'white', backgroundColor: theme.main }, style.point]}>{`${prop.current_point}/${prop.item.min_point}`}</Text>}
                    {prop.type == 'MY_REWARD' && <Text style={[style.reward_name_text, { color: theme.color, fontSize: 10, paddingVertical: 8 }]}>Exp: {prop.item.expired}</Text>}
                    {prop.type == 'USED' && <Text style={[style.point, { color: 'rgba(236, 49, 49,1)', backgroundColor: 'rgba(236, 49, 49,0.2)', fontFamily: 'R500', fontSize: 10 }]}>Already Used</Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Reward

const style = StyleSheet.create({
    reward_card: {
        width: '48%',
        marginBottom: 16,
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    reward_icon: {
        width: '100%',
        height: 140,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 10
    },
    reward_date_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center',
        marginTop: 10
    },
    reward_border: {
        borderBottomWidth: 1,
        width: '38%',
        opacity: 0.6
    },
    reward_date: {
        fontFamily: 'R500',
        opacity: 0.8,
        fontSize: 12
    },
    reward_text_balance: {
        fontSize: 14,
        fontFamily: 'R700'
    },
    reward_name_text: {
        fontSize: 12,
        fontFamily: 'R500',
        opacity: 0.6
    },
    reward_text: {
        fontFamily: 'R500',
        fontSize: 14,
        marginBottom: 3,
        textAlign: 'left'
    },
    point: {
        paddingHorizontal: 8,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'R900',
        fontSize: 12,
        paddingVertical: 3
    }
})