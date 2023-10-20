import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/features/Cart/store/configureStore';
// import { useFonts } from 'expo-font';
// import { AppLoading } from 'expo';

import Main from './Main';
import { AuthProvider } from './src/contexts/AuthContext';
import { LocationProvider } from './src/contexts/LocationContext';

const queryClient = new QueryClient();

const App = () => {
   // const [fontsLoaded] = useFonts({
   //    DancingScript: require('./assets/fonts/DancingScript-VariableFont_wght.ttf'),
   //    Farsan: require('./assets/fonts/Farsan-Regular.ttf'),
   // });

   // if (!fontsLoaded) return <AppLoading />;

   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <LocationProvider>
               <Provider store={store}>
                  <NavigationContainer>
                     <Main />
                     <Toast />
                  </NavigationContainer>
               </Provider>
            </LocationProvider>
         </AuthProvider>
      </QueryClientProvider>
   );
};

export default App;
