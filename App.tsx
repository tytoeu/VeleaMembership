
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Appearance } from 'react-native';

import {
  Roboto_400Regular as R400,
  Roboto_500Medium as R500m,
  Roboto_700Bold as R700,
  Roboto_900Black as R900
} from '@expo-google-fonts/roboto'
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({ R400, R500m, R700, R900 });

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} color={'red'} />
  }

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

