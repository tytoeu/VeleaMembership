import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigation from './src/navigation/AppNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { Image, View } from 'react-native';
import "./global.css"

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

  if (!fontsLoaded) {
    return <View className='flex-1 w-full border-l-orange-500'>
      <Image
        source={require('./assets/splash_screen.png')}
        className='h-full w-full object-fill'
      />
    </View>
  }

  return (
    <PaperProvider>
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate persistor={persistor}>

            <QueryClientProvider client={queryClient}>

              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>

            </QueryClientProvider>

          </PersistGate>
        </Provider>
      </RootSiblingParent>
    </PaperProvider>
  );
}

