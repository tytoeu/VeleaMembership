import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

interface IProp {
    barColor?: string
}

const Loader: React.FC<IProp> = ({ barColor = '#c2410c' }) => {
    const bar1 = useRef(new Animated.Value(1)).current;
    const bar2 = useRef(new Animated.Value(1)).current;
    const bar3 = useRef(new Animated.Value(1)).current;
    const bar4 = useRef(new Animated.Value(1)).current;

    const animate = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bar1, {
                    toValue: 0.3,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(bar1, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(bar2, {
                    toValue: 0.3,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(bar2, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(bar3, {
                    toValue: 0.3,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(bar3, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.linear,
                })
            ]),
        ).start();
    };

    useEffect(() => {
        animate();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, { transform: [{ scaleY: bar1 }], backgroundColor: barColor }]} />
            <Animated.View style={[styles.bar, { transform: [{ scaleY: bar2 }], backgroundColor: barColor }]} />
            <Animated.View style={[styles.bar, { transform: [{ scaleY: bar3 }], backgroundColor: barColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bar: {
        width: 5,
        height: 15,
        borderRadius: 4,
    },
});

export default Loader;
