import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "../hooks";
import { OnBoardingScreen } from "../screen";
import { Login, Signup, VerifyCode } from "../screen/auth";

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
        <Stack.Screen name="verify-conde" component={VerifyCode} options={{
            headerStyle: { backgroundColor: theme.background, elevation: 0 },
            title: 'Verification Code'
        }} />

    </Stack.Navigator>)
}

export default AuthNavigation