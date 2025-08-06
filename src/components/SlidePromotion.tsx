import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useAppNavigation, useAppSelector } from '../hooks';
const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = Math.floor(WIDTH - 40);
import React from 'react'

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
    const centerIndex = Math.floor(prop.data.length / 2);
    return (
        <View>
            <FlatList
                horizontal
                pagingEnabled
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 10}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
                keyExtractor={(item, index) => index.toString()}
                data={prop.data}
                initialScrollIndex={centerIndex}
                getItemLayout={(data, index) => ({
                    length: CARD_WIDTH,
                    offset: CARD_WIDTH * index,
                    index,
                })}
                renderItem={({ item, index }) => {
                    return (<TouchableOpacity
                        onPress={() => nav.navigate('promotion', { item })}
                        activeOpacity={0.8} style={[styles.card_container, { backgroundColor: theme.bgDark }]}>
                        <Image
                            source={{ uri: item.slide }} // size 1113px X 600px
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </TouchableOpacity>)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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