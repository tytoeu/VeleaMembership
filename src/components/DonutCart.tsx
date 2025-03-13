import { View, Animated, TextInput, StyleSheet } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import React, { useEffect, useRef } from 'react'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const DonutCart = ({
    percentag = 700,
    radius = 40,
    strokeWidth = 10,
    duration = 500,
    color = 'tomato',
    delay = 0,
    textColor = 'tomato',
    max = 1000
}) => {
    const halfCicle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius
    const circleRef = useRef<any>(null)
    const inputRef = useRef<any>(null)
    const animatedValue = useRef(new Animated.Value(0)).current

    const animation = (toValue: number) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true
        }).start(() => {
            // animation(toValue === 0 ? percentag : 0)
        })
    }

    useEffect(() => {
        animation(percentag);
        animatedValue.addListener(v => {
            const maxPercent = (100 * v.value) / max;
            const strokeDashoffset = circleCircumference - (circleCircumference * maxPercent) / 100;

            if (circleRef?.current) {
                (circleRef.current as any).setNativeProps({ strokeDashoffset });
            }

            if (inputRef?.current) {
                (inputRef.current as any).setNativeProps({
                    text: `${Math.round(v.value)}`
                })
            }
        });
        return () => {
            animatedValue.removeAllListeners()
        };
    }, [max, percentag]);

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCicle * 2} ${halfCicle * 2}`}>
                <G rotation='-90' origin={`${halfCicle}, ${halfCicle}`}>
                    <Circle
                        cx={"50%"}
                        cy={"50%"}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill={'transparent'}
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx={"50%"}
                        cy={"50%"}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill={'transparent'}
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
            <AnimatedTextInput
                ref={inputRef}
                editable={false}
                defaultValue='0'
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: textColor ?? color },
                    { fontWeight: '900', textAlign: 'center' }
                ]}
            />
        </View>
    )
}

export default DonutCart