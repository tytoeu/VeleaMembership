import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, OnBoardingScreen, SignupScreen } from "../screen";
import { useAppSelector } from "../hooks";

const Stack = createStackNavigator()

const AuthNavigation = () => {
    const { theme, currentTheme, onBoading } = useAppSelector((state) => state.cache)

    return (<Stack.Navigator screenOptions={{
        headerTintColor: theme.color
    }}>
        {!onBoading &&
            <Stack.Screen name="onBoarding" component={OnBoardingScreen} options={{
                headerStyle: { backgroundColor: theme.background, elevation: 0 },
                title: '',
                headerShown: false
            }} />}

        <Stack.Screen name="Login" component={LoginScreen} options={{
            headerStyle: { backgroundColor: theme.background, elevation: 0 },
            title: ''
        }} />
        <Stack.Screen name="sign-up" component={SignupScreen} options={{
            headerStyle: { backgroundColor: theme.background, elevation: 0 },
            title: ''
        }} />

    </Stack.Navigator>)
}

export default AuthNavigation