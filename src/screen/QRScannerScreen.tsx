import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'
import { Camera, CameraView } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons'
import styles from '../util/style/Style'

const QRScannerScreen = () => {
    const { theme } = useAppSelector(state => state.cache)

    const [hasPermission, setHasPermission] = useState<boolean>();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();

    }, []);

    const handleBarcodeScanned = ({ type, data }: any) => {
        setScanned(true);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        Alert.alert('Warning !', 'No access to camera')
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.cameraContainer}>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={StyleSheet.absoluteFillObject}
                    flash='on'
                    facing='back'
                />
            </View>

            <View style={styles.topOverlay} />
            <View style={styles.bottomOverlay} />
            <View style={styles.leftOverlay} />
            <View style={styles.rightOverlay} />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="flashlight-on" size={22} color={'white'} />
                    <Text style={styles.iconText}>ភ្លើង</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setScanned(false)}>
                    <MaterialIcons name="qr-code-scanner" size={22} color="white" />
                    <Text style={styles.iconText}>បើក QR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QRScannerScreen