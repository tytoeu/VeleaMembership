import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useAppNavigation, useAppSelector } from '../hooks';
const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;

interface IProp {
    data: Item[]
}

interface Item {
    id: number;
    title: string;
    description: string;
    image: string;
    status: string;
    start_date: string;
    closing_date: string;
    created_at: string;
    slide: string;
}

const SlidePromotion = (prop: IProp) => {
    const { theme } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()
    return (
        <View>
            <FlatList
                horizontal
                pagingEnabled
                snapToInterval={CARD_WIDTH + 10}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                data={prop.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (<TouchableOpacity
                        onPress={() => nav.navigate('promotion', { item })}
                        activeOpacity={0.8} style={[styles.card_container, { backgroundColor: theme.bgDark }]}>
                        <Image
                            source={{ uri: item.slide }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </TouchableOpacity>)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card_body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    card_container: {
        height: 200,
        borderRadius: 12,
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    text_promotion: {
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: -12
    },
    cardBack: {
        backgroundColor: '#1e293b',
    },
    card: {
        backgroundColor: '#0c4a6e',
        backfaceVisibility: 'hidden',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD_WIDTH,
        height: 200,
    },
    text: {
        color: 'white',
        fontSize: 18,
    }
});


export default SlidePromotion