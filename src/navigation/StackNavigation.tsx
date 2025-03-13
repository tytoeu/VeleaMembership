import { createStackNavigator } from '@react-navigation/stack'
import { CartListScreen, PaymentScreen, QRScannerScreen } from '../screen'
import BottomTabNavigation from './BottomTabNavigation'
import { DarkMode, Language } from '../screen/setting'
import { useAppSelector } from '../hooks'
import React from 'react'

const Stack = createStackNavigator()

const StackNavigation = () => {
    const { theme } = useAppSelector((state) => state.cache)
    return (
        <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={{
                headerTitleStyle: { color: theme.color, fontFamily: 'R700', fontSize: 18 },
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                headerTintColor: theme.color,
            }}
        >
            <Stack.Screen name='BottomTab' component={BottomTabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='DarkMode' component={DarkMode} options={{
                title: 'Dark mode'
            }} />
            <Stack.Screen name='Language' component={Language} options={{
                title: 'Language'
            }} />
            <Stack.Screen name='qr-scanner' component={QRScannerScreen} options={{
                title: 'QR Scanner',
                headerStyle: { backgroundColor: '#000' },
                headerTintColor: '#fff',
                headerBackTitle: '#fff',
                headerTitleStyle: { color: '#fff', fontFamily: 'R700', fontSize: 18 },
            }} />
            <Stack.Screen name='cart-list' component={CartListScreen} options={{
                title: 'Cart'
            }} />
            <Stack.Screen name='payment' component={PaymentScreen} options={{
                title: 'Payment'
            }} />
        </Stack.Navigator>
    )
}

export default StackNavigation