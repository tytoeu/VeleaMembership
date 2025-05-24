import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "../hooks";
import { OnBoardingScreen } from "../screen";
import { Login, ResetPassword, Signup, VerifyCode } from "../screen/auth";
import VerifyPhoneScreen from "../screen/auth/VerifyPhoneScreen";

const Stack = createStackNavigator()

const AuthNavigation = () => {
    const { theme, onBoading } = useAppSelector((state) => state.cache)

    return (<Stack.Navigator screenOptions={{
        headerTintColor: theme.color
    }}>
        {!onBoading &&
            <Stack.Screen name="onBoarding" component={OnBoardingScreen} options={{
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                title: '',
                headerShown: false
            }} />}

        <Stack.Screen name="Login" component={Login} options={{
            headerStyle: { backgroundColor: theme.background, elevation: 0 },
            title: ''
        }} />
        <Stack.Screen name="sign-up" component={Signup} options={{
            headerStyle: { backgroundColor: theme.background, elevation: 0 },
            title: ''
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

    </Stack.Navigator>)
}

export default AuthNavigation