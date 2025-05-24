import { createStackNavigator } from '@react-navigation/stack'
import { CartListScreen, PaymentScreen, PaySuccess, PromotionDetail, QRScannerScreen, QRScreen, TopupScreen } from '../screen'
import BottomTabNavigation from './BottomTabNavigation'
import { DarkMode, Language } from '../screen/setting'
import { useAppSelector } from '../hooks'
import React from 'react'
import i18n from '../localization'
import { ChangePassword, PersonalInfor, ResetPassword, VerifyCode } from '../screen/auth'
import VerifyPhoneScreen from '../screen/auth/VerifyPhoneScreen'

const Stack = createStackNavigator()

const StackNavigation = () => {
    const { theme } = useAppSelector((state) => state.cache)
    return (
        <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={{
                headerTitleStyle: { color: theme.color, fontFamily: 'R700', fontSize: 16 },
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                headerTintColor: theme.color,
            }}
        >
            <Stack.Screen name='BottomTab' component={BottomTabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='DarkMode' component={DarkMode} options={{
                title: i18n.t('Dark mode')
            }} />
            <Stack.Screen name='Language' component={Language} options={{
                title: i18n.t('Language')
            }} />
            <Stack.Screen name='qr-scanner' component={QRScannerScreen} options={{
                title: i18n.t('QR Scanner'),
                headerStyle: { backgroundColor: '#000' },
                headerTintColor: '#fff',
                headerBackTitle: '#fff',
                headerTitleStyle: { color: '#fff', fontFamily: 'R700', fontSize: 18 },
            }} />
            <Stack.Screen name='cart-list' component={CartListScreen} options={{
                title: i18n.t('Cart')
            }} />
            <Stack.Screen name='payment' component={PaymentScreen} options={{
                title: i18n.t('Payment')
            }} />
            <Stack.Screen name='pay-success' component={PaySuccess} options={{
                headerShown: false
            }} />
            <Stack.Screen name='top-up' component={TopupScreen} options={{
                title: i18n.t('Top-up')
            }} />
            <Stack.Screen name='promotion' component={PromotionDetail} options={{
                title: '',
                headerShown: false
            }} />
            <Stack.Screen name='QR' component={QRScreen} options={{
                title: i18n.t('My QR Code')
            }} />
            <Stack.Screen name='change-password' component={ChangePassword} options={{
                title: i18n.t('Change password')
            }} />

            <Stack.Screen name="verify-code" component={VerifyCode} options={{
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                title: ''
            }} />
            <Stack.Screen name="phone-verify" component={VerifyPhoneScreen} options={{
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                title: ''
            }} />

            <Stack.Screen name="reset-password" component={ResetPassword} options={{
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                title: ''
            }} />

            <Stack.Screen name="personal-info" component={PersonalInfor} options={{
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                title: i18n.t('Personal information')
            }} />
        </Stack.Navigator>
    )
}

export default StackNavigation