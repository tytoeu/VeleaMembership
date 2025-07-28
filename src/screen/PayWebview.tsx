import { View, StyleSheet } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const PayWebview = () => {
    return (
        <View className='flex-1'>
            <WebView
                style={styles.container}
                source={{ uri: 'https://ptc-computer.com.kh' }}
                startInLoadingState
                // If you need callbacks:
                onLoadStart={() => console.log('Loading started')}
                onLoadEnd={() => console.log('Loading finished')}
            />
        </View>
    )
}

export default PayWebview

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loader: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // optional splash colour
    }
});