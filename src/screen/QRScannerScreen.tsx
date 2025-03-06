import { View, Text, Button, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'
import { Camera, CameraView } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons'

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
                    <MaterialIcons name="flashlight-on" size={32} color={'white'} />
                    <Text style={styles.iconText}>ភ្លើង</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setScanned(false)}>
                    <MaterialIcons name="qr-code-scanner" size={32} color="white" />
                    <Text style={styles.iconText}>បើក QR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QRScannerScreen

const styles = StyleSheet.create({

    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: '#222',
    },
    iconButton: {
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        marginTop: 5,
        fontSize: 14,
    },
    topOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '25%',
        top: 0,
        left: 0
    },
    bottomOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '40%',
        bottom: 0,
        left: 0
    },
    leftOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '12%',
        height: '35%',
        bottom: '40%',
        left: 0
    },
    rightOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '12%',
        height: '35%',
        bottom: '40%',
        right: 0
    },
})