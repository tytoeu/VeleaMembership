import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Camera, CameraView } from 'expo-camera'
import { useAppNavigation, useAppSelector } from '../hooks'
import styles from '../util/style/Style'
import i18n from '../localization'
import { useFocusEffect } from '@react-navigation/native'

const QRScannerScreen = () => {
    const { theme } = useAppSelector(state => state.cache)

    const [hasPermission, setHasPermission] = useState<boolean | null>();
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState(false);
    const nav = useAppNavigation()

    const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    useEffect(() => {

        getCameraPermissions();

    }, []);

    const handleBarcodeScanned = ({ type, data }: any) => {
        setScanned(true);
        nav.navigate('payment')
        Alert.alert(`Barcode with type ${type} and data ${data} has been scanned!`);
        // Handle the scanned data here, e.g., navigate to another screen or perform an action
    };

    const color = flash ? 'white' : 'gray'

    const isComingSoon = false
    if (isComingSoon) {
        return (<View style={{ backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ color: theme.color, backgroundColor: theme.bgDark, padding: 20, borderRadius: 5, overflow: 'hidden', fontFamily: 'R700' }}>Coming Soon</Text>
        </View>)
    }

    if (hasPermission === false) {
        return <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="camera-alt" size={50} color={'gray'} />
            <Text style={{ color: theme.colorText }}>Requesting for camera permission</Text>
            <Text style={{ color: theme.colorText }}>Permission {hasPermission ? 'granted' : 'denied'}</Text>
            <TouchableOpacity onPress={() => Linking.openSettings()}
                style={{ marginTop: 20, padding: 10, backgroundColor: theme.bgDark, borderRadius: 5 }}>
                <Text style={{ color: theme.color }}>Try Again</Text>
            </TouchableOpacity>
        </View>
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
                    flash={flash ? 'on' : 'off'}
                    facing='back'
                />
            </View>

            <View style={styles.topOverlay} />
            <View style={styles.bottomOverlay} />
            <View style={styles.leftOverlay} />
            <View style={styles.rightOverlay} />

            {/* <View style={styles.footer}>
                <TouchableOpacity style={[styles.iconButton]} onPress={() => setFlash(!flash)}>
                    <MaterialIcons name={flash ? "flashlight-on" : "flashlight-off"} size={22} color={color} />
                    <Text style={[styles.iconText, { color }]}>{i18n.t('Flash')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setScanned(false)}>
                    <MaterialIcons name="qr-code-scanner" size={22} color={'white'} />
                    <Text style={[styles.iconText]}>{i18n.t('Open RQ')}</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

export default QRScannerScreen