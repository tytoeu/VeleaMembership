import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { useAppSelector } from '../hooks';
import i18n from '../localization';
import FlipCard from './FlipCard';
import { ICard } from '../hooks/interface/IDashboard';

const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;

interface props {
    isPromotion: boolean;
    items: ICard[];
}

const MemberCard = (props: props) => {
    const { theme } = useAppSelector(state => state.cache)

    return (
        <View>
            <Text style={[_styles.text_promotion, { color: theme.color, marginBottom: 10 }]}>{i18n.t('Your Card')}</Text>
            <FlatList
                horizontal
                pagingEnabled
                snapToInterval={CARD_WIDTH + 10}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                data={props.items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (<FlipCard index={index} item={item} frontText={index.toString()} backText={index.toString()} isCreated={item.id == 0 ? true : false} />);
                }}
            />
            {props.isPromotion && <Text style={[_styles.text_promotion, { color: theme.color, marginTop: 30 }]}>{i18n.t('Promotion')}</Text>}
        </View>
    );
};

export default MemberCard;

const _styles = StyleSheet.create({
    text_promotion: {
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: -12
    },
    card_container: {
        height: 170,
        borderRadius: 12,
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
