import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Camera, CameraView } from 'expo-camera'
import { ActivityIndicator } from 'react-native-paper'
import { useAppNavigation, useAppSelector } from '../../hooks'
import useLinkCard from '../../hooks/useLinkCard'
import styles from '../../util/style/Style'

const QRScannerCardScreen = () => {
    const { theme } = useAppSelector(state => state.cache)

    const [hasPermission, setHasPermission] = useState<boolean | null>();
    const [scanned, setScanned] = useState(false);
    const nav = useAppNavigation()
    const { linkCardMutation } = useLinkCard()

    const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    useEffect(() => {
        getCameraPermissions()
        nav.navigate('process-link-card', { card_number: '202512310496' })
    }, []);

    const handleBarcodeScanned = ({ type, data }: any) => {
        // setScanned(true);
        // Handle the scanned data here, e.g., navigate to another screen or perform an action
        nav.navigate('process-link-card', { card_number: data })
    };

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
                        barcodeTypes: ["qr", "code128", "aztec", "codabar", "code39", "code93", "datamatrix", "ean13", "ean8", "itf14", "pdf417", "upc_a", "upc_e", "codabar"],
                    }}
                    style={StyleSheet.absoluteFillObject}
                    facing='back'
                />
                {scanned && <TouchableOpacity style={styles.tab_scan} onPress={() => setScanned(false)}>
                    <Text style={styles.tab_text}>Tab to Scan</Text>
                </TouchableOpacity>}
            </View>

            <View style={[styles.topOverlay, { height: '30%' }]} >
                <Text style={styles.scan_title}>Scan QR or Barcode</Text>
            </View>

            <View style={[styles.bottomOverlay, { height: '40%' }]} />
            <View style={[styles.leftOverlay, { height: '30%', bottom: '40%', width: '5%' }]} />
            <View style={[styles.rightOverlay, { height: '30%', bottom: '40%', width: '5%' }]} />

            {linkCardMutation.isPending && <View style={styles.pendingOverlay}>
                <ActivityIndicator size={'small'} style={{ marginBottom: '20%' }} />
            </View>}
        </View>
    )
}

export default QRScannerCardScreen