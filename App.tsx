
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  const queryClient = new QueryClient();

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

