import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';
import MapView, { Marker } from 'react-native-maps';

const DRIVER_ID = '125';

const MapTracking = () => {
    const [loc, setLoc] = useState<Location.LocationObjectCoords | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,      // every 5 s
                    distanceInterval: 10,    // or 10 m move
                },
                pos => setLoc(pos.coords),
            );
        })();
    }, []);

    // 🔄 push to Firebase whenever we get a new coord
    useEffect(() => {
        if (!loc) return;
        set(ref(db, `drivers/${DRIVER_ID}/location`), {
            latitude: loc.latitude,
            longitude: loc.longitude,
        });

        console.log(loc)
    }, [loc]);

    return (
        <View style={styles.container}>
            {loc ? (
                <MapView
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>
                    <Marker coordinate={loc} title="I'm here" />
                </MapView>
            ) : (
                <Text>Waiting for GPS…</Text>
            )}
        </View>
    )
}

export default MapTracking
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});