import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screen'
import { useAppSelector } from '../hooks'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createStackNavigator()

const StackNavigation = () => {
    const { theme } = useAppSelector((state) => state.cache)
    return (
        <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={{
                headerTitleStyle: { color: theme.color, fontFamily: 'R700' },
                headerStyle: { backgroundColor: theme.background }
            }}
        >
            <Stack.Screen name='BottomTab' component={BottomTabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigation