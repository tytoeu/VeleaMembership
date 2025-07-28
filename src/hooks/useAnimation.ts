import { Animated } from 'react-native'
import { useEffect, useRef } from 'react'

const useAnimation = () => {
    const opacity = useRef(new Animated.Value(0)).current
    const translate = useRef(new Animated.Value(50)).current
    const scrollY = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 700,
                delay: 100,
                useNativeDriver: true
            }),
            Animated.timing(translate, {
                toValue: 0,
                duration: 700,
                delay: 100,
                useNativeDriver: true
            })
        ]).start()
    }, [])

    const scrollOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })
    const scrollTranslateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -50],
        extrapolate: 'clamp'
    })

    return { opacity, translate, scrollY, scrollOpacity, scrollTranslateY }
}

export default useAnimation