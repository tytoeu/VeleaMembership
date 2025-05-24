import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppNavigation } from '../hooks';

const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;

interface item {
    id: number;
    title: string;
    description: string;
    image: string;
    status: number;
    start_date: string;
    closing_date: string;
    created_at: string;
}

interface props {
    item: item
}

const PromotionCard = (props: props) => {
    const nav = useAppNavigation()
    if (!props.item) return
    return (<TouchableOpacity
        activeOpacity={0.8}
        style={[_styles.card_container]}
        onPress={() => nav.navigate('promotion', { item: props.item })}>
        <Image
            source={{ uri: props.item.image }}
            style={_styles.image}
        />
    </TouchableOpacity>
    )
}

export default PromotionCard

const _styles = StyleSheet.create({
    card_container: {
        height: WIDTH + 50,
        borderRadius: 12,
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        overflow: 'hidden',
        shadowColor: "rgba(255, 255, 255, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
})