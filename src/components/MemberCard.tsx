import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../localization';

const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;

interface props {
    isPromotion: boolean
}

const MemberCard = (props: props) => {
    const { theme } = useAppSelector(state => state.cache)

    return (
        <View>
            <Text style={[_style.text_promotion, { color: theme.color, marginBottom: 10 }]}>{i18n.t('Your Card')}</Text>
            <FlatList
                horizontal
                pagingEnabled
                snapToInterval={CARD_WIDTH + 10}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                data={Array.from({ length: 1 })}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} style={[_style.card_container, { backgroundColor: theme.bgDark }]}>
                            <Ionicons name='add-circle-outline' size={50} color={theme.background} />
                        </TouchableOpacity>
                    );
                }}
            />
            {props.isPromotion && <Text style={[_style.text_promotion, { color: theme.color, marginTop: 30 }]}>{i18n.t('Promotion')}</Text>}
        </View>
    );
};

export default MemberCard;

const _style = StyleSheet.create({
    card_container: {
        height: WIDTH / 2.5,
        borderRadius: 12,
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_promotion: {
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: -12
    }
});
