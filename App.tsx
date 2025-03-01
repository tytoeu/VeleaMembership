
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigation from './src/navigation/AppNavigation';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Roboto_400Regular as R400,
  Roboto_500Medium as R500m,
  Roboto_700Bold as R700,
  Roboto_900Black as R900
} from '@expo-google-fonts/roboto'
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: false
      },
    },
  });

  const [fontsLoaded] = useFonts({ R400, R500m, R700, R900 });
  fontsLoaded && SplashScreen.hide();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <QueryClientProvider client={queryClient}>

          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>

        </QueryClientProvider>

      </PersistGate>
    </Provider>
  );
}

