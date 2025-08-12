import React, { useRef } from 'react';
import {
    View,
    Image,
    Animated,
    PanResponder,
    StyleSheet,
    Pressable,
    Text,
} from 'react-native';

const tables = [
    { id: 1, x: 100, y: 100, status: 'available' },
    { id: 2, x: 300, y: 200, status: 'booked' },
    { id: 3, x: 500, y: 300, status: 'available' }
];

const EventBooking = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.mapContainer, { transform: pan.getTranslateTransform() }]}
                {...panResponder.panHandlers}
            >
                <Image
                    source={require('../../assets/game/bg_game.jpg')}
                    style={styles.mapImage}
                />

                {tables.map((table) => (
                    <Pressable
                        key={table.id}
                        onPress={() => alert(`Table ${table.id} is ${table.status}`)}
                        style={[
                            styles.table,
                            {
                                top: table.y,
                                left: table.x,
                                backgroundColor: table.status === 'available' ? 'green' : 'red',
                            },
                        ]}
                    >
                        <Text style={styles.tableText}>{table.id}</Text>
                    </Pressable>
                ))}
            </Animated.View>
        </View>
    );
}

export default EventBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    mapContainer: {
        width: 2000,
        height: 2000,
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    table: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    tableText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});