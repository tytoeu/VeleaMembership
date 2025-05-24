import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigation from './src/navigation/AppNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {

  const [fontsLoaded] = useFonts({
    R400: require('./assets/fonts/roboto-regular.ttf'),
    R500: require('./assets/fonts/roboto-500.ttf'),
    R700: require('./assets/fonts/roboto-700.ttf'),
    R900: require('./assets/fonts/roboto-900.ttf')
  });

  useEffect(() => { SplashScreen.preventAutoHideAsync(); }, []);

  useEffect(() => { fontsLoaded && SplashScreen.hideAsync(); }, [fontsLoaded])

  if (!fontsLoaded) return null;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: false
      },
    },
  });

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

