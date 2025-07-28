import { createStackNavigator } from '@react-navigation/stack'
import {
    CardInformationScreen,
    CardProvider,
    CartListScreen,
    Desposit,
    ItemDetail,
    Location,
    MapTracking,
    NotificationScreen,
    OnBoardingScreen,
    OrderSuccess,
    PaymentScreen,
    PaySuccess,
    PayWebview,
    PromotionDetail,
    QRScannerScreen,
    QRScreen,
    RedeemItemScreen,
    ReportOrder,
    ReserveForm,
    ReserveScreen,
    ReviewPayment,
    SearchItemScreen,
    TopupScreen
} from '../screen'
import {
    ChangePassword,
    CreatePassword,
    Login,
    LoginPassword,
    PersonalInfor,
    ProcessLinkCard,
    QRScannerCardScreen,
    ResetPassword,
    Signup,
    VerifyCode
} from '../screen/auth'

import BottomTabNavigation from './BottomTabNavigation'
import { DarkMode, Language } from '../screen/setting'
import { useAppSelector } from '../hooks'
import React from 'react'
import i18n from '../localization'
import VerifyPhoneScreen from '../screen/auth/VerifyPhoneScreen'
import { HeaderRight, PersonalInforRight, SearchHeaderRight } from '../components'
import { BalanceRules, TermCondition } from '../screen/policy'

const Stack = createStackNavigator()

const StackNavigation = () => {
    const { theme, onBoading } = useAppSelector((state) => state.cache)
    return (
        <Stack.Navigator
            initialRouteName={!onBoading ? 'onBoarding' : 'BottomTab'}
            screenOptions={{
                headerTitleAlign: 'left',
                headerTitleStyle: { color: theme.color, fontFamily: 'R700', fontSize: 16 },
                headerStyle: {
                    backgroundColor: theme.background, elevation: 0, shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0,
                    shadowRadius: 0
                },
                headerTintColor: theme.color,
                headerBackTitle: ' ',
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name='BottomTab' component={BottomTabNavigation} options={{ headerShown: false, title: '' }} />
            <Stack.Screen name='DarkMode' component={DarkMode} options={{
                title: i18n.t('Dark mode')
            }} />
            <Stack.Screen name='Language' component={Language} options={{
                title: i18n.t('Language')
            }} />
            <Stack.Screen name='qr-scanner' component={QRScannerScreen} options={{
                title: i18n.t('QR Scanner'),
                headerStyle: { backgroundColor: theme.background },
                headerTintColor: theme.color,
                headerBackTitle: theme.color,
                headerTitleStyle: { color: theme.color, fontFamily: 'R700', fontSize: 16 },
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

            <Stack.Screen name="personal-info" component={PersonalInfor} options={{
                title: i18n.t('Personal information'),
                headerRight: () => <PersonalInforRight />
            }} />

            <Stack.Screen name="redeem-item" component={RedeemItemScreen} options={{
                title: i18n.t('Exchange Point')
            }} />
            <Stack.Screen name="notification" component={NotificationScreen} options={{
                title: i18n.t('Notification')
            }} />
            <Stack.Screen name="reserve" component={ReserveScreen} options={{
                title: i18n.t('Reserve')
            }} />
            <Stack.Screen name="form-reserve" component={ReserveForm} options={{
                title: i18n.t('Form Reserve')
            }} />
            <Stack.Screen name="balance-rule" component={BalanceRules} options={{
                title: 'Balance Terms & Conditions'
            }} />
            <Stack.Screen name="deposit" component={Desposit} options={{
                title: i18n.t('Top-Up Balance')
            }} />
            <Stack.Screen name="card-provider" component={CardProvider} options={{
                title: i18n.t('Membership Tier')
            }} />

            <Stack.Screen name="item-detail" component={ItemDetail} options={{
                title: '',
                headerRight: () => <HeaderRight isCart={true} />
            }} />
            <Stack.Screen name="review-payment" component={ReviewPayment} options={{
                title: i18n.t('Review Payment'),
            }} />
            <Stack.Screen name="pay-webview" component={PayWebview} options={{
                title: i18n.t('Payment'),
            }} />
            <Stack.Screen name="review-order" component={ReportOrder} options={{
                title: i18n.t('order detail'),
                headerShown: true
            }} />
            <Stack.Screen name="order-success" component={OrderSuccess} options={{
                title: '',
                headerShown: false
            }} />

            <Stack.Screen name="search-item" component={SearchItemScreen} options={{
                title: '',
                headerRight: () => <SearchHeaderRight />,
                headerLeft: () => null,
            }} />
            <Stack.Screen name='location' component={Location} options={{
                title: i18n.t('Location'),
                headerShown: false
            }} />
            <Stack.Screen name='map-tracking' component={MapTracking} options={{
                title: i18n.t('Location'),
                headerShown: false
            }} />

            {/* authorization */}
            {!onBoading &&
                <Stack.Screen name="onBoarding" component={OnBoardingScreen} options={{
                    title: '',
                    headerShown: false
                }} />}

            <Stack.Screen name="Login" component={Login} options={{
                title: ''
            }} />
            <Stack.Screen name="sign-up" component={Signup} options={{
                title: ''
            }} />
            <Stack.Screen name="verify-code" component={VerifyCode} options={{
                title: ''
            }} />
            <Stack.Screen name="phone-verify" component={VerifyPhoneScreen} options={{
                title: ''
            }} />

            <Stack.Screen name="reset-password" component={ResetPassword} options={{
                title: ''
            }} />

            <Stack.Screen name="qr-scanner-card" component={QRScannerCardScreen} options={{
                headerStyle: { backgroundColor: 'black', elevation: 0 },
                title: i18n.t('Card Scanner'),
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white', fontFamily: 'R700', fontSize: 16 }
            }} />

            <Stack.Screen name="process-link-card" component={ProcessLinkCard} options={{
                title: '',
                headerShown: false
            }} />
            <Stack.Screen name="information-card" component={CardInformationScreen} options={{
                title: ''
            }} />
            <Stack.Screen name="create-password" component={CreatePassword} options={{
                title: ''
            }} />
            <Stack.Screen name="login-password" component={LoginPassword} options={{
                title: '',
                headerShown: false
            }} />

            <Stack.Screen name="term" component={TermCondition} options={{
                title: i18n.t('term-condition')
            }} />

        </Stack.Navigator>
    )
}

export default StackNavigation