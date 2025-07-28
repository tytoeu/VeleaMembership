import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ref, onValue } from 'firebase/database';
import * as Location from 'expo-location';
import { db } from '../../firebase';

const DRIVER_ID = '125';
interface ILocation {
    latitude: number;
    longitude: number;
}

export default function MapTracking() {
    const [driverLoc, setDriverLoc] = useState(null);
    const [customerLoc, setCustomerLoc] = useState<ILocation | null>(null);

    // Get customer's own location
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            console.log('loading')
            const loc = await Location.getCurrentPositionAsync({});
            setCustomerLoc({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        })();
    }, []);

    // Get driver's location from Firebase
    useEffect(() => {
        const unsub = onValue(ref(db, `drivers/${DRIVER_ID}/location`), (snap) => {
            const data = snap.val();
            if (data) setDriverLoc(data);
        });
        return () => unsub();
    }, []);

    const bothReady = driverLoc && customerLoc;

    return (
        <View style={{ flex: 1 }}>
            {bothReady ? (
                <MapView
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: customerLoc.latitude,
                        longitude: customerLoc.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    <Marker coordinate={customerLoc} title="You (Customer)" />
                    <Marker coordinate={driverLoc} title="Driver" pinColor="blue" />

                    <Polyline
                        coordinates={[driverLoc, customerLoc]}
                        strokeColor="red"
                        strokeWidth={3}
                    />
                </MapView>
            ) : (
                <Text style={{ marginTop: 100, textAlign: 'center', color: '#000' }}>
                    Waiting for driver and your location...
                </Text>
            )}
        </View>
    );
}
