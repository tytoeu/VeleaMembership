import { Animated } from 'react-native'
import { useRef, useState } from 'react'
import * as Location from 'expo-location';
import MapView, { Region } from 'react-native-maps';
import { ModalSheetBottomRef } from '../components/ModalSheetBottom';

const LIFT = -28;

const useLocation = () => {
    const isDragging = useRef(false);
    const isAnimating = useRef(false);
    const mapRef = useRef<MapView>(null);
    const modalRef = useRef<ModalSheetBottomRef>(null)

    // keep the map’s region so other UI (address, etc.) can read it
    const [region, setRegion] = useState<Region>({
        latitude: 11.5564,
        longitude: 104.9282,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const translateY = useRef(new Animated.Value(0)).current;   // pin up/down
    const shadowScale = useRef(new Animated.Value(1)).current;   // squash shadow
    const shadowOpac = useRef(new Animated.Value(0)).current;   // fade shadow

    const lift = () => {
        Animated.parallel([
            Animated.spring(translateY, { toValue: LIFT, useNativeDriver: true, speed: 20, bounciness: 10 }),
            Animated.timing(shadowOpac, { toValue: 0.25, useNativeDriver: true, duration: 120 }),
            Animated.timing(shadowScale, { toValue: 1.4, useNativeDriver: true, duration: 120 }),
        ]).start();
    };

    const drop = () => {
        Animated.parallel([
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 12 }),
            Animated.timing(shadowOpac, { toValue: 0, useNativeDriver: true, duration: 180 }),
            Animated.timing(shadowScale, { toValue: 1, useNativeDriver: true, duration: 180 }),
        ]).start();
    };

    const useCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        modalRef.current?.close()

        let location = await Location.getCurrentPositionAsync({});
        goTo(location.coords.latitude, location.coords.longitude)

        setRegion({
            ...region,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
    };

    const goTo = (lat: number, lng: number) => {
        const coord = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
        isAnimating.current = true;
        lift()

        mapRef.current?.animateToRegion(coord, 1000);

        mapRef.current?.animateCamera(
            { center: { latitude: lat, longitude: lng }, zoom: 18 },
            { duration: 800 },
        );
    };

    const formattedAddressing = async () => {
        let location = await Location.reverseGeocodeAsync(region)
        const detail = location[0]
        return detail
    }

    return {
        useCurrentLocation,
        drop,
        modalRef,
        isDragging,
        isAnimating,
        region,
        setRegion,
        translateY,
        shadowOpac,
        shadowScale,
        formattedAddressing,
        lift,
        mapRef,
        goTo
    }
}

export default useLocation