import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Alert, Animated } from 'react-native'
import React, { useRef } from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const WIDHT_CARD = Math.floor(WIDTH - 100);
const HEIGHT_CARD = Math.floor(HEIGHT / 2.5);

interface Item {
    name: string;
    image: string;
    startDate: string;
    endDate: string;
    mainShow: boolean
}

const EventSlider = ({ data }: { data: Item[] }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const scrollHandler = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
    );

    const centerIndex = data.findIndex(item => item.mainShow);

    return (
        <View style={{ marginTop: 10 }}>
            <Animated.FlatList
                data={data}
                keyExtractor={(item) => item.image}
                snapToInterval={WIDHT_CARD}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 50, gap: 0 }}
                initialScrollIndex={centerIndex}
                onScroll={scrollHandler}
                getItemLayout={(data, index) => ({
                    length: WIDHT_CARD,
                    offset: WIDHT_CARD * index,
                    index,
                })}

                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * (WIDHT_CARD),
                        index * (WIDHT_CARD),
                        (index + 1) * (WIDHT_CARD)
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp'
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp'
                    });

                    return (
                        <Animated.View style={{ transform: [{ scale }], opacity }}>
                            <View style={styles.container} className='bg-white dark:bg-gray-800'>
                                <Image
                                    source={{ uri: item.image }} // size 933px X 1038px
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => Alert.alert('Warning', 'Booking not now !')}
                                className='bg-orange-700 rounded-lg p-2 mt-2'
                                style={styles.button_booking}>
                                <Text className='font-bold'>Booking Now</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                }}
            />
        </View>
    )
}

export default EventSlider

const styles = StyleSheet.create({
    container: {
        height: HEIGHT_CARD,
        borderRadius: 12,
        width: WIDHT_CARD,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    button_booking: {
        width: WIDHT_CARD,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})