import { AccountScreen, HistoryScreen, HomeScreen, MenuScreen } from '../screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderLeft, HeaderLeftProfile } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../hooks';
import i18n from '../localization';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const { theme, locale } = useAppSelector((state) => state.cache)
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleStyle: { color: theme.color, fontFamily: 'R700', fontSize: 18 },
                headerStyle: { backgroundColor: theme.background, elevation: 3 },
                tabBarStyle: [{ backgroundColor: theme.background, bottom: 0, height: 60 }],
                tabBarLabelStyle: { fontSize: 12, fontFamily: 'R700', marginBottom: 6 },
                tabBarActiveTintColor: theme.color,
                headerRight: () => <HeaderLeft />
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='home-outline' color={color} size={18} />),
                    title: i18n.t('Home'),
                    headerTitle: '',
                    headerLeft: () => <HeaderLeftProfile />
                }}
            />
            <Tab.Screen name="Menu" component={MenuScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='list-outline' color={color} size={22} />),
                    title: i18n.t('Menu'),
                }}
            />
            <Tab.Screen name="History" component={HistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='repeat-outline' color={color} size={24} />),
                    title: i18n.t('History')
                }}
            />
            <Tab.Screen name="Account" component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name='person-outline' color={color} size={20} />),
                    title: i18n.t('Account')
                }}
            />

        </Tab.Navigator>
    );
}

export default BottomTabNavigation