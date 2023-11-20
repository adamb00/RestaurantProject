import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/features/Cart/store/configureStore';
import * as Font from 'expo-font';

import Main from './Main';
import { AuthProvider } from './src/contexts/AuthContext';
import { LocationProvider } from './src/contexts/LocationContext';

const queryClient = new QueryClient();

const App = () => {
   const [fontsLoaded, setFontsLoaded] = React.useState(false);

   React.useEffect(() => {
      async function loadAppFonts() {
         await Font.loadAsync({
            Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
         });
         setFontsLoaded(true);
      }

      loadAppFonts();
   }, []);

   if (!fontsLoaded) {
      return null;
   }

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
