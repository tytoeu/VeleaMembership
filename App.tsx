import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
import { persistor, store } from './src/redux/store';
import * as Notifications from 'expo-notifications';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import "./global.css"
import 'react-native-get-random-values';
import useDeepLinking from './src/hooks/useDeepLinking';
import { Loading } from './src/components';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const { linking } = useDeepLinking()

  const [fontsLoaded] = useFonts({
    R400: require('./assets/fonts/roboto-regular.ttf'),
    R500: require('./assets/fonts/roboto-500.ttf'),
    R700: require('./assets/fonts/roboto-700.ttf'),
    R900: require('./assets/fonts/roboto-900.ttf')
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: false
      },
    },
  });

  if (!fontsLoaded) { return null }

  return (
    <PaperProvider>
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate persistor={persistor}>

            <QueryClientProvider client={queryClient}>

              <NavigationContainer linking={linking} fallback={<Loading />}>
                <AppNavigation />
              </NavigationContainer>

            </QueryClientProvider>

          </PersistGate>
        </Provider>
      </RootSiblingParent>
    </PaperProvider>
  );
}

