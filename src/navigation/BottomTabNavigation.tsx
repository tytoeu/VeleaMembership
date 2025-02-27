import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen, HistoryScreen, HomeScreen, MenuScreen } from '../screen'
import { useAppSelector } from '../hooks';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const { theme } = useAppSelector((state) => state.cache)

    const scrollY = useSharedValue(0);

    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleStyle: { color: theme.color, fontFamily: 'R700' },
                headerStyle: { backgroundColor: theme.background, elevation: 3 },
                tabBarStyle: [{ backgroundColor: theme.background, bottom: 0, height: 60 }],
                tabBarLabelStyle: { fontSize: 12, fontFamily: 'R700', marginBottom: 6 },
                tabBarActiveTintColor: theme.color
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='home-outline' color={color} size={22} />)
                }}
            />
            <Tab.Screen name="Menu" component={MenuScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='list-outline' color={color} size={24} />)
                }}
            />
            <Tab.Screen name="History" component={HistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='repeat-outline' color={color} size={26} />)
                }}
            />
            <Tab.Screen name="Account" component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='person-outline' color={color} size={22} />)
                }}
            />

        </Tab.Navigator>
    );
}

export default BottomTabNavigation